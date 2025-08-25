# 🔌 API Documentation

This document provides detailed documentation for each Next.js API endpoint (backend route handler) within the AI-Powered Portfolio application. It covers request/response schemas, authentication mechanisms, and usage examples.

## 🛡️ API Gateway & Proxy Architecture

Our API design incorporates robust security measures and a layered architecture to protect backend services and ensure secure communication. All API calls are routed through Cloudflare's edge network, acting as an API Gateway and proxy.

*   **Edge WAF (Cloudflare):** Protects against OWASP top risks, blocks malicious bots, and filters known bad IPs.
*   **API Gateway Layer (Cloudflare Workers):** Every inbound request passes through a layer that enforces rate limiting, authentication, input sanitization, and circuit-breaker wrappers before reaching the core API logic.

For more comprehensive details on API hardening rules, refer to the [Security Practices](SECURITY.md) documentation.

## 📚 Endpoint Reference

For each API route, the following details are provided:

### `POST /api/chat`

*   **Purpose:** Handles user messages for the AI career coach chatbot, orchestrating interactions with OpenAI, Ollama, Pinecone, and Notion.
*   **HTTP Method:** `POST`
*   **Required Headers:**
    *   `Content-Type: application/json`
    *   (Potentially) `Authorization: Bearer <JWT>` if user authentication is implemented.
*   **Rate Limits:** (Example) 10 requests/minute per user (implemented via in-memory store).
*   **Request Payload Schema:**
    ```json
    {
      "message": "string",
      "history": [
        { "role": "user" | "assistant", "content": "string" }
      ] // Optional: previous conversation history
    }
    ```
*   **Response Format:**
    ```json
    {
      "response": "string" // AI's response
    }
    ```
    *   **Status Codes:**
        *   `200 OK`: Successful response.
        *   `400 Bad Request`: Invalid message format or length.
        *   `403 Forbidden`: Content flagged by moderation.
        *   `429 Too Many Requests`: Rate limit exceeded.
        *   `500 Internal Server Error`: General server error or AI service unavailability.
        *   `502 Bad Gateway`: OpenAI unavailable (circuit open).
        *   `503 Service Unavailable`: LLM failure (Ollama fallback also failed).
*   **Example Request Body:**
    ```json
    {
      "message": "Tell me about career paths in AI.",
      "history": [
        { "role": "user", "content": "Hello" },
        { "role": "assistant", "content": "Hi there! How can I help you?" }
      ]
    }
    ```
*   **Example Response Body:**
    ```json
    {
      "response": "AI offers diverse career paths, including Machine Learning Engineer, Data Scientist, AI Researcher, and AI Ethicist..."
    }
    ```

### `POST /api/notion`

*   **Purpose:** Placeholder endpoint for Notion API interactions (e.g., fetching project data).
*   **HTTP Method:** `POST`
*   **Required Headers:** `Content-Type: application/json`
*   **Request Payload Schema:** (Currently empty, depends on future implementation)
*   **Response Format:**
    ```json
    {
      "message": "string"
    }
    ```
*   **Status Codes:** `200 OK`

### `POST /api/ollama`

*   **Purpose:** Placeholder endpoint for direct Ollama API interactions (e.g., local LLM inference).
*   **HTTP Method:** `POST`
*   **Required Headers:** `Content-Type: application/json`
*   **Request Payload Schema:** (Currently empty, depends on future implementation)
*   **Response Format:**
    ```json
    {
      "message": "string"
    }
    ```
*   **Status Codes:** `200 OK`

### `POST /api/pinecone`

*   **Purpose:** Placeholder endpoint for Pinecone API interactions (e.g., vector upserts or queries).
*   **HTTP Method:** `POST`
*   **Required Headers:** `Content-Type: application/json`
*   **Request Payload Schema:** (Currently empty, depends on future implementation)
*   **Response Format:**
    ```json
    {
      "message": "string"
    }
    ```
*   **Status Codes:** `200 OK`

### `POST /api/pinecone/upsert`

*   **Purpose:** Indexes documents into Pinecone. **(Admin Only)**
*   **HTTP Method:** `POST`
*   **Required Headers:** `Content-Type: application/json`
*   **Request Payload Schema:** (Example)
    ```json
    {
      "vectors": [
        { "id": "string", "values": [number], "metadata": {} }
      ]
    }
    ```
*   **Response Format:** `200 OK` on success.
*   **Status Codes:** `200 OK`, `401 Unauthorized` (if not admin).

### `GET /api/projects`

*   **Purpose:** Reads project data from Notion or a cached API.
*   **HTTP Method:** `GET`
*   **Required Headers:** None (public endpoint).
*   **Request Payload Schema:** None.
*   **Response Format:** (Example)
    ```json
    [
      { "id": "string", "title": "string", "description": "string", ... }
    ]
    ```
*   **Status Codes:** `200 OK`.

### `GET /api/health`

*   **Purpose:** Provides health status of integrated AI services (OpenAI, Pinecone, Ollama).
*   **HTTP Method:** `GET`
*   **Required Headers:** None.
*   **Request Payload Schema:** None.
*   **Response Format:**
    ```json
    {
      "ok": "boolean",
      "results": {
        "openai": "boolean",
        "pinecone": "boolean",
        "ollama": "boolean"
      }
    }
    ```
*   **Status Codes:** `200 OK` (if services are healthy), `503 Service Unavailable` (if any critical service is unhealthy).

## 🔐 Auth & Error Codes

*   **Authentication:** Currently, the `/api/chat` route implements basic IP-based rate limiting. Future implementations may include JWT-based authentication for user-specific features. Admin-only endpoints like `/api/pinecone/upsert` require robust authentication.
*   **Error Handling:** API endpoints return standard HTTP status codes and JSON payloads for errors. For example:
    *   `401 Unauthorized`: If authentication is required but a valid token is not provided.
    *   `429 Too Many Requests`: If rate limits are exceeded.
    *   `500 Internal Server Error`: For unhandled exceptions or issues with backend services.

## 📦 Data Modeling

For endpoints interacting with Pinecone or Notion, data is structured as follows:

*   **Pinecone:** Vectors are stored with associated metadata (e.g., `text` field for content, `source` for origin).
*   **Notion:** Project data is structured according to the Notion database schema, typically including fields like `Name` (title), `Description`, `Technologies`, `Category`, `Status`, `GitHub URL`, `Live URL`, and `Image URL`.

##  interactive Docs

For more detailed and interactive API documentation, consider generating OpenAPI (Swagger) schemas. Alternatively, Markdown tables can be used to present endpoint details, parameters, request/response examples, authentication methods, and error handling in a structured way.

## 🗺️ Next.js Routing

Next.js automatically maps files within the `app/api/` directory to API routes. For example, `app/api/chat/route.ts` becomes the `/api/chat` endpoint.

## 📈 Usage Limits

Clients interacting with the API should be aware of potential usage quotas and rate limits imposed by integrated services (e.g., OpenAI API rate limits, Pinecone query limits, Ollama local instance capacity). Implement client-side retry mechanisms with exponential backoff for transient errors.