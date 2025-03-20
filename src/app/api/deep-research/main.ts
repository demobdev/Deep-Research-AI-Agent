/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActivityTracker } from "./activity-tracker";
import { MAX_ITERATIONS } from "./constants";
import { analyzeFindings, generateReport, generateSearchQueries, processSearchResults, search } from "./research-functions";
import { ResearchState } from "./types";

export async function deepResearch(researchState: ResearchState, dataStream: any){
    console.log("Starting deep research process...");
    let iteration = 0;
    
    const activityTracker = createActivityTracker(dataStream, researchState);

    console.log("Generating initial search queries...");
    const initialQueries = await generateSearchQueries(researchState, activityTracker)
    console.log("Initial queries generated:", initialQueries);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentQueries = (initialQueries as any).searchQueries
    console.log("Current queries:", currentQueries);

    while(currentQueries && currentQueries.length > 0 && iteration <=  MAX_ITERATIONS){
        iteration++;
        console.log("Starting iteration:", iteration);

        console.log("Executing search queries...");
        const searchResults = currentQueries.map((query: string) => search(query, researchState, activityTracker));
        const searchResultsResponses = await Promise.allSettled(searchResults)
        console.log("Search results received:", searchResultsResponses.length);

        const allSearchResults = searchResultsResponses.filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled' && result.value.length > 0).map(result => result.value).flat()
        console.log(`Processing ${allSearchResults.length} search results`);

        console.log("Processing search results...");
        const newFindings = await processSearchResults(
            allSearchResults, researchState, activityTracker
        )
        console.log("New findings processed:", newFindings.length);

        researchState.findings = [...researchState.findings, ...newFindings]
        console.log("Total findings:", researchState.findings.length);

        console.log("Analyzing findings...");
        const analysis = await analyzeFindings(
            researchState,
            currentQueries,
            iteration, 
            activityTracker
        )
        console.log("Analysis complete:", analysis);

        if((analysis as any).sufficient){
            console.log("Content is sufficient, breaking loop");
            break;
        }

        currentQueries = ((analysis as any).queries || []).filter((query:string) => !currentQueries.includes(query));
        console.log("New queries for next iteration:", currentQueries);
    }

    console.log("Research loop completed. Total iterations:", iteration);
    console.log("Generating final report...");

    const reportResult = await generateReport(researchState, activityTracker);
    console.log("Report generated successfully");
    
    if (typeof reportResult === 'string') {
        console.log("Writing string report to stream");
        dataStream.writeData({
            type: "report",
            content: reportResult
        });
    } else {
        console.log("Writing object report to stream");
        dataStream.writeData({
            type: "report",
            content: (reportResult as any).report || "Error generating report"
        });
    }

    console.log("Deep research process completed");
    return initialQueries;
}