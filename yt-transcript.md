hi there welcome back to the channel today we are building something really cool a deep research AI agent similar to
0:07
what you have seen in ch jbt and gro we are coding our own version from scratch
0:12
let me just show you what we are building let's ask it to research about
0:18
how to run a deeps seek R1 locally and click
0:25
submit now as you can see our agent first asks for some clarifications about about what specifically I want to know
0:32
this is similar to how CH gbt might ask followup questions let's answer these questions so what specific aspects of
0:39
running deeps locally are you interested in well I'm interested in installation
0:45
and the configurations click next the desired depth or complexity
0:51
level of the research let's copy this we need
0:56
Advanced technical details and are there any particular perspective
1:02
or use cases you'd like to focus on focus on the production
1:09
environments and are there any specific sources that you'd like to exclude well
1:15
I want to exclude non-technical
1:21
sources and click on start research now here are our question
1:27
answers now our agent is completely transparent
1:33
about what it's doing you can see it from here in the activities tab first it generates a research plan
1:40
with targeted search queries then it is executing multiple searches using EXA
1:45
search API after searching it will extract and
1:51
filter relevant content from each results you can also see the sources
1:59
which it has used from here now after the
2:04
extraction it will uh it will analyze its finding to identify gaps if there is
2:09
more research needed then uh it will Pro it will provide the new search
2:15
queries and it has started the second research iteration now uh it will keep doing this
2:22
until it reaches the maximum search iterations or it will get the required findings
2:30
now finally it will compile everything into a comprehensive
2:35
report now it has extracted information from around 15 to 20 different
2:43
sources look at this gorgeous report it's well structured includes sources
2:49
and covers all the aspects that I have asked for now our agent has synthesized
2:56
information from multiple sources into a well structured report and the best part of building this agent
3:02
is that we can easily customize it however we want if you want to want it to generate a well return return article
3:09
then you just have to change this prompt of the report generation and then you'll have the whole article in this tutorial
3:16
we'll use multiple AI models the exos sege API and some cever orchestration
3:21
code to create this agent that can research any topic deeply and
3:27
intelligently before we dive into to coding I want to explain what is an AI
3:33
agent and the AI workflows and their differences because right now many people are confused between these two
3:39
terms so what is an AI agent as per the definition an AI agent is an autonomous
3:46
software entity that uses a large language model to interpret natural language plan actions and execute task
3:54
using provided tools with the little to no human intervention think of of it as an
4:00
employee you delegate a task to you give it a goal and it figures out how to achieve it choosing its own steps and
4:08
tools along the way e agents have a better contextual understanding they
4:13
maintain context across long interactions and conversations you can integrate tools that can connect to
4:19
various databases apis or third party Services AI agents can be used for
4:26
autonomous task execution they can plan and execute task task without constant human
4:31
intervention multiple agents can collaborate and share information between them now let's see one example
4:39
of an AI agent a customer service AI agent that
4:45
resolves customer queries by asking questions looking up the information about the customer and providing the
4:51
solutions escalating to a human when necessary now let's see what is an AI
4:59
workflow an AI workflow is a structured stepbystep process that integrates llm
5:07
into a series of predefined task to achieve a specific
5:13
goal think of it as a recipe it's a fixed set of steps to follow to complete
5:19
a task e might be used within some of those steps to make them
5:24
smarter workflow follows predefined steps it has a clear start and end point
5:30
with specific actions happening in a set order now ai is used within the workflow
5:37
to enhance the specific steps and AI workflows are ideal for
5:42
complex multips task where consistency and compliance are very critical now
5:48
let's see one example of an AI workflow a new customer onboarding
5:55
workflow which analyzes the user data and might Pro provide software access
6:01
create login credentials and update systems like workday or
6:06
Salesforce we are actually building what's best described as an AI agent R
6:11
workflow before I explain why AI agent R workflow let me walk you through this diagram that implements the logic of
6:18
this deep research AI agent so first we provide uh the inputs
6:25
that uh uh contains the question answers and the topic for the research and then
6:32
it generates a research plan it generates the initial search queries then we have one
6:38
Loop now based on the search queries first we will perform the search for
6:44
each of the search queries using the XI API and then we will extract the content from the search results then we'll
6:51
filter the content based on the topic and we will store it in the research findings so for example if we
6:59
have three initial search queries then we will use XI API for each queries and
7:04
XI API will give at least five results per queries and we will extract all
7:10
those Five results and then we'll filter it and store it in the research findings now after this one pass will provide all
7:17
the research findings to the llm to analyze whether the content is enough or not and then it will analyze the content
7:25
and it will provide whether it is sufficient or not if it is sufficient then it it will generate the report if
7:30
it is not sufficient and then it will also provide the new search queries now before we perform this loop
7:38
again we will check if for the maximum iteration whether it is reached the maximum iterations or not if not then
7:46
again we'll uh perform this whole process if uh maximum iterations is
7:53
reach then we will generate the report so if we if I summarize this
7:58
diagram again here we have provided the topic and the question answers for more clarification
8:05
about the topic then it will generate the search queries we'll use the search queries we'll search for each query
8:11
we'll get the content then we'll use uh llm to analyze the content and decide
8:17
whether it is sufficient or not if it is not sufficient we'll get the new search queries and again we'll run this Loop
8:25
until we find the relevant content or maximum iteration is reach and then
8:30
we'll generate the report so why this is not an AI agent or not a pure AI
8:38
workflow why I'm calling this an AI agent driven workflow because it has a
8:43
few characteristics of an agent and few characteristics of an workflow now let
8:48
me tell you this characteristics so as an agent it auton autonomously creates
8:53
the search queries based on the topic and clarifications and then it analyzes the
8:59
find findings and determines if it is sufficient or not it adaptively generates the new search queries based
9:06
on the identify gaps and it operates in an iterative research Loop until the
9:11
content needs are satisfied so these are the characteristics of an agent now if
9:17
we uh if we check for the workflow it follows the structured process flow with
9:22
the defined stages and it uses a predetermined set of AI models for specific task for example for to
9:29
generate this initial search queries we are using the llama and for the analyzing content we are using the uh
9:37
GPD 40 and for the generating report we are using uh Gemini thinking
9:43
model and this has a maximum iteration count to prevent the infinite Loop which
9:49
usually agent does not have so these are the characteristic of an workflow so our
9:55
whole system demonstrates the power of combining both uh approaches the structured reliability of workflows with
10:02
the adaptability and intelligence of an agent so to conclude we are building an
10:08
AI agent R workflow so let's dive into the coding
10:16
part let's use this uh next CLI to initialize the app open your command
10:24
prompt and make sure you are in the right directory and let's just
10:29
use this npx create next- app at latest press
10:40
enter press Y and let's give it a name just say deep
10:49
research AI agent yes typescript yes
10:57
yes yes will use SRC directory yes to the app router and yes to the turbo pack
11:04
no to the Imports that's it after this uh we'll install the Shar
11:13
CN so let's use this command and it's
11:20
done now let's change the directory just say
11:25
CD add the project name that's it now let's install the components from
11:32
the shared CN we can use this
11:40
command just write npx shed CN at latest
11:46
and write in
11:51
it for the color just select the neutral and here we are using the react
12:00
19 so that's why there is a chance of some P packages may fail so that's why
12:06
we'll use the Legacy P depths to install the required
12:13
dependencies now let's add the components for that we can use uh shed CN latest and
12:23
add just npx Shar ZN
12:29
at the latest and write add all right um let's select accordion
12:38
then we'll need uh button we'll use the card as well and
12:44
we'll use collapsible now let's select
12:51
form we'll need input
12:57
label then select progress and radio group as
13:07
well let's use select and
13:14
skeleton [Music] sonar let's use
13:21
tabs text area and the tool tip and
13:26
press enter let's use this Legacy
13:35
peps and now it has added all the components in the SRC components UI
13:41
folder let me just open the uh cursor editor just write code and
13:55
Dot so here are all the uh shed CN components in the UI
14:02
folder let's start the
14:18
server all right now let's uh start by
14:23
editing the first page let me remove this do and keep only
14:30
the main and remove this as
14:38
well for this main Let's uh keep the minimum height to
14:44
screen with two full display Flex Flex column items to Center justify to start
14:55
let's set uh gap of uh eight adding top
15:00
and bottom to 16 that's it let me remove all
15:09
this and here let's add one D with
15:18
flex and this D let's add H1 and just write deep
15:26
research after the H1 let's add one paragraph tag and let's write enter a
15:34
topic and a and answer a few questions to generate
15:46
a comprehensive research
15:51
report all right here let's add the flex
15:57
column items to send enter and GAP to four let's save
16:03
this all right for the
16:09
H1 Let's uh set text to 8 XL font
16:17
bold and italic set
16:23
PG radian to right from
16:30
primary color and two
16:36
primary uh let's decrease the opacity to
16:41
50 and background clip text and text to transparent I have
16:50
used this classes to make this heading look a little bit uh
16:55
classy with the gradient from left to right right let's add the
17:01
fonts for that go to the layout file and
17:07
instead of this two fonts we'll use uh enter so make sure you import
17:15
it from Google and next is
17:21
the dancing script
17:31
here change this to enter and this
17:37
to dancing Dash script let's use both of
17:48
them so uh from the tailwins uh V4 version uh usually we use to define all
17:54
of this uh the font variables and uh the color variables in Thea win config file but from the version four of the
18:02
Tailwind uh we are not using that file instead we are just directly adding the variables in the global. CSS file right
18:10
here so uh in the add theme let's just add uh D- font Das
18:20
dancing D script and use it as a
18:27
variable just copy
18:34
this and let's copy right here let's change
18:40
this to enter that's it now we should be able to
18:46
use this let me save this and here in the layout let's set
18:55
font enter let's save this
19:01
all right and let's change this font to dancing script go to the page and the H1 let's
19:08
use Font Das dancing
19:14
script and now it looks much better let's change the color of this text to
19:20
gray so in the P set text
19:27
Gray m let's select 600 text to
19:33
Center let's save this all right now let's add the user
19:41
input right here so in the components let's create
19:46
one more folder that says deep research and inside this folder let's
19:53
add user input. DSX component
19:58
now here we'll use uh the form component from Shad CN so let's open the
20:06
documentation let's open the form
20:12
component first we'll copy
20:18
this and also make this a client side component so just add use client
20:25
directive at the top now in the form schema instead of
20:32
username we'll use input and set minium to two maximum 2
20:44
200 next let's copy both of this
20:54
Imports so here we are using the react hook form to manage the form
21:00
States and then let's just copy
21:14
this now this is the uh submit function Handler and here we are using the Zod
21:21
resolver to resolve this form schema if there is any error then it will show the error as well
21:29
after this let's import the different form components button and the input
21:34
components from the UI
21:43
folder let's copy this whole
21:48
form and paste it right here instead of username change this to
21:55
input actually we don't need this form label so remove that remove the form description as well and for the
22:01
placeholder let's just say enter your research topic let's save this and use
22:09
the user input component in the page after this
22:17
deal and here it is let's see if it is working or
22:26
not all right we are getting the the
22:32
input let's style
22:38
this so for the input let's add different
22:45
classes set rounded to full and uh with to
22:52
full set Flex to flex D1 because uh we
22:58
we want this input to cover more width than the submit button Set
23:05
uh padding top and bottom to six otherwise padding
23:13
to uh four all right and set placeholder text
23:20
to text- smm set BG Das
23:27
white and and with 60 opacity border solid and Shadow To None
23:38
all right now also let's add the class name here as well for the form so displ
23:46
Flex Flex Das column just keep it a row for the larger
23:53
screens set item to Center justify to Center Gap to
23:59
four let's set width to 50
24:07
VW let me remove this space and this
24:14
button let's add the round eight to full adding left and right to six and curser
24:22
to pointer actually we should add the flex one in the form
24:29
item so set Flex one and width to full now it looks much better now let's
24:37
see how we can generate different questions uh based on the topic that we provide from this user input
24:44
component let me delete this now to use the different large
24:51
language models we are going to use the open router because open router provides lots
24:58
of of models so we just have to pay to the open router to uh access all these
25:06
models so make sure you have uh few credits if you want to use the premium
25:12
models otherwise there are also few models that are free like uh if you
25:19
select the Gemini they have uh free preview models for the Gemini Pro 2 and
25:26
flashlight but uh if you want to use uh the GPT models they are not free for
25:33
that you have to uh pay to the open router and once that's done you just go
25:39
to the Keys and here let me create one key let's say for the YouTube
25:49
tutorial and press create let me copy this key go right here
25:59
let me create EnV file let's just say open router
26:06
underscore aior key equal to and let's paste this
26:12
key now let's use this let me show you uh about uh
26:20
different models and the open router so basically using the open router API we
26:26
can access almost all the large language models so if
26:31
we select uh let's select the gbt and let's go to the GPT
26:40
40 so here we can use the 128k context window now if you want to use
26:47
this we can go to the API and let's select typescript we can use it like this or
26:55
there is an a SDK as well let me open
27:00
this here go to the versal a SDK and we can use this open router asdk
27:08
provider to uh access the models from the open router so let's install
27:14
this now here along with this let's install the bsal SDK as well so if you
27:22
go to its website let's go to the nextjs app
27:33
router and here let's copy all this AI a SDK react and a SDK open a
27:42
actually we don't need the SDK of open AI because we are using open router so just copy
27:49
this and P it right here press
27:54
enter so here here is how we'll use it uh we'll pass the B right here and then
28:01
we'll use this open router and just pass the model name so if you're new to
28:07
versal SDK don't worry I'll explain all the different functions and it's done now to generate
28:15
the questions based on the users input uh let's uh create one API router so in
28:21
the app create one folder that says API and here let's let's add uh one
28:30
folder that says uh
28:35
generate question so this will be our API endpoint and inside that folder
28:40
create route. DS file all right so here we'll create uh one post request so just
28:49
say export async function post which will have one
28:56
request object which will have the request
29:03
types and here let's just get
29:10
the topic from the await request.
29:17
Json let's log
29:23
this topic
29:28
now let's just return one next response dot
29:37
Json success to true and
29:43
set status to uh let's say
29:50
200 let's save this and use this a
29:56
endpoint now now here in the on submit we are getting the value the topic value
30:02
as an input so let me use try and catch Block
30:10
in the try let's use cons response equal
30:20
to a wait fetch we'll use our API Endo which is uh
30:27
at SL API SL generate
30:34
questions and after this we'll pass the options here the method of this request
30:41
is post we'll pass the body let's use json.
30:49
stringify and here in the object we'll pass the topic and let's extract the input from
30:57
the values all right let's just log the
31:06
response log response actually let's extract the
31:13
response so for that we'll use await response. Json and let's log this data right
31:22
here and after they try we'll use catch
31:28
and let's log the error let's make this an async
31:38
function let's save this and test this
31:47
out let me just say how to run tpse R1 locally click
31:55
submit so here we got the the log from the API Handler so we got the
32:03
topic and here we got one object that says success to true so our API Handler
32:10
is configured now let's add the logic to generate the different questions based
32:16
on the topic for that we'll use the personel
32:22
SDK so the basic uh function to generate a text from LM
32:28
is uh let me show you it is the generating text so using this function
32:34
you can uh use any llm provide prompt and get the text back so let's use this
32:41
copy this go to the API route and here we'll use the try and
32:51
catch let's create uh one function that uh will provide us the questions so
32:59
let's name it as a clarify research
33:05
goals async it will get the
33:11
topic in a string type and let's just uh use try and catch
33:24
here the try copy and paste this function make sure to import this generate text
33:31
from the AI let's copy this
33:39
import and here instead of your model we'll use the open
33:46
router so from the documentation let's import the create open router from this
33:55
library and let's copy this this and paste it outside of the
34:02
function now in the API key we'll pass process. EnV dot let's copy this
34:13
and paste it right here or
34:19
null so instead of model we'll use open router and here we'll pass the model
34:26
name so for now let me go to the let's use this gbt 40 just
34:34
copy this using this button and paste the model name
34:41
here so in the prompt uh let me just uh create one variable
34:49
so let's just say prompt and here let's create one prompt to generate the
34:56
question so let's just right given the research topic let's provide the
35:05
topic generate 224
35:10
clarifying questions to help narrow down
35:16
the research scope focus on
35:23
identifying let's identify the specific aspects of uh
35:33
interest uh required depth and
35:40
complexity label and any
35:45
particular perspective or excluded
35:52
sources all right uh now it is always better to use the variables when whenever you pass anything to the llm so
36:00
that it can identify it easily all right let's use this prompt
36:07
and pass it right here all right let's uh return this
36:17
text in the catch let's get the
36:22
error and here we'll log the error
36:29
error while generating
36:36
questions all right let's uh copy this function and use it right
36:43
here let's just say questions or
36:50
wait because this function is an async function here we'll pass the
36:56
topic let's just log uh what we are getting as a
37:06
questions the catch let's get the
37:12
error let's move this right here and here as
37:19
well first let's log the error let me copy this and and paste it
37:28
right here here we'll set the success to
37:34
false and error that says fail to generate
37:41
questions status 2 500 all right let's save this so uh
37:49
we'll pass the topic right here then to this clarify research goals function this function we'll use the GPT 40 to uh
37:58
generate the relevant question based on the given topic and our prompt and let's
38:03
see what we are getting in the text let me click on
38:13
submit all right successes true so if you check the logs and here is the topic
38:20
here are the questions so basically it has generated this four questions now uh if it L use this text
38:28
then we have to uh pass this question and then create an array and send it to
38:33
the front end but instead there is one function that we can use from the personal SDK that
38:40
is generate structured data for that we can use the generate object function
38:47
here we just have to pass the schema of the output that we want so let's use it
38:52
let's copy this and here instead of generate text
38:58
we'll use the generate object and let's pass the schema so schema is nothing but
39:04
what we did for this uh form we have use Zod to create one schema similarly we'll
39:10
also use the Zod here as well make sure you import it so uh just say z. object
39:18
we'll need one object and in this object we'll have an array of questions so Z do array
39:27
and each question will have the type of string that's it and here it will not return the text
39:35
but instead it will return the object let's let's pass this object and
39:43
will extract the questions from this object let's save
39:49
this again let me run this
39:58
all right we got an error no end points found that support tool use okay so uh
40:05
for this error not all the uh llm models are capable of generating the structured
40:11
output so for that if we let me go to the models and filter that out so just
40:20
select tools and the structured outputs so these are all the models that can
40:26
support the support generating the objects so let me let me use the Llama
40:33
model so just here select Lama
40:41
3 and let's use this llama 3.3 an an
40:46
instruct copy this and instead of uh open AI paste
40:54
right here let's save this and click generate
41:02
again and we got success to true if you check the logs all right so here it has
41:08
generated the output in an array format so in Array we got one two three and
41:14
four questions so let's uh pass this question to the front end instead of
41:20
this Chason let's directly pass this
41:26
questions all right let me run this
41:32
again and we got all the four questions now let's uh render these questions
41:38
right here now if we want to render the questions we have to uh store this
41:44
response somewhere we uh we can either use the context API to uh store it as a
41:49
state because we'll need that uh question answers later to uh to do the
41:56
Deep research so uh let's use the zustan to manage the
42:01
state let me just open the zustan
42:11
documentation let's install it
42:21
first and then let's uh
42:28
go to the SRC and let's create one folder that says store so basically
42:34
store will store the uh all the global States Let's uh create one store for the
42:40
Deep research. DS now in the zest stand if you are new
42:46
to this first we will create the store using the create function now this store
42:51
will contains the state and methods to change this states it is simple once you
42:58
get a hang hang of it so let's use
43:03
this first import
43:11
create from sustain then let's use export
43:20
const use deep Research store
43:28
and we'll use create now here we have used use keyword
43:35
because uh we'll use at a uh custom hooks so in the create it will give us
43:42
the Set uh function to set the states that uh we have defined in this
43:48
store so let's extract the set use the arrow function
43:57
and here let's uh Define the state so first we'll need the
44:04
topic then we'll have uh an array to store the
44:10
questions let's return this object so we can use the
44:18
parenthesis all right so uh we'll just need uh this two states for now then
44:25
we'll need uh one method to set the topic so just say set
44:33
topic this method we have a topic as an argument and then it will use the set
44:41
function to set the given topic similarly we'll use uh this as a
44:51
set questions and instead of topic we'll
44:56
have have questions and it will be a array of
45:02
strings
45:09
questions that's it so we have created one uh store using a stand and this
45:15
store will have a set of states and a method to change this States now here we
45:22
have used the stand because it is very simple to manage the global State because if use the context API we have
45:28
to create a lot of boiler plate code like uh contacts providers and all so
45:33
instead of that it is better to use this let's go to the user input let's
45:41
just use use deep Research store make sure you import it and from here let's
45:50
uh deconstruct the uh set questions and set
45:59
topic method so in the try we'll set the topic
46:06
as values dot input and then we'll use set
46:13
questions and pass the data and we are getting the typescript
46:18
error so let's define the type in the store uh here let's define two types one
46:23
for state and one for actions so just say interface deep research
46:32
State we have a topic in a string
46:38
format and questions in an array of
46:43
string let's pass this in the
46:51
create along with this we'll create one more
46:57
for the Deep research actions
47:05
types and here change this to set topic and set
47:12
questions let's just copy this right here return to White
47:29
here let's combine this all right now the array is gone so
47:39
basically we will store the topic and using set topic and question using set questions we are showing uh this way so
47:46
that we can easily access questions in the different component now to render
47:51
the questions let's create uh one component that say is let's name it as a
47:58
q&a. TSX now
48:04
here first let me extract the questions extract uh questions
48:11
from use deep Research store since we have
48:16
used the hook so we have to convert this to a use client component so here
48:25
F question do length is uh
48:32
zero then return null else we'll return One D and in here we'll create one
48:40
question form let's add class set Flex Gap to
48:49
four with to full Flex direction to column items to Center and margin bottom
48:56
to 16 so let's create this question form in the components create question
49:02
form. DSX let's import
49:10
it now let let me just command this out let's use this Q&A component in the page
49:17
after the user
49:23
input and here it is
49:30
so why I have created this uh question form as a separate component because uh
49:36
once the question and answers are submitted we'll uh show the question answer in a different format and for
49:41
that we'll use another component and here we'll also create
49:46
multiple components such as research timer research report and research activities Etc right here so let's
49:53
complete this question form now here we are going to use the form component from the shed CN so let's just copy
50:00
it go to the shed CN copy
50:14
this let's uh copy both of this Imports to resolve the Zord
50:20
schema and this form and on submit function
50:29
let's import all
50:36
this and the form
50:43
component all right now here let's change this
50:49
username to answer and set minimum one otherwise
50:56
guys let uh let's show an error saying answer is
51:04
required let's save this and here change this to
51:09
answer change this as well instead of input we'll use text
51:16
area and the placeholder just say type your answer here let's add the class
51:24
name set pting left and right to four ping top and bottom to two text
51:32
base resize none and placeholder
51:40
text should be text-
51:46
smm and set border black with uh 20 opacity
51:57
let's check this out all right let's just add a few fake questions so go to
52:04
the store and instead of empty array let's just say question
52:12
one and create few more two three and
52:19
four let's save this and in the question form now here we'll use one card
52:25
component so if you go to the the shed
52:32
CN open the card component let me just copy
52:40
this and paste
52:45
Imports and copy this so in the return we'll add this
52:52
whole form component in a card content
52:59
after this paragraph we don't need the card putter
53:06
so remove that now in the card
53:13
let's uh set width to full and maximum width up to 80 view Port width instead
53:22
of 80 let's set uh 50 for the larger screens
53:27
let's save
53:33
this now it looks much
53:40
better now for the card header let's add uh class padding left and right to four
53:47
and up to SM break point set padding left and I 26 let's do the same for the
53:54
width as well for the smaller screen set maximum width width to 90 ort width up
54:01
to SM set max width to 80 and up to excel let's keep the max
54:08
WID to 50 VW let's keep Shadow to
54:16
none and the card title let's set questions let's just say
54:25
one of questions.
54:33
length and let's uh extract the
54:39
questions questions from use deep
54:45
sick sorry use deep Research store let's use this questions right
54:51
here let's save this all right
54:58
let's remove the card description we don't need that for the card title let's
55:03
set class name set text Dash base text
55:08
color to text primary and with 50 opacity all right looks
55:15
great now for the card content Set uh space
55:23
y to six with to full padding left and right to
55:29
four and for the SM set padding left and right to
55:35
six all right let's remove the label because we don't need that just keep the
55:42
text
55:49
area all right looks much better let's remove the form description too
56:01
let's add next and uh previous buttons now for that uh since we have
56:08
two to four questions we are rendering one question at a time so let's uh do
56:14
the state management using this uh this stand
56:19
store so we'll add uh few more State here let's add answers which will be
56:27
also an array and uh current
56:33
question which will be a number index of that particular
56:38
question and then let's set one is completed state
56:44
which will have the Boolean all right and then here let's uh
56:53
add set answers let me just copy this paste it for
56:59
one two and three times here we'll use
57:05
set
57:11
answers inste of questions just say answers here change this to set current
57:23
question and here let's set index which will be a number not
57:32
string and here the set is
57:39
completed here let's use is completed State and it will be a
57:50
bullion all right now here we have to initialize the state
57:56
so instead of uh initializing all the state right here let's just create initial
58:06
State and here we'll use the Deep research State
58:12
type equal to let me just copy all this right
58:18
here and we'll use spr operator after the questions
58:28
let's add an empty array for the answers and is completed to false Also let's
58:35
copy all these three methods and paste them right here and instead of
58:43
void we'll use this instead of index let's just use
58:52
current question
59:00
all right let's set a current question with index zero now let's use this state
59:06
and this methods so in the question form along with questions let's extract the current
59:16
question answers array Set current question
59:22
method set answers method set is
59:28
completed and let's set uh one more State uh for the
59:36
loading let's just add add is
59:44
loading set as loading
1:00:08
and here let's extract is loading now here initially we have empty string for
1:00:15
the answers but it should be
1:00:20
answers of current question of or an
1:00:27
empty string because when we click on previous there should be an answer to that particular question already there
1:00:34
so on submit let's just uh add an array let's
1:00:39
says new answers equal to which will be
1:00:46
a copy of the answer State and here we'll use it to add the
1:00:56
next answers so just say new answers and here we'll use the current question index
1:01:04
equal to values do
1:01:12
answer that's it and then we will set the answers array answer state with this new answers
1:01:20
array all right now let's uh uh add the next and the PS buttons so here let's
1:01:29
create one div with the class flex and inside this D let me just copy
1:01:35
this button paste it right here for two times now in the first button let me just
1:01:43
write previous and change this type sub submit to
1:01:49
button set variant
1:01:54
outline and here on click on the previous button we'll change the
1:02:02
index so if current question is greater than
1:02:11
zero then Set current
1:02:17
question current question minus one so if the current question let's say is the
1:02:24
second question then uh whenever someone clicks on previous it should go to the first question so that's why we are
1:02:29
decreasing the uh question index so when we click on a previous uh previous
1:02:34
button it should also uh show the previous question along with that particular answer so that's why we have
1:02:41
to set the form as well so just say form. set
1:02:47
values here answer input and let's set the
1:02:54
answers current question minus
1:03:01
one let's change this to set value let me save this and let's uh
1:03:07
check it out but before that we also have to uh add the next button so here
1:03:15
let's just say if current question is uh equal to last question that means
1:03:22
equations do length minus 1
1:03:27
then we'll just say start
1:03:32
research else we'll just say
1:03:43
next and let's keep it disabled when
1:03:50
the is loading state is true all right let's save this
1:03:59
let me just uh change this and also Let's uh render the question as well so
1:04:06
here the car instead of card content let's uh
1:04:11
use questions with the current question
1:04:19
index and the class name let's just say text size to
1:04:27
text-base all right so this is question one let's just write answer one click on
1:04:35
next now it should go to the next question so we have to update in the on
1:04:43
submit function so here if current question that means the
1:04:49
current index of that particular question is less than questions Dot
1:04:56
length minus one then uh change the uh question index so
1:05:03
Set current question to current question + one that means the
1:05:09
next question and also reset the form so that
1:05:15
uh user can uh fill the input now let's uh test this
1:05:22
out let me just say answer one click on next X now this is question two answer
1:05:31
two answer three A4 and now it says start research
1:05:40
all right let's just style these buttons a bit so let's find the do right here I
1:05:50
just say justify center items Center here set set this to between not
1:05:57
the center all right looks much better let's
1:06:03
add the progress and the bottom for that after this form let's
1:06:10
add one Dev let's add one more D here now in the first
1:06:16
D we can say height to one withth to full BG
1:06:24
gray uh 200 and keep
1:06:32
rounded for this D let's just self close this and add the
1:06:42
class set height one BG primary
1:06:49
rounded transition all duration 300
1:06:56
and let's use the style use double presses set
1:07:02
width use back text and here we'll pass the let's say F current
1:07:11
question + one and let's divide it by questions dot
1:07:20
length let's make it a percentage so let's add this and in a parenthesis and
1:07:27
multiply it by 100 here let's add the percentage so
1:07:33
basically this will show the progress based on uh the position of the current question let me save
1:07:41
this all right so now we are on the third question we click next here we are
1:07:47
on the fourth question 3 2 1 all right it looks much
1:07:52
better so let me explain what we did so far first we have defined few states to
1:08:02
store the answer to store the current questions index now this is completed is
1:08:07
to uh store whether the question form is completed or not and this is the loading State and we have defined few methods to
1:08:15
set this States now here if you check the on submit function first we are
1:08:22
saving the current answer in the answers array for the current question and then
1:08:28
we have one condition so if this is not the last question then it should go to the next question so that's why we are
1:08:35
increasing the question index and then we are resetting that particular form
1:08:41
for the next question now here let's also add
1:08:46
SSE set is completed to true that means the uh question form is
1:08:53
completed and here instead of one let me just use current question plus
1:09:02
one all right so this is the logic to uh go to the next question and to store the
1:09:10
answer of the current question and then if you go right here if uh the question
1:09:17
is not the first question then we can go go back to the previous question by
1:09:22
decreasing the current question index and and also we are setting the answer
1:09:28
value for that particular question since we have already answered that
1:09:33
question so that's it now let me just uh remove the initial state so from the
1:09:41
store let's just set this to an empty array and then let me go to the user
1:09:48
input and here we are setting the equations so let's test this out
1:09:57
Let's uh add one condition for this question
1:10:04
form F questions
1:10:09
dot length is uh equal to
1:10:15
Z then just
1:10:20
return all right it's gone now let's just write this is how to
1:10:25
run deep C Caron locally query and click
1:10:30
submit all right it has generated uh all the four
1:10:36
questions two three and four all right let's just uh change uh show the loading
1:10:44
state right here on the submit button so let's go to the user input let's just uh
1:10:52
get the is loading and set is
1:11:01
loading let's copy this and on
1:11:07
submit say true and here and they
1:11:12
finally block we'll change this to
1:11:21
false let's use this is loading right
1:11:26
here so instead of submit let's just sa if is
1:11:32
loading then let's render one loader to icon from Lucid
1:11:38
react set the class name margin right to 2 H 4 with 4 and animate
1:11:50
Spin and just say generating
1:11:57
else just say submit and we'll disable this submit
1:12:05
button when is loading state is true Let's test this
1:12:12
out click submit and now it's generating all
1:12:20
right okay great now let's create the endpoint to do the Deep Reser
1:12:25
now before that let me show you what we are using so in the AIS SDK we are using
1:12:34
uh the use chat hook so if you go to the
1:12:40
AI SDK UI click on use chat so as mentioned here it allows you to easily
1:12:46
create a conversational user interface for your chatbot application it enables the streaming of chat messages from your
1:12:53
AI provider manages the state of for chat input and up updates the UI
1:12:58
automatically now uh if you want to show the uh all the states such as activities
1:13:05
of our agent then it is better to use this use
1:13:11
chat let me just show you how we can use it so in the Q&A let's just get uh let
1:13:20
me copy this
1:13:25
and make sure to import it from asdk /
1:13:31
react so it will give us the uh you uh the conversation messages uh you can
1:13:37
also attach this with the input as well but we don't need that we only
1:13:42
need append method to append the next uh message and here here we have to uh set
1:13:51
the API endpoint so we'll set the API at a AP /de research so using this upend we will
1:14:01
uh add the message and in the message we will add the topic and the question
1:14:07
answers so let's do that let's say use
1:14:16
effect here let's add is completed State
1:14:22
and let's import this state from the use deep Research
1:14:34
store just copy this paste it right here we'll also need the
1:14:42
topic answers then uh set is loading all right
1:14:50
so in the dependency along with the is completed let's also add
1:14:58
the questions answers and topic and set the
1:15:04
append as well so in the user effect first let's check if is completed that
1:15:11
means the question form is completed and questions. length is greater than
1:15:18
zero only then let's combine question and answers so let's create one variable
1:15:25
just say clarifications equal to questions.
1:15:32
map let's grab the equation and
1:15:38
index here let's uh send one object which will
1:15:45
have the question and let's grab the answer for that particular question
1:15:51
using the index for that you can use answers and here pass the
1:15:56
index so this is how we'll store the question answers uh in an array of
1:16:04
object and then we'll use the append method if you want to learn more about
1:16:10
this you can check the
1:16:15
documentation go right here and here are all the parameters and values that use
1:16:21
chat returns and now in this method there is
1:16:26
one property called role so here we are sending message as
1:16:32
the user and then let's add the content we'll use json.
1:16:38
stringify and here let's add topic and
1:16:52
clarifications that's it so uh when this use effect will run so
1:16:58
whenever we uh fill fill the last question then it will set this is completed state to true and whenever any
1:17:04
changes happen to the is completed state it will run this use effect hook now before we taste this we have to create
1:17:11
this endpoint so let's go to the API and here let's
1:17:18
create deep research folder make sure it is in the API
1:17:27
folder and let's add route. TS file and let's add export async function
1:17:36
post we'll get the
1:17:43
request and here let's use the try cat
1:17:51
Block in the try first let's get the data from
1:18:00
await request. Json and let's just log this
1:18:07
data here let's just return one new
1:18:12
response now here it is better to use the response instead of next response
1:18:18
because uh we are sending this response to the use chat hook here let's use Json
1:18:24
do stringify and let's just say success to
1:18:32
true and along with this let's set status to 200 it should
1:18:40
be outside of this all right let's also copy this and P right
1:18:49
here success to false and send the error message let's
1:18:57
say if error is an instance of error
1:19:02
then we'll send the error. message let just say invalid message
1:19:09
format so that's it let's save this and check whether we
1:19:15
are getting the right uh question answers or
1:19:21
not let me just uh say anything
1:19:28
randomly so after I click on start research it should show the log right
1:19:37
here okay so we are getting ID and messages and in the messages we are
1:19:43
getting the content so we have stringified object that contains the
1:19:49
topic and an array of question answers object let's pass this
1:19:57
so from the data let's get the messages now let me remove this and here
1:20:04
let me add one variable that's called last message content and let's grab
1:20:11
the messages and the last message so
1:20:17
messages dot length minus one do content because we need the this
1:20:26
content from the messages all right now let's use one
1:20:32
variable called pass and here we'll use json. par and let's pass this last
1:20:40
message content let's just log this
1:20:53
first let me click CLI on start research again all right so now we are getting
1:21:00
the whole object we are getting the topic and
1:21:06
clarifications so let's uh store the
1:21:11
topic past. topic
1:21:17
and con clarifications equal to pass DOT
1:21:24
clar fications all right now we will Implement all these
1:21:31
steps mentioned in this diagram we got the inputs we got the topic and the clarifications now before we implement
1:21:38
this uh generate uh research Plan before
1:21:43
that if uh anyone of you uh are not able to add any credits to the open router
1:21:50
account you should use the free models available right here but make sure that
1:21:55
they support the tools and the structured outputs uh if you don't want to use the open router you can also
1:22:01
there is one more option you can also use this uh Gro gro.com go to the gro.com create an account and create the
1:22:09
API key then uh make sure to check the models from The Grog
1:22:17
documentation and in the versal asdk similar uh to what it has for the open
1:22:23
router right here it has also have the same functionality for the grow provider
1:22:31
so make sure you use that install the gro and follow all the steps to use the
1:22:39
gro and its models for this tutorial we are going to use this open
1:22:45
router now before we implement this uh diagram into the nextjs route uh we
1:22:52
should not add everything in just one route file because uh it will decrease the code readability so instead we can
1:23:01
plan this things in different files such as uh we can uh store all the constants
1:23:08
such as model names in the constant. TS file and we can create a default model
1:23:13
caller function so we don't have to create the same function again in the model Dash call. TS file uh we'll add
1:23:21
our main function in the main.ts and prompts in the prompt .ts file and we'll
1:23:26
store all of functions such as research extract Etc in the research functions.
1:23:31
DS file and in the services we'll store the initialization for EXO search and
1:23:37
open router so we don't have to repeat that for different files and we'll store the types in the types. TS file and
1:23:44
utility function in the utils dots file so let's uh create uh all these files
1:23:50
step by step
1:23:57
now first let me show you how we are going to send the response we are not going to send the response like this
1:24:03
because uh if you see in the Q&A component we have used the use chat and
1:24:09
use chat does not accept response like this so instead we will stream the
1:24:15
response back to the front end for that we are going to use one function called
1:24:20
as create data stream response response from the versal SDK so this
1:24:28
function creates a response object that streams data back to the client so let let me just copy
1:24:37
this and instead of this let's
1:24:42
return create data stream response function let me remove all this we just
1:24:48
need this execute function and let's make it an arrow function
1:24:55
all right let me remove all
1:25:04
this okay so make sure to import it from the EI now here this execute function uh
1:25:11
provides us the data stream and using that data stream we can send the data from the back end to the front end like
1:25:18
uh here you can see they are sending the value as a hello to directly to the front end let's see if this is working
1:25:25
or not and uh to catch this value on the front end
1:25:31
side from the Q&A component we can get it from the data and here we have loged
1:25:39
that data so let me just complete this step let's add the let's add any
1:25:51
answers so now when I click on this start research it will send all the question answers with the topic to our
1:25:58
deep uh deep research API endpoint and then it should stream the
1:26:04
data back all right we got the data and hello as the value so this is how we will send
1:26:11
the different status of our agent such as activities and the sources back to the front
1:26:18
end now if we open the diagram here we are uh storing a lot of things so uh
1:26:25
let's create a one research state that goes into different functions and update that state
1:26:31
accordingly so let me open the route. DS
1:26:38
file let me just comment this out for now and let's create the research
1:26:45
State this will be an object it will contain completed
1:26:52
steps initially it should be a zero so we'll uh increase this completed steps
1:26:59
uh when whenever we uh go to the next step such as a search extract analysis Etc after this let's add the token used
1:27:08
for each llm calls and then we'll store the findings in an
1:27:14
array after that we'll uh add the already processed
1:27:19
URLs uh in here so that uh it does not extract the the content from the same
1:27:26
URL so it prevents the duplication of particular URL because we are searching
1:27:32
for multiple queries and maybe there are one or two queries that provide the same result so we don't want to extract that
1:27:38
again for that we'll use the new
1:27:45
set and then qualification clarifications text so
1:27:52
we'll uh store this text text as a clarification that has the question
1:27:57
answers as a string so just say json. stringify and pass the
1:28:05
clarifications all right let's also Define the type for This research state
1:28:11
so just say research State and for this type we'll create uh one file called
1:28:18
types. TS and here let's just export interface
1:28:26
let me just copy all this P it right here and let's add the
1:28:32
type number now this finding will have the
1:28:39
summary and the source so for that let's create uh that as well so export
1:28:47
interface research findings
1:28:55
and let's add summary as a string and then source as string as
1:29:04
well and we'll use this research finding right here as an
1:29:12
array and here let's just say set of
1:29:21
string and the clarification text will be the type of string let's save this make sure to
1:29:28
import it right here let me add one more thing which is
1:29:34
the topic and it will be from the topic variable right here
1:29:41
let's add the type for that as a string so topic will be
1:29:47
string now we'll pass this whole state into the main our main function so let's
1:29:53
create it so just say main. DS and here we'll
1:29:59
create an function called Asing function deep
1:30:05
research so this will be our main function and it will accept the research
1:30:11
State make sure to add its type from the types. uh types. TS
1:30:17
file and data stream because we want to send all the events to the front end so
1:30:25
we'll use the data stream for that and let's just say any for its type first we
1:30:32
need the initial queries so just say cons
1:30:37
initial queries equal to we have to create one
1:30:43
function that calls the llm provides the topic and the clarification and based on that it should provide us the search
1:30:49
queries so for that we'll create one function that uh that is called has generate search queries and this
1:30:58
function will have the research State
1:31:04
that's it so let's create this function in a separate file called
1:31:10
research- functions. DS just export async function call generate
1:31:19
search queries and here it will have research
1:31:33
state so first let's use the generate object function let's just copy it from
1:31:38
this generate questions let's copy
1:31:49
this and paste it right here make sure to import it
1:31:55
now here uh we are going to use this open outer for different functions so instead of initializing it for a
1:32:01
multiple files let's just create one file called Services
1:32:07
dots and let's just copy all this and paste it in the
1:32:16
services make sure to export it all right let's use
1:32:22
this open router from
1:32:28
Services now here we'll pass the prompt along with the system prompt as
1:32:37
well and the schema so we also have to import this Z now we are going to use
1:32:43
this same function this generate object function again and again for multiple functions so instead of writing all this
1:32:50
uh let's just uh create uh one uh common function that we can use to call the llm
1:32:56
models for that let's create one file called Model caller. DS let's just
1:33:04
export async function call
1:33:10
model now this will accept an object of model
1:33:16
prompt system prompt schema and that's it for this we have to
1:33:22
create the types so name it as a model call options and let's define it in the
1:33:30
types. TS file so just say export interface model call
1:33:36
options and here let's say model string then
1:33:43
prompt will be string as well and system PR will also have the
1:33:50
typ string schema Let's uh use the Zod so import Zed from
1:33:58
Zod dot Zod
1:34:05
type let's just add T now here if you don't know the t is a
1:34:12
generic type parameter uh it is like a convention used to represent a type that
1:34:18
will be specified later on the run time so when the function or class or
1:34:23
interface is used then it gets its types make sure to provide it right here
1:34:31
as well let's copy
1:34:37
this and make sure to import it from the
1:34:42
types and here we have to add the D as
1:34:49
well now along with this we we will also pass the research
1:34:58
state so make sure to import its types as
1:35:04
well now this call moduel function will return as a promise
1:35:10
because it's an async function and This Promise will have either type t or
1:35:19
string
1:35:24
now let's just copy this right here and make sure to import
1:35:31
the open router from services and instead of this we'll pass the
1:35:44
model we'll pass the prompt and the system prompt and the schema as
1:35:52
well all right now here uh from this generate object function we'll get the
1:35:58
object and we can also get the usage detail now this usage detail will contain the total token used so let's uh
1:36:06
add add this and the research state so just say research state do
1:36:12
token used equal to Plus or equal to because we will keep incrementing the
1:36:19
token used usage dot total
1:36:26
tokens you can also read more about this usage from the documentation so if I go
1:36:33
right here in the return here it is usage so
1:36:41
it provides us uh three values prompt tokens so total number of tokens in the prompt completion tokens and the total
1:36:47
tokens so here we are using the total tokens and Let's uh increment the
1:36:54
completed step as well so research state DOT completed steps Plus+ that's it and
1:37:03
we return the object make sure to import this
1:37:09
function all right now let's use this function right here to generate the
1:37:15
search queries let's just say cons results result equal to await call model
1:37:24
and here let's pass uh the model now for this uh we'll use the open AI SL
1:37:35
gb-4 you can get all the model names from here just you just have to
1:37:41
copy this after the model let's pass the
1:37:48
prompt system prompt and the schema for let let me
1:37:54
write this schema so make sure to import The Zed from Zod doob so in the output I want an array of
1:38:03
uh strings that contains the search queries so we'll uh have one object from
1:38:10
the output and in this object we'll have search
1:38:17
queries so for that we want the search queries in an array
1:38:23
of z. string let's describe this uh type so
1:38:29
just say describe just add description of what
1:38:35
you want so we want search queries that can be used to find the most
1:38:45
relevant content which can be used to write the
1:38:52
compr H report on the given
1:38:58
topic we want uh maximum let's say three
1:39:03
queries so we'll get uh three uh an array of three to four queries stored in
1:39:11
the search queries in an output object so for the prompt and system uh system
1:39:16
prompt let me create one file called prompts dots let me paste all the
1:39:22
prompts right here all
1:39:29
right so first let me check the planning system
1:39:35
prompt so we will use this and this so this is the system prompt so you can pause this video and read this system
1:39:42
prompt to understand uh why we are using this to get the search
1:39:47
queries basically we are telling the llm to get us the uh right search queries
1:39:54
based on the given topic and the clarification and in the prompt we are providing that topic and the
1:40:00
clarification text so let's use both of these prompts so first let's import the
1:40:07
system prompt make sure you import
1:40:12
it from the prompts and for this prompt we are passing two things topic
1:40:19
and the clarification text so let's use this just add the get planning prompt and in
1:40:26
this function let's pass the topic so for that we'll use research
1:40:32
state do topic research state do clarification text so that's it and
1:40:38
let's return the result make sure you import the call
1:40:46
model and me remove this actually we have to pass one more
1:40:51
thing which is the research State all right so to summarize what we
1:40:58
did so far first let me go to the
1:41:05
route here we have defined the research State and to use this research State we
1:41:10
are uh creating one main function and this main function first it will get the
1:41:16
it will generate the initial search queries and for that we have created uh the generate search queries function in
1:41:22
this research function file and since we are going to use the generate object function multiple times so that's why we
1:41:28
have uh created this common model color call model function in the model caller
1:41:33
file that's it so let's uh let's see uh what type of queries we are
1:41:39
getting so here let's import it and let me just log this initial
1:41:47
queries let's return this queries
1:41:55
let's call this function in the outout file let's say await deep research make
1:42:01
sure to import it from Main pass the research State and the data
1:42:08
string let's make it an async function let's save
1:42:17
this let me reload it
1:42:25
now let's give correct
1:42:30
answers for the complexity I want Advanced technical
1:42:37
details and perspective let's just say academic
1:42:43
research and exclude non technical
1:42:49
sources let's click on start research
1:42:55
and here it is so we got the three search queries DC Caron local installation guide 2025 how to set up
1:43:01
DEC Caron on local machine and running deeps Caron locally step byep tutorial so we'll use all these three queries and
1:43:08
use the EXA search API to search for all these queries so let me show you uh how
1:43:14
the EXA API works so make sure you are in uh you have created account in the
1:43:20
xa. website and go to this uh search first let me copy this query and
1:43:27
paste it right here and let's uh check for all the
1:43:33
options so there are two types of searches that you can do using the EXO search neural and the keyword but for
1:43:40
our use case it is better to use the keyword search because we want to get the top uh three to four results for
1:43:46
each queries and here you can also add categories but uh we want do that uh and
1:43:53
maximum let's say I want top three results and here the publish date range
1:44:00
uh we want uh uh content that are that is published
1:44:05
in last uh let's say 6 months same for the crawl let's just select 6
1:44:13
months and we want to exclude uh YouTube because so it is not uh getting any
1:44:20
content from the YouTube it is just providing us the likes views comments and the uh description only so just say
1:44:30
youtube.com and crawling we don't want to do the live crawl it will cost a little bit
1:44:36
more uh make sure you have selected this we want full page text and for maximum
1:44:42
characters per result we want to extract all the content from the web page so that's why we'll set up the uh large
1:44:50
number of character so let's just say 20 ,000 and here it is that's it if you
1:44:58
want EIP summary you can also enable this but it will be a little slow and but we don't need this summar because we
1:45:05
are creating this from scratch so we'll extract the all the information using another llm
1:45:10
call let's just run
1:45:15
this all right so we got one two and three results from uh the web search and
1:45:23
we are getting all the content in this uh text property so if you see this we
1:45:30
are getting a lot of content extracted from each
1:45:35
page so that is the benefit of using EXA search you don't have to crawl for all
1:45:41
these pages and get the text instead within the just a few second you can get the content of multiple web
1:45:48
pages all right so let's just use this code before that uh let's install the
1:45:54
EXA DJs Library so npm I EXA DJs and also make
1:46:02
sure to get the API key so go to the API keys and I have already created one so
1:46:10
let me create this again for the tutorial a key and let me copy
1:46:18
this let's use that API key so let me open the EnV file and here let's just
1:46:25
say EXA search API
1:46:31
key and paste the key let's use this so uh let's go to the res search
1:46:39
functions and here let me create the search function let's say export
1:46:46
async function called search now this function will accept the
1:46:52
query to search uh along with the research
1:47:00
State let's import its type from the types. DS file and it will
1:47:09
return One Promise This Promise will contain the
1:47:16
array of search result let's define this type in the types. DS
1:47:25
file export interface search results it will have the
1:47:32
title and a string then URL which also a string and
1:47:41
the content in string type let's use
1:47:50
this right here now let's add the try catch block
1:47:57
First Catch will have the error and for now let's just log the
1:48:07
error now in the try let's go to the EXA search
1:48:15
playground let me select all the options that we have selected so far
1:48:28
all right so let's uh copy all this code
1:48:33
first let's copy both of these lines and we'll add it in the services. DS
1:48:40
file and here let's just say process. env.
1:48:47
EXA let me copy it from the EnV exess our
1:48:54
API or an empty string let's export
1:49:04
this and let's use it in right here so let me copy this
1:49:14
result and paste it right here make sure to import the
1:49:20
EXA so we are using EXA do search and contents and here we'll pass the
1:49:31
query now for the start publish date instead of this date let's just use uh
1:49:36
the date function so just say new date date do now minus we want content
1:49:46
that is uh published in the last year so that's why we'll minus the 360
1:49:53
65 into 24 into 60 Minutes 60 seconds
1:50:01
and 1,00 to ISO string so this will uh give
1:50:09
us the uh one year from
1:50:16
today let me copy this and
1:50:22
for the end publish date we'll just use new
1:50:28
date dot to ISO
1:50:34
string the start scroll let's just skip the one
1:50:39
here from
1:50:48
today all right so that's it now it should return uh has uh all these
1:50:54
details that we have seen in the response let me run this again and see the
1:51:01
response so uh we are getting uh results in the data and results in the results
1:51:08
we want to use this text title and the URL so let's uh filter this
1:51:14
out let's store the filter result in a variable called filtered results equal
1:51:21
to result dot results let's change this
1:51:27
name to search
1:51:32
result search result or results and let's filter it let's filter
1:51:38
any content uh that does not have the title or Tex
1:51:44
so let's use the arrow function R do title
1:51:50
andn R do text is not equal to undefined only then
1:51:57
return it and let's map it we don't want uh all this details we only want text
1:52:04
URL and the title so in the map let's pass the r as a
1:52:12
content and here we'll return one object this object will contain the title so
1:52:18
say r. title R an empty string let's copy this for two more
1:52:26
times we want our do
1:52:31
URL and
1:52:37
content so just say. text all right after this let's uh increment the
1:52:44
completed step from the search state research state DOT completed steps Plus
1:52:52
plus all right and let's return this filtered
1:52:58
results let's just save this go to the main so we are getting uh three three
1:53:05
initial queries right here so let's store it in the const let's just let
1:53:12
current queries equal to initial queries dot
1:53:19
search queries because we are getting search queries and in the
1:53:27
object so let's use it right here now here I have used lead because we are
1:53:32
going to change this current query variable later now
1:53:38
here let me add one Loop now here we are using the while loop to uh get the
1:53:44
search results for each of the queries so first we'll check if it is defined or
1:53:49
not if it is defined and it's l L is greater than zero then we'll keep
1:53:55
running this Loop and in this Loop let's get the search
1:54:02
results so for that let's add current queries. map for each
1:54:10
query let's get the search function and pass that query along with
1:54:17
the research State now here
1:54:23
type of query will be string and let's
1:54:29
uh add the type as any for this initial
1:54:38
queries all right let me just log this for now
1:54:45
console.log search results now after this to stop the loop we have to had an
1:54:53
uh empty array for the current queries since we have used all the queries and pass it to the search function let me
1:55:00
save this and let's check this out let's click on start
1:55:06
research it should provide us three
1:55:12
queries all right we are getting uh the search results in a promise so for that
1:55:20
let's just settle this promise let just say cons search
1:55:26
results responses equal to we'll use await
1:55:32
promise do all
1:55:38
settled and here we'll pass all this promises and let's log
1:55:44
this let me save it click on again
1:55:52
all right so all the status is fulfilled and we are getting uh the result in the value so let's extract
1:56:01
that just say all search results now here I'm using this
1:56:08
promise because I want to uh execute this search function parallell for each
1:56:13
queries if we go uh if you execute this function individually then it will take
1:56:18
a little bit more time so that's why we are using this uh the the promp is
1:56:23
here and here let's extract the value so search result responses do
1:56:30
filter let's get the result and let's check the result
1:56:39
dot status it should be equal to
1:56:45
fulfilled and then result. value do length should be
1:56:52
greater than zero then map result
1:56:59
to results. value and let's uh make it to the array
1:57:08
so just say flat and let's log this let me save this like start
1:57:18
research all right so we are getting all the content from the web search we got uh three
1:57:26
search results not three actually we got nine because we have passed three queries and
1:57:33
for each queries we are getting the uh three web searches so we got title URL
1:57:39
and content so let's use all of this and let's extract the
1:57:44
data because we cannot pass this whole data into a single llm call instead we
1:57:50
will summarize all the content so our next step is to process the
1:57:59
search results okay for this we'll create U one function right here just
1:58:06
say export async function process
1:58:13
search results now this function we'll have uh search results
1:58:25
let's add its type as an
1:58:32
array next we'll pass the research
1:58:37
State same as we did for the generate search queries that's it so let's use it
1:58:45
now here first we need to extract the content and we need to Summarize each
1:58:51
web result and for that let me create another function that we will use to extract the
1:58:58
content so let me write export async function called extract
1:59:06
content now this function uh will accept the content as a
1:59:13
string URL as a string as well and the research state
1:59:25
that's it and here we will call the model so just say
1:59:31
const result equal to a wait call
1:59:39
model and here let's pass the model name
1:59:44
so for the extraction uh since we are using this extract content function for multiple times it is better to use
1:59:50
cheaper llm model so that's that's why we'll use open AI SL
1:59:56
gp-4 D mini all right and for the prompt let's
2:00:03
get it from the prompt. DS file so for the extraction we will use
2:00:09
this prompt get extraction prompt and in this prompt uh we are passing the content topic and the clarification text
2:00:17
so let me call this here let's pass
2:00:23
content research state. topic research state. clarification text and after that
2:00:32
let's pass the system prompt let me uh provide you the system prompt uh this
2:00:39
system prompt will extract the uh main main content that we need uh for to
2:00:45
fulfill this topic and this question answers you can just pause the video and read this whole prompt so in this prompt
2:00:52
first I have give it a role of a senior technical documentation writer and I
2:00:57
have clearly stated that you need to extract the relevant content that is relevant to this particular topic and
2:01:04
the given question answers so based on that it will extract the content and
2:01:09
provide us the summary so let's use this prompt right
2:01:16
here so after this system Let's uh add the schema that
2:01:24
doob in the object let's extract this
2:01:30
summary so just say Z do string and describe
2:01:36
it let's say a comprehensive summary of the content
2:01:44
that's it now along with uh this details we also have to provide the research state to the call model function
2:01:52
and that's it so from the result we we will get this summary here we will
2:01:58
return an object this object will contain the URL and the summary so just say result
2:02:06
do summary that's it let me resolve this
2:02:12
error so result as any type for now let me just disable this
2:02:18
warning let's use this ex content function now here we are getting an
2:02:23
array of search results so for each item we will call this extra content function so so what we did uh for this uh search
2:02:31
let's do the same let me just go to the main and let's copy all
2:02:37
this and P it right here and let's change the name just say
2:02:43
extraction promises so here instead of current queries we'll provide the search
2:02:50
results and for each search result let's use the extract content and instead of
2:02:57
query let's just say result and in the extra content we'll
2:03:03
provide the result. content result.
2:03:09
URL and that's it all right so we'll get
2:03:14
uh promises let's resolve it let's change
2:03:19
this and just say extract ction results and pass this promises right here and
2:03:27
let's store all these expected result in a constant called new findings all right
2:03:36
so from here we'll extract the required content first we'll filter if result
2:03:42
result. status is fulfilled and result do value instead of checking the length
2:03:49
let's just say result. value is not equal to null
2:03:55
and result. value is not equal to un
2:04:00
defined all right and here let me remove this
2:04:06
flat and let's use one object and first let's extract the
2:04:13
summary and URL from the result. value and let's return it summary
2:04:22
as a summary and URL as the source so that's it now this process
2:04:29
search results function will return a promise with
2:04:35
the research findings array let's import This
2:04:41
research findings from the types and let's return this new
2:04:47
findings all right now here we got one type error to to resolve this you have
2:04:53
to define the type for this extraction result so let's just write the type here
2:04:58
let's say extraction result now it will contain one URL with the string and
2:05:06
summary and string type now let's use this right here so
2:05:12
first add the parenthesis and just say result is promise fulfilled uh result
2:05:21
and here let's add this type all right now this error is gone now this function
2:05:27
will take that search result and resarch state pass it to the extract content function which will extract the relevant
2:05:34
content and store it as a summary and then we are getting the content from this uh
2:05:40
promises and we are extracting the summary and URL as the source and we are
2:05:46
sending it as a new finding so let's use this uh function right here let me
2:05:54
remove this and just say new findings
2:05:59
equal to a wait process search results here let's just uh send this all
2:06:07
search results and the research State make sure to import
2:06:16
it let's log this new findings now up to this point if you
2:06:22
feel anything is uh you know hard or complex then you can always log each and
2:06:28
every steps to see what is happening let me save this and uh also
2:06:34
let me go to the search and instead of three let's just say one to uh just uh
2:06:41
make the process more faster later we'll increase this now let's uh test this out click on
2:06:49
start research all right now we have to wait for a few seconds because it will
2:06:55
uh take a time to search and extract the content from each search results and
2:07:00
here we got the summary we should be able to get the
2:07:06
three web search results so for each query we are getting this summary in a
2:07:12
properly marked down format we got the summary and the source URL this is the second summary and this
2:07:19
is the third summary all right so extraction uh layer is completed now
2:07:25
let's see the diagram so initial search quer is done in the loop we have extracted the relevant content now here
2:07:32
we have yet to store it in the research finding so let's go right in the Deep
2:07:38
research function and let's use the research state DOT
2:07:46
findings equal to First we'll get the old findings from the dat do findings
2:07:54
and then we'll add this new findings all right so let's uh save it and check the
2:08:02
diagram now here in the extract content layer we have this filter 11 but I have
2:08:07
not implemented this right here in this layer because uh I don't want to uh use
2:08:13
the lower or cheaper llm model to decide whether this extracted content is relevant to the topic and the
2:08:19
clarification text or not in said we will uh store everything in the research findings and then we'll use a higher llm
2:08:27
model to analyze the whole content if you want to uh implement this relevance uh in the extraction layer you
2:08:34
can do this by just adding one schema so if you go to the research function and
2:08:39
go to the extra content here with the summary you can also add the
2:08:45
relevant and just say Boolean and here you can describe it as
2:08:53
a true if the summary is relevant to the
2:09:00
provided content to the provided topic else false so that's it and if it is
2:09:08
true then return this so let's say result. relevant is true and return the
2:09:16
summary else return an empty string so you can uh do uh something like this to
2:09:21
extract uh it but in practice uh I don't uh find this approach very promising so
2:09:28
that's why I'm not using this relevant right here instead we will filter out the content in the analyze
2:09:36
layer all right so now let's implement this analyze content
2:09:42
function let's go right here up the extract content and process search
2:09:49
results let's create the analyze finding function just write export async
2:09:57
function and write analyze findings now this function will
2:10:03
accept research
2:10:09
State and current queries which will be an array of
2:10:17
[Music] string that's also pass current
2:10:23
iteration which will be a number and uh that's
2:10:29
it now in this function first let me Implement try and catch
2:10:37
block let's just log the error for now now in the tri block first we'll
2:10:44
extract the uh content from the finding so just say const content text equal to
2:10:53
findings now this findings will contain the content and the source so if you
2:10:59
open the types and here it is research finding summary
2:11:05
and the source so let's convert it into a string for that we'll create a combine findings
2:11:11
function in the utils so let's create that just
2:11:17
say. DS and here export
2:11:24
const combine findings equal to this will accept the
2:11:33
findings research findings from types an ARR and it will return a
2:11:43
string now here we'll return findings dot map
2:11:53
finding here we'll uh store summary and sources in a single line so let's just
2:12:02
add the finding dot summary and let's use the N to separate
2:12:12
the source and the findings finding do source
2:12:21
and again let's use dot join
2:12:27
with sln sln triple d/n sln so this way we we are
2:12:35
separating the summary and the source but combining in a single string now
2:12:41
here this joint will separate the each of the findings from this findings
2:12:47
array let's use this function right here
2:12:53
and pass the research state DOT findings
2:12:59
all right so we got the content text now let's write cons result equal to a wait
2:13:06
let's call the model let's pass the model now here
2:13:12
we'll use the better llm now instead of adding models right here let's just uh
2:13:18
add them in a constant uh file so so just uh create one file in the Deep
2:13:23
research say constants DS and let me copy all this
2:13:29
right here so here are all the models that we are going to use and here are all the other uh constants such as Max
2:13:36
iteration maximum sear results Max content characters Max retry attempts and retry
2:13:42
delay now we will use the this last two later for now let me just uh change this
2:13:48
to three this to two and let's use use
2:13:53
this now we will use this analysis so here first let's import the models from
2:14:02
constants do analysis model let's do this for all the other functions so we
2:14:08
don't need to add in the search but in the extract we are using GPT 4 mini so
2:14:14
let's use models do extraction and for the
2:14:21
generate search query we'll use
2:14:27
models. planning now also in
2:14:33
here instead of this let's grab maximum search results from the constant and
2:14:41
here let's set max content characters now let's complete our
2:14:47
analyze finding function so after the model let's get the prompt from the
2:14:53
prompts dots file and here is the analysis prompt so
2:15:00
this is the system prompt first I have given it a role as mentioned here it
2:15:06
says you are an expert research analyst your task is to analyze the provided content and determine if it contains
2:15:12
enough substantive information to create a comprehensive report on the given topic so I have put a condition here uh
2:15:19
content is sufficient when it covers the core aspects of the topic provides factual information from credible
2:15:25
sources includes enough detail to support the comprehensive report and address the key points mentioned in the
2:15:31
topic clarification so basically uh in the prompt we are passing everything the topic the uh total content total
2:15:38
findings that we got and clarification text the question answer and current
2:15:43
queries as well as a previous query so that it don't generate uh new queries
2:15:49
similar to the current uh queries now here we are providing the current research state where we are uh giving
2:15:56
the current iteration of Maximum iterations and we have collected this finding length disting findings so far
2:16:04
and uh here are the previous attempts at information gathering have yielded this content length character characters of
2:16:11
content so why we are providing this current research date so that LM can
2:16:17
understand that we are currently reaching the maximum iterations or we
2:16:22
have already gathered so much data so we don't need more data so that's why it
2:16:27
give us the sufficient signal otherwise it will just keep asking you for more
2:16:35
details and this is how it should reply with a sufficient gaps and new queries
2:16:41
if required so you can just pause the video and re read this whole prompt and let me use
2:16:49
this so in the system let's import this file here let's
2:16:58
import get analysis prompt and here we'll need the content
2:17:04
text topic clarification text current queries current iterations maximum iteration and findings length so let's
2:17:11
add all those things let me import it
2:17:17
first first We'll add the content text then the research State DOT
2:17:25
topic then we'll need research state DOT clarification text the question
2:17:32
answers current queries which we'll get from
2:17:39
here after that the current iteration in the
2:17:45
loop and uh maximum iterations from the constants which can be three or five and
2:17:52
findings do length so you can get it by just using content text
2:18:00
Dot length that's it and after the system
2:18:06
let's add the schema Z
2:18:12
doob now in this object we'll need three things sufficient will which will be a set Dot
2:18:21
bullion whether the provided findings are sufficient or not let's describe it
2:18:27
let's just say whether the collected content is
2:18:34
sufficient for a useful report
2:18:40
then let's uh uh let's find the gaps and the findings if
2:18:47
any which will be an ARR of uh
2:18:53
let's describe it let's just say identify
2:18:59
identified gaps in the content and then there will be a new
2:19:07
queries z. array of
2:19:13
string and let's describe
2:19:18
it let's just say search queries for missing
2:19:26
information maximum up to three
2:19:32
queries all right now that's it now along with this object will also provide
2:19:38
the research state to the call model and then let's return this
2:19:48
result all right so our analyze findings function is done
2:19:55
let me save this and let's use this function in the main file so after uh we
2:20:02
process the search results Let's uh add this findings in the analyze
2:20:08
function let's just say const analysis equal to a wait analyze
2:20:16
findings make sure to import it in this function let's pass the
2:20:21
research State current queries and the
2:20:34
iteration let's define this here let's set let iteration equal
2:20:41
to zero and in the loop let's add one more condition and iteration is less
2:20:50
than maximum iterations from the constant so
2:20:55
this Loop will keep running until this iteration is less than the maximum iterations so along with that let's also
2:21:03
in increase the iteration whenever we are in the loop ration Plus+ all right so that's
2:21:13
it now in this analysis we are getting three things sufficient gaps and queries so let's use
2:21:20
it now here we will use one condition
2:21:25
if analysis dot
2:21:31
sufficient is true then let's break the loop that means the content is
2:21:36
sufficient else let's store the queries in the current queries so that our Loop
2:21:43
will keep going until there is a uh current queries right here so analysis
2:21:51
dot queries or an empty array now to be safe let's
2:22:00
filter it do filter
2:22:07
query now this query should not be in the current queries before so that's why
2:22:14
let's use the not operator current queries should not include
2:22:21
this given
2:22:33
query all right now here let me just add the any type analysis as any later if
2:22:41
you want you can create different types instead of using
2:22:48
this let's do this same for here as well so this Loop will keep on running
2:22:56
until there is uh no queries left in the current queries array or iteration
2:23:02
reaches the maximum iterations Here Also let's just add one
2:23:07
type let's say result is promise fulfill results and let's any
2:23:15
type for now so our Loop is complete so this Loop will keep on running until it
2:23:20
uh it finds the enough content to generate the report now here let's just log and see what the analyze function is
2:23:30
returning let me just log this and let's try this
2:23:37
out let me log few more things let's just say let's use PX and let's say we
2:23:47
got all search results. length search
2:23:57
results here let's just say our results are
2:24:03
processed let me add one more
2:24:10
here we are [Music] running on the
2:24:17
iteration number iteration minus
2:24:25
one and then once we are uh outside of this
2:24:30
Loop let me just log the
2:24:36
findings research state DOT
2:24:42
findings sol. log we are outside of the loop
2:24:53
with total iterations so let's
2:24:59
also get the iteration number let me save this in the
2:25:06
constant we have maximum search result up to one per query and let's set
2:25:11
maximum itation to three also here let me just change this
2:25:18
to just keep iteration because because we will start from one right now it is zero let's save this and check this
2:25:26
out we have already filled up the question answers let's click Start
2:25:36
research right so we are running on the iteration number one we got uh three search
2:25:45
queries now it will extract the uh search result and create a summary of each search
2:25:56
results and results are process and we got one object that says No Object
2:26:02
generated response did not match the schema so here uh the content is
2:26:09
sufficient and there is a few gaps but the queries are null and in the gaps it
2:26:15
is just uh asking to add additional examples and stuff but uh here queries
2:26:21
are null because we have uh in the prompts if you see here we have set
2:26:27
queries to null instead let's just set an empty array so that it won't return
2:26:33
null and let's try it again click Start
2:26:39
research all right we are running on the iteration number one we got uh three
2:26:44
search results now it will take a little bit time to extract the result
2:26:53
all right results are processed now it should be running the analysis function
2:26:58
and here it is so analysis says it is uh we don't have a sufficient content so
2:27:04
that's why it has given us three queries to run again and these are the gaps that
2:27:10
it found from the current findings right now we are running on the it number two
2:27:15
Let me just fast forward the video
2:27:22
and again uh it says uh we have we still have few gaps in the current finding so
2:27:30
it has generated three more queries and that's it so we got our
2:27:36
final findings we have 1 2 3 4 5 6
2:27:47
7 8 and nine summaries total so far and
2:27:53
after the three iterations we got uh this much findings so let's use this finding to generate the
2:28:00
report for that first we'll create one function that generates the report let's
2:28:07
write export asnc function generate
2:28:13
report and here we'll add the research state
2:28:24
here let's use try and catch block
2:28:35
first now in the try first let's uh combine the findings and generate one
2:28:41
large string so just say content text equal to combine findings and let's pass
2:28:49
the finding from resar state do findings all right now here now uh we will use
2:28:56
the reasoning model to generate the whole report so that's why it is better to use the generate text function
2:29:03
instead of generate object because reasoning model may not support the tools and the uh structured output so
2:29:10
that's why we will use the generate text this one so let me just copy this
2:29:18
and paste it right here now now uh instead of ping this function right here
2:29:23
let's add it in the uh call model function so go to the model callar and
2:29:30
here we'll put one condition if there is a
2:29:38
schema then use uh this one up to right
2:29:43
here else use the generate text function because generate text function
2:29:49
does not accept the schema so from here we'll get the text
2:29:57
and the usage let me just copy all this and P it
2:30:02
right here all right let's copy this as well and here we'll return
2:30:10
the text let's save
2:30:15
this let's just write cons report equal to await
2:30:20
call model in here let's pass the model
2:30:28
and models dot report now for the to
2:30:34
generate the report we are using this Google Gemini 2 flash thinking and uh
2:30:40
the best model I found so far to write the report is the enthropy CLA 3.7
2:30:46
thinking but it is uh costly so for the sake of of this tutoral we are going to use this one but for production you can
2:30:53
use this let's add the prompt let me see the
2:31:02
prompt so here it is here is the prompt I have given it a role of a senior
2:31:09
technical documentation writer with a deep expertise across many technical domains and your goal is to create
2:31:16
comprehensive authorative report on the provided topic that combines the provided research findings in your own
2:31:23
domain expertise and general knowledge and this is the format of the
2:31:28
report along with that we are also asking for the sources section and the further reading section so that the user
2:31:35
can do forther more research and we have also given it a current
2:31:41
year and we have H strictly said that you must provide the report markdown
2:31:47
format and enclose the report in report Texs so in the get report prompt we are
2:31:53
passing the content text topic and the clarification text let's use
2:32:01
this make sure to import it from the prompts let's pass the content
2:32:07
text and the research state. topic research state DOT clarification text
2:32:15
after this let's pass the system prompt
2:32:22
let's copy this and paste it right here after the
2:32:29
system here let's pass the research State now this will give us the error because we have not passed the schema
2:32:36
but schema is optional so let's uh add it in the types so let's open the
2:32:45
types and here let's make this an optional
2:32:51
the error is gone and now let's return the report and let's use this generated
2:32:58
report function and the main function after we get the findings let's generate the report await
2:33:06
generate report function let's pass the research State
2:33:13
that's it and let me log the report
2:33:23
let's remove this and save this now let's uh test this
2:33:28
out let me click on start
2:33:35
research let me fast forward the video
2:33:50
and as you can see it has generated the report enclos with this report
2:33:55
tags and it has uh created a really great comprehensive
2:34:02
report and here it is so with it has provided the overview
2:34:08
getting started with olama and installed models with all the system
2:34:18
requirements and it has has also included the FAQ section and here are the sources from which we have generated
2:34:25
this report and for the further reading it is uh also suggesting this resources
2:34:31
so we got the report now let's render all of this in the front
2:34:37
end now to send anything from uh backend to the front end we will use this uh
2:34:43
data stream right here so in the data stream let's just uh send one message
2:34:48
just say data stream stream. WR data and here you can pass any data in an object
2:34:55
so first let's just uh add one type
2:35:02
activity and after this let's send one content object and this content object
2:35:08
will have the type let's say search or
2:35:14
planning or we can also use the system since it is the first message
2:35:20
and the status it can be pending completed or uh just
2:35:26
started we can also add warning and the error status as well and the message so
2:35:33
research started and after the message let's add
2:35:39
the Tim stamp as well let's use date. now to get the
2:35:46
current timestamp and let's also add the completed
2:35:51
steps which we can get from the research state DOT completed
2:35:58
steps and then token use use so if you want we can also show this token use for
2:36:05
each steps research state DOT token used all
2:36:12
right so we are going to send all this information for different kind of uh uh functions such as if we are using the
2:36:18
search then and we will use search in the type in the status we can have a
2:36:23
pending complete error or warning and in the message we can send
2:36:31
different kind of message for each functions so instead of writing this uh for each and every function let's just
2:36:38
create one common function for this that can uh send different messages so we will only send this uh uh this three to
2:36:47
the function and it will just uh send those messages to the front end so let's uh create a function for this let's name
2:36:54
it as activity tracker and create a separate file for it let's just say
2:36:59
Activity Das tracker. DS now in this file let's just export
2:37:06
const one function called create activity
2:37:13
tracker now this tracker will accept the data stream
2:37:19
let's just say any for now and research
2:37:25
State make sure to import it type now here let's return one object and instead
2:37:33
of uh directly using this right here we will uh add one uh property in this
2:37:41
object called add and here let's pass the activity
2:37:47
details and one Arrow function and paste right here so basically this
2:37:53
three details are going to change for them we are going to pass this activity
2:38:00
using spre operator let's define its type in the types. TS
2:38:09
file let's just say export interface and write activity let's add
2:38:17
the type now type we'll have a search
2:38:24
extract analyze
2:38:29
generate and planning then we have a
2:38:35
status so it will have a pending status then
2:38:43
complete then warning and error
2:38:50
after status we have message which will be in the string type let's use
2:38:57
this and the activity
2:39:02
tracker make sure to import it from the types let's make this an arrow function
2:39:08
all right and remove this warning so why we have used this add
2:39:15
property because we can easily uh use this function uh like this just say constant
2:39:23
activity tracker equal to here we will use this uh function and we will pass
2:39:31
the data stream this data stream and the research
2:39:41
State and then we can directly use this and just say add and here we can add the
2:39:47
type status and the message for each and every activities save this and use this
2:39:58
function let me remove it so first let me create one activity
2:40:03
tracker let's just say const activity tracker equal to create
2:40:13
activity tracker and here we will pass the data stream and the research State all right
2:40:21
now let's use this activity tracker we have to pass it in all these functions so in the generate search queries let's
2:40:28
pass the activity tracker and let me go to the research function and open the generate search
2:40:34
query so along with the research State we will also pass this activity tracker
2:40:39
let's create the type for this activity
2:40:44
tracker and the types. TS file
2:40:50
let's use export type activity tracker equal to we
2:40:55
have used add that uh have the
2:41:03
activity and it is returning wide that's
2:41:09
it let's use this now let's use this activity tracker
2:41:17
just activity tracker do add first we will add the type so add
2:41:24
planning and uh for the status just say
2:41:30
pending and here let's send the message saying
2:41:36
planning the research that's it so here
2:41:42
we are getting error because we have to send this as an object so let's do that first is the
2:41:50
type second is the status and third is the
2:41:56
message all
2:42:01
right so let me copy this and once we get this results let's uh send one more
2:42:09
message saying planning is
2:42:16
complete and for the message just say crafted the research plan now here we
2:42:24
have to add this type status and message every time so instead let's uh change
2:42:29
the signature of this add function so go to the activity tracker and
2:42:34
here let me make it a regular function and then first let's add the
2:42:42
type we will get this type from activity type then status
2:42:49
from activity status and message from activity and
2:42:59
message all right let's use this type status and
2:43:09
message that's it let's save this now here we don't have to add the type
2:43:18
status and message we can only say
2:43:24
planning pending and the
2:43:29
message now let's say why we are getting this error expected one but got three
2:43:35
all right we have to change uh type here because we Chang this so let me just
2:43:42
copy this and it should be data not date
2:43:47
go to the types and paste the types right here all right
2:43:53
let's save this now the error is gone let's do the same for here as
2:44:03
well right now let's see if we are getting this in the front end or not let
2:44:09
me just go to the main.ts file and let's
2:44:14
just uh command this out for now because we have running only this generate
2:44:20
search queries function let me save this and here let me click on start
2:44:27
research all right we got one array and now we got two array so one is
2:44:35
before it generated the search queries and one is after it generated the queries so in the content we got all
2:44:41
this details type status message and the time stamp and same for this as
2:44:52
well all right so let's uh render all this and add more uh messages in each
2:45:01
and every functions let's go to the research functions and let me just copy
2:45:09
this now in the search let's also add
2:45:16
the activity tracker
2:45:23
now here let's just say search as a type pending as a status and here let's use
2:45:31
the back TI and just say searching for let's pass the
2:45:38
query all right looks great and let's copy this paste it right
2:45:47
here so search let's change this to complete and here let's just say
2:45:59
found filter results do length so found
2:46:05
102 results for this squarey all right let me copy
2:46:14
this and paste it for all the functions
2:46:21
the extract and we don't need to add uh for
2:46:26
the process results let's add here as well let's add in the
2:46:36
analyze and the generate report as
2:46:42
well now let's pass this activity tracker in all the function in the main
2:46:47
file let me uncomment all this and
2:46:54
here let's pass this activity tracker in all the functions in this search and process search results and
2:47:03
analyze findings and in the generate
2:47:10
aort all right so that's it and here let's add all the
2:47:16
messages so just copy
2:47:24
this now for the extract content let's just say extract as type pending as a status
2:47:33
and here let's just write extracting content
2:47:40
from this URL let me copy
2:47:46
this and use right here change the status to
2:47:54
complete and here let's just say extracted content from the
2:48:02
URL let's copy this so here we also have to pass the
2:48:11
activity
2:48:16
tracker we don't need to add any messages for the process search results because we are already doing that in the
2:48:23
extract content so let's skip this in the analyze finding let's add the
2:48:29
message now here change the status to pending and here type to
2:48:36
analyze and for the message let's just say
2:48:42
analyzing research findings let's also add the hydration so
2:48:50
just say hydration let's add the
2:48:57
current iteration one
2:49:02
of maxertion all right now
2:49:10
here let's change this to analyze complete and here let's just say
2:49:19
analyzed collected research findings that's it
2:49:26
and then we'll say whether the cont is content is sufficient or not based on
2:49:32
the results object so here we have sufficient so let's use
2:49:38
that let's just say is result is
2:49:45
content sufficient equal to result
2:49:51
dot sufficient now here sufficient ises not exist on string or all right so let's
2:49:59
just add a type here type of uh result
2:50:05
is not equal to string
2:50:14
then then it will use this let's use this one if it is true then let's just send one
2:50:21
message saying content is sufficient as we'll
2:50:29
say more research is needed that's it
2:50:34
let me copy this go to the generate report and here just say
2:50:40
generate and pending and here let's just say
2:50:47
generating comprehensive report let me copy this place it right
2:50:58
here complete and here we we will just say
2:51:08
generated compehensive
2:51:13
report total tokens
2:51:19
used let's just pass the total tokens from the research state DOT to
2:51:26
token used and just say research completed
2:51:36
in research state DOT completed steps all
2:51:44
right so that's it and here we are returning this report so let's send this report to the front end as well we can
2:51:51
do that do this from the main so we are getting the report right
2:51:59
here so let's send it using data stream
2:52:04
dot right data here we'll send one object with a type called
2:52:11
report and in the content let's send this report all right
2:52:19
that's it everything is done now let's uh capture this activity in the
2:52:26
data which will be in the Q&A component
2:52:31
right here so let's see let me taste this
2:52:39
again all right so we got two planning and the planning
2:52:47
completed and here where we are getting all the messages let's just uh uh create a front
2:52:54
end to uh display the activities let me close all this go to the Deep research
2:53:00
folder and let's create one file called research
2:53:06
activities. DS let's change this to
2:53:12
TSX all right now in the Q&A first we have to uh create a two states to store
2:53:19
the activities and the sources so let's do that in the Deep Research
2:53:25
store so here let me create
2:53:30
uh one state called uh
2:53:38
activities and which will be an empty array initially and after activities
2:53:44
there should be sources which is also an m and report in a string
2:53:51
format let's copy all this three add its type now for the
2:53:58
activities we'll use the activity type from the
2:54:06
types and for the sources let's just create One Source type right
2:54:12
here export interface source
2:54:20
just say URL as a string and title as a
2:54:26
string let me add this type in the types file because we are going to use that in
2:54:34
multiple files let's import this
2:54:40
source and report will be a string let's also create uh the
2:54:49
functions so first let's change this to
2:54:55
set AC PS and let's just copy this right here
2:55:03
and here change this type to activity and array after this let me just copy
2:55:11
this and here instead of activities let's use set
2:55:16
resources and here use sources and
2:55:24
Source that's it and add one more to set
2:55:32
report and the type of the report will be a
2:55:39
string that's it let's copy all this and paste it
2:55:47
right here let's set this to
2:55:55
wide all right so we have added uh three uh set functions and three state let's
2:56:03
use this state in the Q&A so we will store uh all the activities from the
2:56:09
data using one use effect first let let's use one condition
2:56:16
if there is no data then return now first let's extract the
2:56:27
activities and sources let's just a cons message equal
2:56:33
to data as unknown type let's change this to
2:56:40
messages and then let's use activities equal to messages
2:56:50
dot filter let's just say one message we got
2:56:56
one message and from the message first let's check type of message is equal to
2:57:03
an object and the message DOT
2:57:10
type should be activity let's just say message
2:57:18
as any and let's add this uh quick fix for the any and then let's
2:57:27
use map from map let's extract the message and set the message do content
2:57:34
because we have all our uh details in the message. content all
2:57:42
right and then let's store the sources so basically we are getting the URL from
2:57:49
the extract function so if you open the research function and go to the extract content here we are sending the URL so
2:57:56
we will specifically search for https patn in the extract type so let's
2:58:02
extract the sources sources equal to activities dot
2:58:08
filter from this activities we will filter
2:58:15
activity equal to activity do type it should
2:58:20
be extract
2:58:29
and activity do status should be
2:58:34
complete only then we'll use do map let's use
2:58:46
activity and let's add one object let's extract the URL from the
2:58:52
message so activity Dot
2:58:58
message dos split so here if you see we are sending
2:59:05
the message like this extracted content from so after from we'll get the URL so
2:59:12
that's why in the split we will use the from space and extract the URL
2:59:20
let's return URL and the title for the title let's
2:59:27
just split the URL do split by slash and we'll get its domain
2:59:36
in the third position of an array or just send the URL as title so this is
2:59:43
how we will get the sources now similarly let's extract the the report
2:59:48
from the coming data so let's just say cons report data equal to messages
2:59:57
doind let's extract the message and the type of uh message should be an
3:00:08
object and let me just copy
3:00:14
this message. type should be rep now let's set everything first we'll set
3:00:21
the activities but we have to extract it from here set
3:00:28
activities set sources and set report so
3:00:33
let's use this and add the
3:00:44
activities sources now let's set the report set report report data do content now
3:00:54
here we'll get the type error so let's just say report as
3:01:02
any now here let's add all the dependencies data
3:01:08
set activities set sources set report and also let's use
3:01:17
this set loading right here and in the loading we'll pass
3:01:22
the is loading
3:01:30
State let's pass the set loading and is
3:01:35
loading state so let me just summarize what we did so far so we created one
3:01:41
activity tracker that uses the data stream to send this whole object and we are only changing the type status and
3:01:47
the message M and then we have used this create activity tracker in the main.ts
3:01:52
file in the Deep research function right here then we are sending this activity tracker to each and every function and
3:02:00
then in these functions we are using it like this to add the messages and the
3:02:06
type and the status and then we are getting all this details in a data from
3:02:13
the use chat and from this data we we have exited all those activities and
3:02:19
stored it in their respective States so let's use this all this
3:02:26
activities sources and uh report in a separate component so in the research
3:02:31
activity let's use the activities let me extract the activities
3:02:39
from the use theep search store and let's use this component as a
3:02:48
client component let's extract the sources and
3:02:53
is loading as well let's add one class and this
3:02:59
there let's set width to 400
3:03:04
pixel fixed at the top-4 the right -4 that's it and in this
3:03:14
D so we will use two UI components from the sh CN one is the collapsible and
3:03:20
another is the tabs so let's go to the shared CN let's open the
3:03:30
collapsible and here it is first let's import
3:03:36
this and then let's use
3:03:43
this in this trigger let's add uh one button and the
3:03:48
icon button from UI and in this button we will
3:03:53
use Chevron down icon with a class name width D4 height
3:04:04
das4 that's it and let's set the button variant to
3:04:12
outline after the variant set size to SM and and set class name say width to 9
3:04:20
and p- 0 let me render this component in
3:04:29
the uh Q&A
3:04:39
component let's add as child and in the collapsible content
3:04:45
We'll add the tabs so let's go to the shed CN go to
3:04:51
[Music] tabs let's copy all
3:04:57
this and import the tabs from UI folder and let's copy
3:05:04
this let's change this default values to
3:05:10
activities and here is the tabes content and for this let's change this to
3:05:16
sources so we have uh activities and the sources
3:05:22
trigger and the sources all right let's change this to activities
3:05:28
and sources now here we'll only render this
3:05:34
when the sources. length is greater than
3:05:41
zero now for the activities let's render one un order
3:05:46
list and here let's get the activities do
3:05:53
map let's grab the activity and the
3:05:58
index and here let's return the LI
3:06:04
tag in the LI let's add one div so uh we'll uh show or different color dot for
3:06:13
pending and complete warning and the error status so in de let me add the
3:06:18
class name set Flex item Center and GAP to
3:06:27
two first let me set the key as an
3:06:33
index in the D let's add the span and in this span let me just
3:06:42
write MERS n bsp so it will count it as a space now
3:06:49
for this class let's use a backck and let me use one
3:06:55
variable from the activity so if activity do status is equal
3:07:04
to complete then we'll render the
3:07:09
background green color
3:07:16
500 L let me just copy all
3:07:21
this if activity status is an error set
3:07:26
the BG red 500 else let's just set
3:07:31
BG yellow 500 that's it and after this let's also
3:07:39
set the minimum width to two minimum he to
3:07:45
two display block and rounded full one full circle with this colors based on
3:07:51
this status and after this uh span let's add the
3:07:58
P now here if you go to the types and in the activity we have a type
3:08:05
status and the message so let's render all this let's
3:08:11
just render activity Dot message after
3:08:16
this do let's add one spawn and in this spawn let's render the Tim stamp new
3:08:23
date and here let's just add activity dot time stamp let's just save this and
3:08:32
check it out let me reload
3:08:42
it and let's quickly fill up this question answers
3:08:53
right we got one error cannot read property of undefined reading content in
3:08:58
the use effect and the Q&A we are getting error
3:09:04
at 42 let's check it out now here all right let's resolve it
3:09:13
by using the conditional uh operator
3:09:18
let's just say type of let me copy all
3:09:25
this is equal to string then let's just return this or
3:09:33
let's return an empty string let's use this report right
3:09:40
here here let's also add the question mark and let's save this and T this out
3:09:51
all right let me add
3:10:04
this all right so we are getting all the
3:10:10
details this is planning the research and crafted the research plan and the
3:10:16
color is also so good enough Let's uh add the siling for
3:10:26
this now in the collapsible let's set with to full and for the collapsible content
3:10:34
let's set height to 50 viewport height in the
3:10:41
tabs let me remove this instead that with to full height to full
3:10:50
Shadow MD and in the tabs list let's add width
3:10:56
to full ping left and right to two ping top and bottom to
3:11:02
six all right and for the tabs trigger let's add
3:11:09
few classes let's set uh Flex -1
3:11:15
Shadow none border Das black with tan opacity border
3:11:23
Das solid that's it all right looks great now for the
3:11:30
tabes content let's set uh height
3:11:35
Dash we will use uh the calculate function and here set
3:11:41
100% - 60 pixel and set overflow y
3:11:48
to Auto all right looks
3:11:55
great let's set the same border right here and now in this this
3:12:04
UL let's add space y four and padding
3:12:14
four then in this Li tag Let's uh set display to flex Flex to column Gap to
3:12:23
two and Border B p-2 and text to
3:12:31
SM and now it looks much better here let's set Edge to two with minimum
3:12:37
height and now this is looking much
3:12:42
better now here we are getting the whole URL so instead the let just extract this
3:12:48
uh domain name so for that in this message first we'll check if it it
3:12:56
includes the
3:13:04
https if it does let's split that so let's just grab this and let's
3:13:12
use dot split let's split
3:13:18
by https double do/ slash let's grab the
3:13:23
first element so zero plus so this will contain the
3:13:29
message and next let's add the domain let me grab this
3:13:34
again and here let's use one and again let's Split
3:13:42
That by slash and grab the first
3:13:47
element which will be the domain else let's just render the activity
3:13:55
message let's save this all right here is the
3:14:01
[Music] domain looks great now let's uh format
3:14:07
this date for that let me install the one Library called date- FNS
3:14:17
now let's grab the format function from date
3:14:30
FNS let's use this right here let's grab this instead of this use format let me
3:14:40
remove the two date string and in the format add the time stamp and here let's add
3:14:49
hour minute and seconds make sure you write the edge in the
3:14:57
capital that's it let's save this and now it is looking much
3:15:04
better let's add the class in this
3:15:10
SP set text to extra small and text
3:15:15
color to muted foreground now it looks much better so
3:15:21
that's it our activities are done now let's render the sources so for the sources let me remove
3:15:30
this let's use condition if sources. length is greater than zero only then
3:15:37
render the types content and in the content let's get the
3:15:44
UL and sources map let's grab source and
3:15:50
index now here let's use Li now first let's add the key and for
3:15:58
that we'll use the index now in the Ali let's use
3:16:05
Link and in the link let's render the source. title and in the HF we'll render
3:16:13
the source. URL make sure you import this link from next
3:16:20
SL link let's add return let me save
3:16:26
this and here it is so we are getting the three
3:16:34
URLs let's add the class
3:16:40
name Also let's copy the this class name
3:16:47
and paste it right here and for this UL let's say space Y2
3:16:56
4 and
3:17:02
b-4 for the LI display Flex Flex Das column G to two
3:17:11
border dasb and p-2 for the link let's add
3:17:18
uh text- smm text blue to
3:17:25
600 and on H let's use underline now for this link let's set
3:17:33
Target to
3:17:42
blank all right now it this looks much better
3:17:47
as you can see it has uh used 23 24,000
3:17:53
tokens and the process is completed in nine steps now similar to this activities
3:18:00
let's render the report uh component right here but before that let me just
3:18:06
uh say in here F the activities dot length is z zero
3:18:17
then just return we don't need this is loading State here from the start let's just set
3:18:26
it to
3:18:31
open now this way it won't close so for that let's just add one
3:18:41
state and let's name it as open
3:18:47
and here set set is open initially it will be a false let's provide this state
3:18:55
value to here and on open change we'll provide this set is open
3:19:05
State let's set this to True initially and let's rotate this uh shabon
3:19:11
icon so let's use back Tex
3:19:17
here if is open state is true then we'll render rotate D 180
3:19:27
let's save this all right now it this looks much
3:19:35
better let's create the one component to show the
3:19:41
report the Deep Research In The Deep research folder let's create
3:19:47
research report. TS it will be a CLI side
3:19:56
component let's change this to TSX now here first grab everything from
3:20:02
the used deep resarch store so let me just copy this instead of activities and
3:20:09
sources let's grab the report is completed state is loading state and the
3:20:17
topic now we'll render report in a card component so make sure you import it now
3:20:23
in this card Let's uh render one div and in this div we will display the
3:20:32
report in a markdown format so that's why we will uh use the react markdown
3:20:38
let's install that and PM install react Das markdown so along
3:20:46
with this markdown let's also use remark dgfm to uh make the markdown pretty and
3:20:53
use all the properties of markdown and it's done so in the do let
3:21:02
me grab the markdown from react markdown
3:21:17
it is at default export let's also import the remark gfm so in the markdown
3:21:23
we will Rend that the report but remember right now this report is not uh
3:21:29
a markdown fully markdown format because if you check the research function and
3:21:34
go to the generate report function here in the prompts we are asking it to provide the report in a report tag let
3:21:41
me go to the prompts and here it
3:21:48
is and close the report in report tags so let's extract the report which is
3:21:54
between this Texs so report dot
3:22:01
split split by this report
3:22:06
tag and let's grab the second element of an array again we'll split
3:22:15
it by the closing report tag and let's grab the first
3:22:22
element that's it and in the markdown let's add this remark gfm so just write
3:22:28
remark plugins and in an error add the remark gfm let's save this and let's
3:22:34
render this component in the
3:22:42
Q&A right there is an issue
3:22:48
okay here we have to add uh one
3:22:53
condition if there is no report
3:22:59
then just return let's uh run this
3:23:09
again all right we are getting all the activities
3:23:16
and once it has exed the content successfully it is storing that sources right
3:23:23
here and here we got the whole report now it is not properly formatted
3:23:31
so let's uh install the typography plugin from Tailwind
3:23:37
CSS just write npm install at Tailwind CSS SL typography
3:23:46
all right it is installed let's copy this and go to the globals usually we
3:23:53
use to add the plugins in the tailin config file but uh from version 4 there is no config file so we'll add this
3:24:00
plugin and the globals do CSS
3:24:06
file they wi CSS SL
3:24:11
typography let's save this and then in the research report and this de let's
3:24:18
add ed class called pros and let's check this out all right now it is uh bit
3:24:26
formatted let's add a few more classes now with the pros set pros. smm for
3:24:33
smaller screen and up to medium screen set Pros Das
3:24:38
Bas and set max width To
3:24:43
None let's save this all
3:24:49
right now let's add the classes for the card set max width to
3:24:59
90 PW and for the Xcel set max width to
3:25:05
60 VW looks great set position to
3:25:14
relative pading left and right to to four Bing top and bottom to six rounded
3:25:20
up to Excel and Border Das black with 10
3:25:28
opacity border Das solid Shadow to none and set padding
3:25:36
total padding to six all right looking
3:25:45
good now now for this codee Snippets let's use react syntax highlighter to
3:25:51
add the color to this code let's say react syntax
3:26:00
highlighter let's install
3:26:07
this so for each uh code component from the markdown we'll use this syntax
3:26:13
highlighter so let's import it
3:26:22
import use uh prism as
3:26:29
syntax highlighter from
3:26:35
react syntax highlighter let's check the documentation
3:26:41
too all right and let's copy this
3:26:46
so instead of dark we'll use the night out them now in this
3:26:52
markdown Let's uh get the code Snippets so we can get it from the components use
3:26:59
one more parenthesis and just grab the code now this code will have the class
3:27:07
name children in line and the
3:27:14
props let's use the code props for the
3:27:20
types and let's define this right here type code props equal
3:27:27
to component prop with ref and here we'll
3:27:34
pass the HTML code element
3:27:39
and and here let's say in line as a
3:27:44
Boolean that's it and then let's use the syntax
3:27:51
highlighter return syntax
3:27:58
highlighter and if we see the documentation here we have a language and the style so let's pass this as well
3:28:07
and this code string so if we see this uh report let me open this and grab this
3:28:16
element so in this pre in the code we are getting the language bash in the
3:28:22
class so let's extract that const match equal to First we'll use one regular
3:28:30
expression to match this class let's say language Dash and in the Braes let's use
3:28:39
slash w+ close the expression Dot
3:28:47
execute let's add the class name or an empty
3:28:54
string and then let's store this in the language
3:29:01
variable match then match second element else just an empty
3:29:09
string here let's put condition if that is not in line code and
3:29:16
that is a language then we will return the syntax
3:29:22
highlighter with its options so let's add
3:29:28
const syntax highlighter props equal to let's
3:29:35
add style which is the
3:29:42
nightowl and language then and
3:29:47
preag we'll change it to D and let's add the
3:29:54
children let's use string to format the children let's use this props right
3:30:04
here now here we have this condition so if there is no language available then
3:30:10
we have to render the code as it is so just return let's use the
3:30:18
code and in the code pass the
3:30:25
children and class name as the class
3:30:32
name and the props all right let's save
3:30:38
this and it seems it's gone let me generate this again
3:30:46
and I have generated this report again let's scroll down and here it
3:30:52
is now it looks much better it has the
3:30:57
color let's remove this padding for that we can use a Pros class so Pros Das pre
3:31:06
tag set P22 all right it has decreased the
3:31:14
padding now this looks much
3:31:19
better so the report component is generated now let's uh add the timer
3:31:25
component right here I think that is issue with the
3:31:31
types let's install the react syntax highlighter
3:31:38
types now similar to this let's add this is completed if the question form is not
3:31:44
completed we won't show the report uh component and again uh we'll also put one more
3:31:52
condition if there is no report and is
3:31:58
loading is true then let's return one
3:32:04
card and in this card let's add one D and here let's add one p just say
3:32:12
researching your topic
3:32:19
let's add the class
3:32:24
set display Flex Flex Das column item Center justify to Center and Spacey to 4
3:32:32
set padding to 8 and for the P let's set
3:32:38
uh text- smm text muted foreground let's
3:32:43
also uh add one loader Loader 2 icon from Lucid react and let's set the class
3:32:50
set width 2 four height to 4 let's change it to
3:32:57
eight and use animate Spin and margin right to two and there
3:33:04
is no need for margin right because we are using Flex column and in the card
3:33:10
let's set padding to 4 Max width to 50 VW
3:33:19
rounded Excel adding left and right to 4 ping
3:33:25
top and bottom to two PG white/ 60
3:33:30
opacity now let's add uh one button to download the report as uh in the markdown format now here let's add the
3:33:40
type first syntax highlighter drops all right right
3:33:46
error is gone now so in this card let's add one
3:33:54
button so after this card let me add one D first and in this D let's add the
3:34:02
button let's just say download and here we'll render one
3:34:07
icon download from LD react let's set the class name Set uh withth to four and
3:34:15
and hide to four that's it make sure you import this button from
3:34:23
the UI folder let's add the class name set display flag justify
3:34:30
end and GAP to two margin bottom to four
3:34:36
top to four and right to four and we'll set the display as an absolute
3:34:45
for this button let's set size to SM and class name set Flex item
3:34:57
Center Gap to two and rounded and on
3:35:05
click let's uh create one function to download this uh report as markdown
3:35:11
let's just name it as a handle markdown
3:35:19
download let's create this function right
3:35:25
here so first let's uh grab the content uh let me just uh copy
3:35:38
this and create const content equal to
3:35:43
report then let's create new blob to store the content in Blob
3:35:52
format now in the blob let's pass the content in an array and set the type to
3:36:00
text SL markdown after creating this let's create one URL to download it just say
3:36:08
url. create object URL and pass this blob then let's create one link
3:36:17
document dot create element and let's
3:36:22
create anchor tag and anchor tag. will be the
3:36:29
URL a. download let's name the
3:36:37
topic topic Dash research- report. MD
3:36:44
which stands for the markdown so document dot body let's attach this
3:36:49
anchor tag so use a pen child and pass the Anor
3:36:57
tag let's click this Anor
3:37:03
tag and then we will remove it so document do body do
3:37:10
remove child and we'll remove this child and
3:37:16
empty the URL so revoke object URL pass this URL that's it so basically this
3:37:23
function will download the report in markdown format let's save this and try
3:37:28
it out and now it's gone I have to generate it again let me just give me just few
3:37:36
second all right so we got one download button right here let me click that
3:37:48
and it has downloaded this file and here it is now as you can see
3:37:55
it has uh downloaded this whole report which is in the markdown format and it
3:38:01
has provided the sources and the further reading as
3:38:09
well now let's add the timer component
3:38:15
let's create one file called research timer.
3:38:23
TSX here let me grab the required States from used deep
3:38:29
Research store let's make it a client side
3:38:34
component because we are going to use the use effect from this we'll need report is
3:38:43
completed and the activities
3:38:50
let's use the card component and let me add the classes
3:38:55
B-2 BG white/ 60
3:39:02
border border Dash black with tan opacity border solid Shadow
3:39:10
none and let's make it rounded now in this card let's use B
3:39:18
tag and let's just say time lapsed let's use PA and in this SP we will render
3:39:26
render the seconds so first let's uh create a logic to increase the seconds
3:39:33
let me create one use
3:39:40
State let's just say uh say elapsed time
3:39:51
and here let's set zero let's use
3:39:59
use and here let's add report and is
3:40:09
completed if report. length is greater than at least 10 characters then return
3:40:17
that means stop let's just Define the start time first start time equal to
3:40:24
date do now and let's add the timer
3:40:30
function which will use the set interval now for this interval we'll use 16
3:40:38
milliseconds why 16 because it is approximately 60 frames per second and
3:40:44
it is for a smooth UI updates that's why I have set it to 16 and in the timer
3:40:51
let's use set laps time and here let's say date.
3:40:58
now minus start time all right and in
3:41:03
the return let's clear the interval
3:41:09
function pass the timer function now this should uh keep uh showing us the
3:41:17
seconds let me put one condition if activities do length is less than or
3:41:24
equal to zero then there is no need to show this timer so let's return now here let's get
3:41:32
the seconds we are storing uh this state as
3:41:39
milliseconds so let's use math. floor and let's done time divided by
3:41:48
1,000 this is how we'll get the seconds and let's get the rest of the
3:41:53
millisecs from the laps time and here we'll use the modular Operator by th000
3:42:00
now this will get us the rest of the milliseconds now here we'll also show
3:42:06
the minutes not only seconds so that's why let's use one condition if seconds is greater than
3:42:13
60 then we'll render the minute by using math do floor and here let's pass the
3:42:22
seconds divided by 60 as
3:42:29
minutes and along with that we'll also uh show the rest of the seconds for
3:42:36
that we'll use the modular Operator by 60 if it is greater than zero then show
3:42:44
the seconds
3:42:50
seconds divided by modulo do to
3:42:57
string and just say s as a second else null if seconds are not uh greater than
3:43:06
60 then let's just render seconds and the milliseconds
3:43:16
seconds and Dot
3:43:21
milliseconds do 2 string let's just add s let's save this and see if it is
3:43:29
working or not but before that let me just add the text size to text SM and
3:43:36
text color to text muted foreground let's use this research timer in the Q&A
3:43:44
component for this
3:43:51
report all right so let me generate
3:43:58
this all right so now it is showcasing this time
3:44:05
component and that's it now here if you see uh we got the error so let's see how
3:44:13
we can handle this error G F and show the error message in the
3:44:18
activities so let's go to the research
3:44:25
functions and we got the error in the search so after this triy block in the
3:44:30
catch we can use this activity tracker to send the error information but uh
3:44:36
what what we did uh for the call model function let's do the same to generate a
3:44:41
common uh error function that can handle all the errors so in the utils let's create it let's
3:44:48
just export const handle
3:44:54
error and this will accept a generic type with
3:45:01
error as unknown and context as a
3:45:08
string then activity tracker
3:45:16
make sure you import it type Now activity tracker will be an
3:45:22
optional after the activity tracker it will accept the activity
3:45:30
type for this we'll use the activity type and pass the
3:45:38
type and then let's add the fall back
3:45:43
return and as a generic type T now this
3:45:50
will return the all back return first and first let's extract the error
3:46:00
message if the error is an instance of error type then it should have the error
3:46:09
Dot message as let's just say unknown
3:46:15
error all right and if there is activity tracker and activity
3:46:24
type then let's just use activity tracker. add here first we'll
3:46:33
uh send the type so just say Activity type and with the type let's set the
3:46:40
status which will be the error status and then let's send the error message or
3:46:46
let's just say this provided
3:46:52
context failed and then we'll show the
3:46:58
error message this function will handle the arror gracefully and send the required
3:47:04
message back to the front end now this should be an arrow function now let's
3:47:10
make this activity type as a optional as well
3:47:15
that's it let's save this and use it in the uh different functions so go to the
3:47:21
search function here let's return the handle error function make sure to
3:47:26
import this let's send the error and for the
3:47:32
context Let's uh say that it it was searching for this particular
3:47:39
query and after this let's send the activity tracker then and type which is
3:47:45
the search and after that for fallback let's send an empty array if handle error
3:47:52
function fails let's just send an empty
3:47:57
array let's remove this and let me copy
3:48:05
this let's set the same for this uh extract content but first we have to add
3:48:12
this in a triy block
3:48:22
all right instead of uh this let's change it
3:48:28
to content
3:48:33
extraction from let's pass the URL and
3:48:39
here instead of an array let's set it to null
3:48:44
let's copy this and let's add right here the analyze
3:48:51
function here instead of search change this to extract and here to
3:48:58
analyze and let's change this uh context just say
3:49:04
content analysis got the error when we are doing
3:49:09
the content analysis then activity tracker and analyze and instead of null here let's
3:49:15
send this uh fallback sufficient let me just copy
3:49:21
this sufficient to false and gaps here let's just say unable to
3:49:29
analyze content and after this for the
3:49:36
queries let's just say please try a
3:49:41
different search query all
3:49:48
right let me just remove this let me copy
3:49:53
this and let's do this for the generate search queries as
3:49:59
well first let's add all this into a tri
3:50:09
block let me copy this paste it right
3:50:16
here and here let's just send
3:50:22
research planning and change this to planning
3:50:31
type instead of uh all this the output should be search
3:50:38
queries let me remove this and here let's just say
3:50:48
topic best practices let's use
3:50:54
research state. topic so here we are creating a custom queries in case there
3:50:59
is an error and let's do this for a few more
3:51:08
times let's change this to guidelines and
3:51:16
examples let's do this for the
3:51:25
report let's change this to report
3:51:34
generation here let's change this to generate and here we'll only send one
3:51:41
string because the output of a reort should be string error
3:51:46
generating report please try again and that's it now uh error handling is done
3:51:54
for the research functions but uh we have yet to implement this in the model
3:51:59
caller so let's open that now there is a high chance due to
3:52:05
high number of API calls to this llm models your application could not get the results back so that's why we'll add
3:52:12
the retry logic right here let me grab all this first let me create one
3:52:18
variable call attempts equal to0 and
3:52:24
then we'll create one Loop and just say attempts less than Max
3:52:33
retries now in our case we will use the maximum retry attemps constant so if you
3:52:41
open the constant here it is so we are are attemp attempting for maximum three
3:52:50
times and here paste the
3:52:55
code let's use the dry block and add the catch block right
3:53:04
here now if there is an error let's increment the
3:53:09
attempts and let's uh set error in a variable called last error so let's just
3:53:17
Define it first error it type will be error or
3:53:28
null so let's store this error in this variable let's just say if error is an
3:53:37
instance of error type then it should have the error do message else let's
3:53:45
just create new error that says unknown error let's
3:53:53
remove this it should be as it is and then let's uh create one condition if
3:53:59
attempts are less than Max retry
3:54:07
attempts then we will use activity tracker so make sure you add the
3:54:14
activity tracker along with the research State let's do that activity
3:54:28
tracker and you use it right here let's say Activity tracker. add and here we'll
3:54:36
pass the activity type so we have to pass it from
3:54:42
here initially it should be generate Also let's uh update the model
3:54:48
option type because we have added this uh argument along with the activity type
3:54:54
let's set the status to an error or
3:54:59
warning and here let's uh create one message saying model call failed
3:55:08
attempt let's use variable attempts divided by
3:55:17
Max re attempts re
3:55:24
trying and also Let's uh add the delay a wait delay let's create this delay
3:55:32
function in the utils export cons delay here pass the
3:55:42
milliseconds and here we'll use new promise
3:55:47
[Music] isol set time
3:55:54
out and pass the resolve and the seconds let's use
3:56:00
this make sure to import it and in here
3:56:05
we'll pass the retry delay
3:56:11
Ms and multiply it by
3:56:19
attemps so it will delay the calling this model and after this cetch block
3:56:27
let's throw the error last error or new
3:56:33
error that says failed
3:56:39
after Max R attempts
3:56:46
that's it now for this activity type let's add uh in the model call options
3:56:51
so open the types go to the model call options let's
3:56:57
add activity type as an optional activity and
3:57:04
type that's it so let's pass the uh activity type
3:57:10
and activity tracker whenever we are using the call model function in the research function
3:57:15
so first we are using it right here here after the schema let's pass the activity
3:57:22
type now this is planning and after the research date
3:57:29
pass the activity
3:57:35
tracker let me copy [Music] this next we have a search
3:57:44
we are not using call model in the search the extract content after the schema type
3:57:53
extract and pass the activity tracker and in here we are also not
3:58:00
using the call model but we are using it in the analyze so after the
3:58:06
schema let's add activity type and analyze
3:58:16
now here change this to
3:58:21
generate and here activity tracker that's
3:58:27
it now all the errors are gone now let's add uh one beautiful
3:58:36
background so let me close all this go to the page so here I have generated one
3:58:42
beautiful background using AI so I'm going to use this you can use any uh
3:58:47
background image you want so after this main let me add one D
3:58:53
and in this D let's grab image from the next and set
3:59:00
SRC alt let's just say deep research
3:59:07
agent e
3:59:12
agent class name with full Edge to full object Center and opacity to
3:59:27
50 let's grab that background from the
3:59:33
public do SL do SLU SL background. jpg let's use this PG
3:59:42
right here and for this de let's set the position
3:59:48
to fix top zero left zero width to full height to full
3:59:56
object cover and set index to minus
4:00:03
10 background black let's set opacity to 30 let's save
4:00:11
this all right it look looks great now let's add a blur background
4:00:18
effect for this uh user input so go to the user input and in the class name we
4:00:26
have a G60 and here let's say Set uh backdrop
4:00:33
blur and say SM Also let's add border
4:00:39
Das black with t opacity now this looks much better now
4:00:46
let's uh taste this for one final time but before that uh let me change the
4:00:54
constants so here let's set maximum search result up to five and maximum
4:01:01
iteration up to three let's save this and let me reload this
4:01:09
again let's click on submit
4:01:16
let me show you the uh current credits that I have is
4:01:22
6797 and for the xpi I have
4:01:30
.42 let's copy this we want Advanced technical
4:01:39
details and we want this for academic research
4:01:45
just exclude non technical
4:01:50
sources let's click on start
4:01:57
research now here we'll add the background later once this completes the report
4:02:03
Generation Now planning the research crafted the research searching for the
4:02:08
three queries first it found the Five results five five 15 results so it will
4:02:14
extract the uh data from all the 15 sources and here are the
4:02:23
sources right now it is analyzing the search uh research
4:02:29
findings and content is sufficient from all these 15 sources so now it will
4:02:34
generate the comprehensive
4:02:41
report all right so report is generated
4:02:46
so it has used 94512 tokens and it took the 21
4:02:55
steps now let's uh add styling for all this let's open the question
4:03:04
form and here in the card let me add BG
4:03:09
white with 60 opacity backdrop blur to
4:03:15
SM border and rounded D
4:03:22
Exel border Das black with 10an
4:03:28
opacity and Border Dash solid let's save
4:03:33
this all right now it looks much better let's do the same for the report as well
4:03:39
let me copy this whole class go to the
4:03:45
research report and paste it right
4:03:54
here and here as
4:04:00
well let's remove the duplicate
4:04:07
classes all right looks great let's do the same for this activities
4:04:14
let's open the activities research
4:04:19
activities go to the types content and paste
4:04:31
this all right look great let's do the same for the sources as well
4:04:56
now here we are getting one error time St does not exist on activity so let's uh add that and the
4:05:04
types now here let's add the optional time stamp with the type number
4:05:14
so here let's just sa F activity time stamp is there only
4:05:23
then we'll render the spawn tag now the error is
4:05:30
gone now here we have uh already completed uh filling this questions so
4:05:37
instead of uh rerunning This research let's show this question answers in a proper format using cardian so for that
4:05:44
we'll use we'll uh create one component in the Deep research folder let's create
4:05:53
completed questions. DSX component let's change this to use
4:06:01
client and here let's grab the questions from the use deep Research
4:06:11
store along with questions we will want the answers as well and is
4:06:20
completed so f is completed is false
4:06:27
or questions. length is equal
4:06:35
to0 then return null L show this component so here we
4:06:42
will use the ACC so let's go to the shed CN and click
4:06:48
accordian let's grab this
4:06:54
components and the
4:06:59
skeleton let's change this to item zero and in the accordian trigger let's
4:07:06
add one spawn and let's just say questions and
4:07:13
and answers so we'll use two accordant one to show the question answers and one
4:07:19
to show the whole component so in this accordant content let's add one
4:07:26
div in this div We'll add one accordion let me add the class name set
4:07:34
margin left and right to Auto ping top and bottom to six space y to 8 in this
4:07:41
accordion let me copy this and let's use the questions do
4:07:51
map let's grab the question and
4:07:56
index here we'll return this accordian item now for the value let's just
4:08:04
say item Dash index let's add the key as
4:08:09
well now in this trigger let's remove this
4:08:17
add span and in the span first just write question index +
4:08:26
one and here let's render the question now in the
4:08:32
content let's use btag and here we'll render the answers
4:08:39
so answers and add the index so that's it let me save this and let's
4:08:47
render this component in the Q&A so after the question form we'll
4:08:55
render
4:09:00
this let me start this
4:09:06
again before I click on start research let me just uh comment out the main deep
4:09:13
research function so that it don't run without
4:09:21
necessary let me click on start research all right so here it is entering this
4:09:26
component we have to add a few classes let's add the class name that
4:09:34
width to full Max width to 90 view Port width or larger screen
4:09:41
than SM set Max D width Das ATV Port width and for Excel set max width
4:09:50
to 50 viewport width set BG white with 60
4:09:56
opacity backdrop blur to SM
4:10:02
border ping left and right to four ping top and bottom to two and rounded
4:10:11
Excel all right look looks
4:10:21
great now let me go to the questions form and here we'll set
4:10:29
if is completed let's grab the is
4:10:41
completed if is completed is true then let's return we don't want to render
4:10:48
this all right it's gone now here let me remove the border
4:10:56
for the accordant item border
4:11:02
d0 and for this accordian trigger let's set text size your text- base
4:11:10
capitalize and on over that should be no underline for this accordion let's set
4:11:17
withd to full and for this accordant
4:11:23
trigger let's set uh text- left on h no
4:11:31
underline and for this question let's add the text- black color with 70
4:11:39
opacity and for the accordian content let's set BG
4:11:46
muted with 50 opacity padding four and rounded
4:11:53
medium Also let's add the class for this P tag set text
4:12:00
muted foreground let's save
4:12:06
this all right looks much better let's not set this 7 let's keep
4:12:13
the 90 or let's decrease it to
4:12:19
80 and now it looks much better so that's it let me
4:12:33
uncommanded uh taste everything for one final time let's check the
4:12:41
credits the 6 point 737 and here let me reload this is
4:12:50
$16.40 let's use uh how to run DC gbon locally click
4:12:58
submit what specific aspect of running deep C carbon locally are you interested
4:13:03
in use installation and
4:13:08
configuration advanced
4:13:14
deep for research let's select uh
4:13:21
[Music] production let's exclude non-technical
4:13:29
sources as you can see now it is showing the completed questions
4:13:44
and it has generated this report in 1 minute and 10 seconds uh hopefully we
4:13:51
don't have to uh extract more more content and it has uh used 87,000 tokens
4:13:59
and took 21 steps to generate this whole report now let's check the credits so
4:14:08
from 737 it went to 682 so it is using very
4:14:15
low than expected plus we are also using the free model to generate the report
4:14:20
but if you use the paid one then the cost can go up here is the detailed
4:14:25
usage per model and if you check the billing right
4:14:32
here 16.40 to 16.38 only 0.2 so it is not taking that much uh
4:14:41
cost and within 10 $10 I think you can run it for too many times so the costing
4:14:48
is not that much because we have built this custom solution all by ourselves so we know and we we can twg many things
4:14:55
right here you can uh change the prompts or you can uh you know update the constants as per your need all right so
4:15:02
today we have built a sophisticated AI research agent from scratch that can plan and execute complex research task
4:15:10
add up its strategies based on what it discovered and generate this comprehensive well Source report all
4:15:16
with complete transparency into its process while chat JT and Gro offer
4:15:22
similar or more capabilities but building your own agent gives you complete control over how it works you
4:15:29
can customize it for specific domains connect it to the proprietary databases or modify harit reasons if you enjoy
4:15:37
this tutorial and want to see more advanced AI development content smash that like button and sub subcribe to the
4:15:43
channel drop a comment letting me know what kind of AI agent you'd like to build next and if you are implementing
4:15:50
this yourself I'd love to see what you build with it share your projects in the comments or tag me on the Twitter until
4:15:57
next time keep coding and keep building see you in the next video