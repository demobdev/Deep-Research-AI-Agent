/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActivityTracker,
  ResearchFindings,
  ResearchState,
  SearchResult,
} from "./types";
import { z } from "zod";
import {
  ANALYSIS_SYSTEM_PROMPT,
  EXTRACTION_SYSTEM_PROMPT,
  getPlanningPrompt,
  PLANNING_SYSTEM_PROMPT,
  REPORT_SYSTEM_PROMPT,
} from "./prompts";
import { callModel } from "./model-caller";
import { exa } from "./services";
import { combineFindings, handleError } from "./utils";
import {
  MAX_CONTENT_CHARS,
  MAX_ITERATIONS,
  MAX_SEARCH_RESULTS,
  MODELS,
} from "./constants";

export async function generateSearchQueries(
  researchState: ResearchState,
  activityTracker: ActivityTracker
) {
  try{
    activityTracker.add("planning","pending","Planning the research");

  const result = await callModel({
    model: MODELS.PLANNING,
    prompt: getPlanningPrompt(researchState.topic, researchState.clerificationsText),
    system: PLANNING_SYSTEM_PROMPT,
    schema: z.object({
      keyAspects: z
        .array(z.string())
        .describe(
          "The key aspects of the topic that need to be investigated to provide a comprehensive understanding."
        ),
      searchQueries: z
        .array(z.string())
        .describe(
          "The search queries that can be used to find the most relevant content which can be used to write the comprehensive report on the given topic. (max 3 queries)"
        ),
    }),
    activityType: "planning",
    researchState,
    activityTracker
  });

  activityTracker.add("planning", "complete", "Crafted the research plan");

  return result;
  }catch(error){
    return handleError(error, `Research planning`, activityTracker, "planning", {
        searchQueries: [`${researchState.topic} best practices`,`${researchState.topic} guidelines`, `${researchState.topic} examples`  ]
    })
    
  }
}

export async function search(
  query: string,
  researchState: ResearchState,
  activityTracker: ActivityTracker
): Promise<SearchResult[]> {

    activityTracker.add("search","pending",`Searching for ${query}`);

  try {
    const searchResult = await exa.searchAndContents(query, {
      type: "keyword",
      numResults: MAX_SEARCH_RESULTS,
      startPublishedDate: new Date(
        Date.now() - 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      endPublishedDate: new Date().toISOString(),
      startCrawlDate: new Date(
        Date.now() - 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      endCrawlDate: new Date().toISOString(),
      excludeDomains: ["https://youtube.com"],
      text: {
        maxCharacters: MAX_CONTENT_CHARS,
      },
    });

    const filteredResults = searchResult.results
      .filter((r) => r.title && r.text !== undefined)
      .map((r) => ({
        title: r.title || "",
        url: r.url,
        content: r.text || "",
      }));

    researchState.completedSteps++;

    activityTracker.add("search","complete",`Found ${filteredResults.length} results for ${query}`);


    return filteredResults;
  } catch (error) {
    console.log("error: ", error);
    return handleError(error, `Searching for ${query}`, activityTracker, "search", []) || []
  }
}

export async function extractContent(
  content: string,
  url: string,
  researchState: ResearchState,
  activityTracker: ActivityTracker
) {

    try{
        activityTracker.add("extract","pending",`Extracting content from ${url}`);

        const result = await callModel({
          model: MODELS.EXTRACTION,
          prompt: `Extract key information from the following content:\n${content}`,
          system: EXTRACTION_SYSTEM_PROMPT,
          schema: z.object({
            summary: z.string().describe("A concise summary of the key information"),
            keyPoints: z.array(z.string()).describe("Key points extracted from the content"),
          }),
          activityType: "extract",
          researchState,
          activityTracker
        });
      
        activityTracker.add("extract","complete",`Extracted content from ${url}`);
      
        return {
          url,
          summary: (result as any).summary,
        };
    }catch(error){
        return handleError(error, `Content extraction from ${url}`, activityTracker, "extract", null) || null
    }
}

export async function processSearchResults(
  searchResults: SearchResult[],
  researchState: ResearchState,
  activityTracker: ActivityTracker
): Promise<ResearchFindings[]> {
  const extractionPromises = searchResults.map((result) =>
    extractContent(result.content, result.url, researchState, activityTracker)
  );
  const extractionResults = await Promise.allSettled(extractionPromises);

  type ExtractionResult = { url: string; summary: string };

  const newFindings = extractionResults
    .filter(
      (result): result is PromiseFulfilledResult<ExtractionResult> =>
        result.status === "fulfilled" &&
        result.value !== null &&
        result.value !== undefined
    )
    .map((result) => {
      const { summary, url } = result.value;
      return {
        summary,
        source: url,
      };
    });

  return newFindings;
}

export async function analyzeFindings(
  researchState: ResearchState,
  currentQueries: string[],
  currentIteration: number,
  activityTracker: ActivityTracker
) {
  try {
    activityTracker.add("analyze","pending",`Analyzing research findings (iteration ${currentIteration}) of ${MAX_ITERATIONS}`);

    const result = await callModel({
      model: MODELS.ANALYSIS,
      prompt: `Analyze the following findings:\n${JSON.stringify(researchState.findings, null, 2)}`,
      system: ANALYSIS_SYSTEM_PROMPT,
      schema: z.object({
        sufficient: z.boolean().describe("Whether the collected content is sufficient for a useful report"),
        gaps: z.array(z.string()).describe("Identified gaps in the content"),
        queries: z.array(z.string()).describe("Search queries for missing information. Max 3 queries."),
      }),
      activityType: "analyze",
      researchState,
      activityTracker
    });

    const isContentSufficient = typeof result !== 'string' && result.sufficient; 

    activityTracker.add("analyze","complete",`Analyzed collected research findings: ${isContentSufficient ? 'Content is sufficient' : 'More research is needed!'}`);

    return result;
  } catch (error) {
    return handleError(error, `Content analysis`, activityTracker, "analyze", {
        sufficient: false,
        gaps: ["Unable to analyz content"],
        queries: ["Please try a different search query"]
    })
  }
}

export async function generateReport(researchState: ResearchState, activityTracker: ActivityTracker) {
  try {
    activityTracker.add("generate","pending",`Geneating comprehensive report!`);

    const result = await callModel({
      model: MODELS.REPORT,
      prompt: `Generate a comprehensive report based on the following research:\n${JSON.stringify(researchState.findings, null, 2)}`,
      system: REPORT_SYSTEM_PROMPT,
      schema: z.object({
        report: z.string().describe("The comprehensive research report"),
        references: z.array(z.string()).describe("List of references used in the report"),
      }),
      activityType: "generate",
      researchState,
      activityTracker
    });

    activityTracker.add("generate","complete",`Generated comprehensive report, Total tokens used: ${researchState.tokenUsed}. Research completed in ${researchState.completedSteps} steps.`);

    return result;
  } catch (error) {
    console.log(error);
    return handleError(error, `Report Generation`, activityTracker, "generate", "Error generating report. Please try again. ")
  }
}
