## API test code:
API test code for the test challenge
The stack used:
- mocha (alternative to jest)
- axios (request library)

For running the code need to:
1. Install mocha <brew install mocha>
2. Install axios <brew install axios>
3. Pull the code from github from <https://github.com/kotbeg/APItestCode.git>
4. Run the mocha tests by typing <npm test>

## Performance test plan:
This performance test plan outlines the objectives, scope, methodology, and tools to evaluate the performance of the JSONPlaceholder API, a free online REST API for testing and prototyping.

#### Objectives
The primary objectives of the performance testing are:
 - To measure the response time of various API endpoints under normal and peak load conditions.
 - To identify the maximum number of concurrent users the API can handle without degradation in performance.
 - To evaluate the API's stability and reliability under sustained load.
 - To identify any performance bottlenecks.

#### In-Scope:
 - Testing the following API endpoints:
     - GET /posts
     - GET /posts/:id
     - GET /comments
     - GET /albums
     - GET /photos
     - GET /todos
     - GET /users
 - Testing with varying loads ([Bisection Method](#bisectionmethod) to determine the concurrent requests).
#### Out-of-Scope:
 - Testing write operations (e.g., POST, PUT, DELETE) since JSONPlaceholder is designed for read-only operations.
 - Tests that involve user authentication, as the API does not require it.
#### Performance Metrics:
The following metrics will be gathered during the testing:
 - Response Time
 - Throughput
 - Error Rate
 - CPU and Memory Usage
#### Test Environment:
<a name="jmeterparams"></a>
 - Testing Tool: Apache JMeter. That allows, among other parameters, to set the number of threads (concurrent requests) and loops (repetitions) as well as the ramp-up period (that allows to gradually add the load).
 - Scripting Language: JavaScript (Node.js).
#### Alternative Test Environment:
 - Testing Tool: Axios for making API requests.
 - Scripting Language: JavaScript (Node.js).
 - Concurrency Control: Use of Promise.all to simulate concurrent requests.
 - Monitoring Tools: System monitoring tools (e.g., top, htop) to track CPU and memory usage, or [AMP Tools](#amptools) section.
#### Test Scenarios:
    - The main scenario:
        - Need to make sure that all types of requests are present
        - Create a "flow", such as:
            - create a new user, 
            - use the userId to create a post, 
            - followed by modifying the post 
            - and deleting it, 
            - getting all the posts for this user to verify the post is deleted.
        
1. Response Time Testing:
    - _Objective_: Measure the response time for each endpoint under different load conditions.
    - _Load Conditions_: 1000, 500, 100, 50, and 10 concurrent requests.  
2. Load Testing: 
    - _Objective_: Determine how many users the API can handle simultaneously.
    - _Method_: Gradually increase the number of concurrent requests until the response time exceeds acceptable limits, can use the ramp-up time in the thread group.
3. Stress Testing:
    - _Objective_: Determine the breaking point of the API by pushing it beyond its maximum capacity.
    - _Method_: To figure out the breaking point, it makes sense to go with the [Bisection Method](#bisectionmethod).
4. Endurance Testing: 
    - _Objective_: Evaluate the API's performance over an extended period.
    - _Method_: Run a sustained load test for a minimum of 1 hour (set up number of loops to a large enough number).
#### Test Execution (JMeter):
 - _Setup the Test Environment_: Ensure the instance of JMeter is installed.
 - _Develop Test Scripts_: 
    - Create a thread group
    - Fill out the [thread properties](#jmeterparams)
    - In the thread, add the header manager, user variables (if any) and request defaults
    - Add a sampler (HTTP Request) with parameters and body data.
    - Add PostProcessor - JSON Extractor (define variables) 
    - Add listeners
    - For the next request, repeat previous and add a JSR223 PreProcessor that allows you to read in the variables from the previous request (choose a script language and script the variables)
    - Set up the rest according to the main flow scenario, copy the thread group to form separate thread groups for each scenario (allows to setup different run parameters). 
    - Save and export into a .jmx files (some of these do not need to be ran every time, and can be set up separately).
 - _Execute Tests_:
    - Run response time tests for each endpoint with varying loads locally to figure out the breaking point, then adjust the .xml file accordingly.
    - Run load time tests for each endpoint with varying ramp-up times locally to figure out the exceeding point, then adjust the .xml file accordingly.
    - Run stress test, and set the load just under the breaking point.
    - Can set the endurance test to run every night or week, depending on the demand (CI configurable)
    - Can use a plugin for execution, or add to the config file (for whatever CI is used) and set it to run on commit
 - _Analyze Results_: With APM can set up warning for the failed tests as well as ban merges on failed tests.
#### Reporting:
After the completion of the tests, a report should be generated containing the following:
 - Summary of test objectives and scope.
 - Detailed results for each test scenario.
 - Observations on response times, throughput, and error rates.
 - Recommendations for performance improvements if necessary/possible.
<a name="amptools"></a>
#### AMP tools:
There is a number of tools available, such as AppDynamics, DataDog, Dynatrace, to name a few.
Depending on what format and detail is needed for the reports, analytics and alerts, the choice can be made.
In some cases services such as Amazon CloudWatch can be used.

<a name="bisectionmethod"></a>
##### Note:
The Bisection Method works by repeatedly narrowing down the interval where the root lies.