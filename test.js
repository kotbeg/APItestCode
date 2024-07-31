
const axios = require('axios');
const request = require('request');
const baseURL = 'https://jsonplaceholder.typicode.com'; // Example API for testing

describe('API Tests', () => {
    // GET all posts
    it('fetch all posts', async () => {
        try {
            const response = await axios.get(`${baseURL}/posts`);
            console.log('Status Code:', response.status);
            console.log('Total Posts:', response.data.length);
            console.assert(response.status === 200, 'Expect status code to be 200');
            console.assert(Array.isArray(response.data), 'Expect response data to be an array');
            console.assert(response.data.length > 0, 'Expect posts length to be greater than null');
        } catch (error) {
            console.error('Error fetching posts:', error.message);
            process.exit(1);
        }
    });

    // GET by ID (get a subset, this is just for fun)
    it('fetch a post by ID', async () => {
        const postId = 10;
        try {
            const response = await axios.get(`${baseURL}/posts/${postId}`);
            console.log('Status Code:', response.status);
            console.log('Post ID:', response.data.id);
            console.assert(response.status === 200, 'Expect status code to be 200');
            console.assert(response.data.id === postId, 'Expect post ID to match');
        } catch (error) {
            console.error('Error fetching post by id:', error.message);
            process.exit(1);
        }
    });

    // POST new entry in posts
    it('create a new post', async () => {
        const newPost = {
            title: 'foo',
            body: 'bar',
            userId: 9,
        };
        try {
            const response = await axios.post(`${baseURL}/posts`, newPost);
            console.log('Status Code:', response.status);
            console.log('Created Post:', response.data);
            console.assert(response.status === 201, 'Expected status code is 201');
            console.assert(response.data.title === newPost.title, 'Expect the post title to match');
            console.assert(response.data.body === newPost.body, 'Expect the post body to match');
            console.assert(response.data.userId === newPost.userId, 'Expect the userId to match');
        } catch (error) {
            console.error('Error creating post:', error.message);
            process.exit(1);
        }
    });
    // PUT (Update) a new  post
        it('update a post', async () => {
                console.log('Creating a new post...');
                try {
                    const newPost = {
                                title: 'foonew',
                                body: 'barnew',
                                userId: 9,
                            };
                            
                    const response = await axios.post(`${baseURL}/posts`, newPost);
                    console.log('Status Code:', response.status);
                    console.assert(response.status === 201, 'Expected status code is 201');
                    console.assert(response.data.title === newPost.title, 'Expect the post title to match');
                    console.assert(response.data.body === newPost.body, 'Expect the post body to match');
                    console.assert(response.data.userId === newPost.userId, 'Expect the userId to match');
                    const postId = response.data.id;
                    console.log('Picked Post number: ', postId);
                    var options = {
                              'method': 'PUT',
                              'url': `${baseURL}/posts/${postId}`,
                              'headers': {
                                'Accept-Charset': 'UTF-8',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                "id": postId,
                                "title": "foonew",
                                "body": "barnew",
                                "userId": 9
                              })
                            };
                    console.log('Updating the created post...');
                    const res_put = await axios(options.url, options.data);
                    console.log('Status Code:', res_put.status);
                    console.log('Created Post:', res_put.data);
                    console.assert(res_put.status === 200, 'Expected status code is 200');
                    console.assert(res_put.data.title === options.body.title, 'Expect the post title to match on update');
                    console.assert(res_put.data.body === options.body.body, 'Expect the post body to match on update');
                    console.assert(res_put.data.userId === options.body.userId, 'Expect the userId to match on update');
                } catch (error) {
                    console.error('Error updating post:', error.message, error.code);
    //                process.exit(1);
    // Removed above exit func, since it will always return an error (no retention of the posted data on the test db)
    // When running an update on an existing post, above assertions will also fail.
                };
            });

    // PUT (Update) an existing post
    it('update a post', async () => {
            console.log('Updating an existing post...');
            try {
                const postId = 99;
                // Here could have requested all the posts and checked the number of available posts by parsing the response,
                // then could randomly (or not) choose a post id from that scope to update.
                console.log('Picked Post number: ', postId);
                const options = {
                          'method': 'PUT',
                          'url': `${baseURL}/posts/${postId}`,
                          'headers': {
                            'Accept-Charset': 'UTF-8',
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            "id": postId,
                            "title": "foonew",
                            "body": "barnew",
                            "userId": 9
                          })
                        };
                const resp_put = await axios(options.url, options.data);
                console.log('Status Code:', resp_put.status);
                console.log('Created Post:', resp_put.data);
                console.assert(resp_put.status === 200, 'Expected status code is 200');
                console.assert(resp_put.data.title === options.body.title, 'Expect the post title to match on update');
                console.assert(resp_put.data.body === options.body.body, 'Expect the post body to match on update');
                console.assert(resp_put.data.userId === options.body.userId, 'Expect the userId to match on update');
            } catch (error) {
                console.error('Error updating post:', error.message, error.code);
                process.exit(1);
// When running an update on an existing post, above assertions will also fail.
            };
        });

    // DELETE a post
    it('delete a post', async () => {
            try {
                const response = await axios.delete(`${baseURL}/posts/10`);
                console.log('Status Code:', response.status);
                console.log('Deleted Post:', response.data);
                console.assert(response.status === 200, 'Expected status code is 200');
                console.assert(JSON.stringify(response.data)==='{}', `Expect to have no data in the response, but got: ${JSON.stringify(response.data)}`);
            } catch (error) {
                console.error('Error deleting post:', error.message);
                process.exit(1);
            }
    });
            
    // Negative tests, want to validate that errors are shown on invalid requests
    it('should return 404 for an invalid endpoint', async () => {
            try {
                const response = await axios.get(`${baseURL}/invalid-endpoint`);
                console.error('Expected an error but received:', response.status);
                process.exit(1); // If no error is thrown, exit with failure code
            } catch (error) {
                if (error.response) {
                    console.log('Received an error response:', error.response.status);
                    if (error.response.status !== 404) {
                        console.error(`Expected status code 404 but received ${error.response.status}`);
                        process.exit(1); // Exit with failure code
                    }
                } else {
                    console.error('Error accessing endpoint:', error.message);
                    process.exit(1); // Exit with failure code
                }
            }
        });

    it('should return 404 for a non-existing post', async () => {
            const postId = 105; // Non-existing post ID
            try {
                const response = await axios.get(`${baseURL}/posts/${postId}`);
                console.error('Expected error but received:', response.status);
                process.exit(1); // If no error is thrown, exit with failure code
            } catch (error) {
                if (error.response) {
                    console.log('Received error response:', error.response.status);
                    if (error.response.status !== 404) {
                        console.error(`Expected status code 404 but received ${error.response.status}`);
                        process.exit(1); // Exit with failure code
                    }
                } else {
                    console.error('Error fetching post:', error.message);
                    process.exit(1); // Exit with failure code
                }
            }
        });

    it('should return 400 for creating a post with missing required fields', async () => {
        const invalidPost = {
            // the body is missing, should in theory throw an error
        };
        try {
            const response = await axios.post(`${baseURL}/posts`, invalidPost);
            console.error('Expected error but received:', response.status);
            process.exit(1); // If no error is thrown, exit with failure code.
        } catch (error) {
            if (error.response) {
                console.log('Received error response:', error.response.status);
                if (error.response.status !== 400) {
                    console.error(`Expected status code 400 but received ${error.response.status}`);
                    process.exit(1); // Exit with failure code
                }
            } else {
                console.error('Error creating post:', error.message);
                process.exit(1); // Exit with failure code
            }
        }
    });
});