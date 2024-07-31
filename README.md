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
 - Testing with varying loads (e.g., 1000, 500, 100, 50, and 10 concurrent requests).
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
 - Testing Tool: Apache JMeter.
 - Scripting Language: JavaScript (Node.js).
#### Alternative Test Environment:
 - Testing Tool: Axios for making API requests.
 - Scripting Language: JavaScript (Node.js).
 - Concurrency Control: Use of Promise.all to simulate concurrent requests.
 - Monitoring Tools: System monitoring tools (e.g., top, htop) to track CPU and memory usage, or [AMP Tools](#amptools) section.
#### Test Scenarios:
1. Response Time Testing
    - _Objective_: Measure the response time for each endpoint under different load conditions.
    - _Load Conditions_: 1000, 500, 100, 50, and 10 concurrent requests. _Note, to figure out the breaking point, it makes sense to go with the [Bisection Method](#bisectionmethod)._ 
2. Load Testing
    - _Objective_: Determine how many users the API can handle simultaneously.
    - _Method_: Gradually increase the number of concurrent requests until the response time exceeds acceptable limits.
3. Stress Testing
    - _Objective_: Determine the breaking point of the API by pushing it beyond its maximum capacity.
    - _Method_: Continue to increase the load until the API fails to respond correctly.
4. Endurance Testing 
    - Objective: Evaluate the API's performance over an extended period.
    - Method: Run a sustained load test for a minimum of 1 hour.
#### Test Execution:
 - _Setup the Test Environment_: Ensure the Node.js environment is set up with Axios and any required libraries.
 - _Develop Test Scripts_: Write Node.js scripts to automate the performance tests for each endpoint.
 - _Execute Tests_:
    - Run response time tests for each endpoint with varying loads.
    - Collect metrics during the tests.
 - Analyze Results: Review the gathered metrics to assess the performance of the API.
#### Reporting:
After the completion of the tests, a report should be generated containing the following:
 - Summary of test objectives and scope.
 - Detailed results for each test scenario.
 - Observations on response times, throughput, and error rates.
 - Recommendations for performance improvements if necessary.
<a name="amptools"></a>
#### AMP tools:
There is a number of tools available, such as AppDynamics, DataDog, Dynatrace, to name a few.
Depending on what format and detail is needed for the reports, analytics and alerts, the choice can be made.
In some cases services such as Amazon CloudWatch can be used.

<a name="bisectionmethod"></a>
##### Note:
The Bisection Method works by repeatedly narrowing down the interval where the root lies.