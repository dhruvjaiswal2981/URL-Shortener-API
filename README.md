## URL Shortener API
- This is a simple URL Shortener API that allows users to shorten URLs, retrieve the original URL, and track usage statistics. The service includes features such as generating unique short IDs, redirecting users to the original URL, and providing statistics such as the number of clicks and the last accessed timestamp.

# Features
- Shorten URLs: Submit a long URL, and get a shortened version.
- Redirect to Original URL: Access the original URL by visiting the shortened link.
- Track Usage: View statistics for shortened URLs, including total clicks and the last accessed timestamp.
- Rate Limiting (Optional): Limit the number of requests per minute to prevent abuse.

# Tech Stack
- Backend: Node.js, Express.js
- Database: SQLite
- Libraries:
    - shortid for generating unique short IDs.
    - express-rate-limit for rate limiting.
    - dotenv for managing environment variables.
    - cors for enabling Cross-Origin Resource Sharing.
- Deployment: The app can be deployed on services like Render.

# Setup Instructions
1. Clone the Repository
    ```bash
    git clone https://github.com/dhruvjaiswal2981/URL-Shortener-API.git
    cd url-shortener-api

2.  Install Dependencies
    ```bash
    npm install

3. Create .env File
Create a .env file in the root of your project to set up the environment variables:
    ```bash
    PORT=5000
    DATABASE_URL=./url-shortener.db
This will configure the path to your SQLite database and set the port for the server.

4. Run the Server
    ```bash
    npm start
The server should now be running at http://localhost:5000.

# API Endpoints
- POST /shorten
This endpoint accepts a URL and returns a shortened version of that URL.
- Request Body:
    ```json
    {
    "originalUrl": "https://example.com"
    }
- Response:
    ```json
    {
    "shortUrl": "http://localhost:5000/abcd1234"
    }

- GET /:shortId
This endpoint redirects the user to the original URL when accessed using a shortId.
- Example: Visiting http://localhost:500/abcd1234 will redirect to https://example.com.

    - Response: This will perform a 302 Redirect to the original URL.

- GET /stats/:shortId
This endpoint returns the statistics for a shortened URL, including the number of clicks and the last accessed timestamp.
- Example Request: GET http://localhost:5000/stats/abcd1234
    - Response:
        ```json
        {
        "originalUrl": "https://example.com",
        "shortId": "abcd1234",
        "clicks": 10,
        "lastAccessed": "2024-11-27T10:15:30Z"
        }

# Database Schema
The SQLite database stores the following fields for each shortened URL:

- originalUrl: The original long URL (string).
- shortId: The unique shortened identifier (string).
- clicks: The number of times the shortened URL has been accessed (integer).
- lastAccessed: The timestamp of the last time the shortened URL was accessed (datetime).

    ```json
    {
    "_id": "ObjectId",
    "originalUrl": "https://example.com",
    "shortId": "abcd1234",
    "clicks": 42,
    "lastAccessed": "2024-11-26T12:34:56Z"
    }


# Rate Limiting
- (Optional) The rate limiter ensures that each IP address can only make 100 requests per minute to the API. If the limit is exceeded, the server will respond with an error message.


# Testing
To test the API endpoints, you can use tools like Postman or cURL.

- Example:
    - Shorten URL:
        - Method: POST
        - URL: http://localhost:5000/shorten
        - Body:
            ```json
            {
            "originalUrl": "https://example.com"
            }
    - Redirect to Original URL:
        - Method: GET
        - URL: http://localhost:5000/abcd1234
    - Get Stats:
        - Method: GET
        - URL: http://localhost:3000/stats/abcd1234

# Deployment
- Live Demo: The application is hosted on Render.
- Access it here: https://url-shortener-api-o6f0.onrender.com
