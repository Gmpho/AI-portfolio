# 🧪 Testing Strategy

This document outlines the testing strategy and coverage goals for the AI-Powered Portfolio application. Our approach emphasizes a multi-faceted testing methodology to ensure reliability, performance, and security across all layers of the application.

## 🎯 Testing Types and Goals

### Unit Testing

*   **Purpose:** To verify the correctness of individual functions, components, and isolated logic units.
*   **Frameworks:** We use Jest and React Testing Library for unit tests.
*   **Practices:**
    *   **Test-Driven Development (TDD):** Adopt TDD where feasible to guide development and ensure testability.
    *   **Mocking:** Utilize mocking to isolate components and external dependencies (e.g., mock OpenAI, Pinecone clients) to ensure tests are fast and focused.
*   **Coverage Goals:** Aim for high code coverage, especially for complex business logic and critical functions. Parameterized tests are used to cover edge cases and various inputs.

### Integration Testing

*   **Purpose:** To verify the interactions between multiple components or services, ensuring they work together as expected.
*   **Scope:** Tests span across components, including API routes and service integrations.
*   **Practices:**
    *   **Development Server Testing:** Integration tests may spin up a development server to test API routes end-to-end without the full UI.
    *   **External API Mocking:** Integrate with external APIs by mocking third-party responses to ensure consistent and reliable test results.
    *   **Database Interaction:** Test interactions with databases (e.g., Pinecone, Notion), often using in-memory or isolated test databases.
*   **Key Flows:** Validate critical application flows, such as "vector search returns relevant items" or "chatbot provides accurate recommendations."

### End-to-End (E2E) Testing

*   **Purpose:** To simulate real user flows and verify the entire system works as a cohesive unit, from the user interface to the backend services.
*   **Frameworks:** Tools like Playwright or Cypress can be used for E2E tests.
*   **Scope:** Includes UI interactions, full HTTP requests for APIs, and comprehensive system validation.
*   **Advanced Testing:**
    *   **Performance Tests:** Conducted under load to assess application responsiveness and scalability.
    *   **Security Tests:** Involve attempting known attack payloads to identify vulnerabilities.
    *   **Synthetic Monitoring:** Scheduled E2E checks in production environments to proactively detect issues.

## 🛡️ Resilience Testing

We perform fault-injection tests to exercise circuit-breakers and retry mechanisms, ensuring the application remains robust under adverse conditions.

*   **Scenario Simulation:**
    *   **Simulate OpenAI outage:** Make route handler return 500 to assert that fallback to Ollama is used and the response is valid.
    *   **Circuit-breaker tests:** Flood API with failures to assert that the circuit opens and closes properly.

## 📊 Coverage and Automation

*   **Automation:** All tests are automated and integrated into the CI/CD pipeline.
*   **Coverage Thresholds:** Enforce code coverage thresholds to maintain code quality.
*   **Execution Frequency:** Unit tests run on every push. Integration and E2E tests run nightly and on release branches.
*   **Reporting:** Test results, including failed tests and coverage reports, are published to a team dashboard for visibility.

## 📦 Test Data Management

*   **Representative Data:** Use representative datasets or synthetic data for testing, especially for vector search and prompt responses.
*   **Isolation:** Isolate test databases from production environments to prevent data corruption.
*   **Ephemeral Databases:** Utilize Docker or in-memory databases for CI environments to ensure clean and consistent test runs.

## 📈 Monitoring in Tests

*   **Pipeline Health:** Track synthetic monitoring results and overall pipeline health (e.g., via health-check endpoints) to receive alerts on failures automatically.

These testing practices align with recommended industry standards, emphasizing mock dependencies for unit tests, integration tests across components, and comprehensive E2E flows, including chaos/circuit-breaker tests for validating fault tolerance.

## 💻 Development Workflow - Testing Commands

Here are the common commands for running tests during development:

*   **Run all unit tests:**
    ```bash
    npm run test
    ```
*   **Run tests with watch mode (for continuous development):**
    ```bash
    npm run test:watch
    ```
*   **Generate a code coverage report:**
    ```bash
    npm run test:coverage
    ```
*   **Test AI services (specific AI-related tests):**
    ```bash
    npm run test:ai
    ```

## 🛠️ Troubleshooting Guide

This section provides solutions for common issues encountered during development and testing.

*   **Build Failures:**
    *   **Solution:** Always run `npm run type-check` and `npm run lint` first to identify TypeScript and linting errors before attempting a build.
*   **API Errors:**
    *   **Solution:** Verify that all necessary environment variables are set correctly in your `.env.local` file and are accessible by the application.
*   **PDF Processing Issues:**
    *   **Solution:** Ensure that `PDF.js` is properly configured and its dependencies are correctly installed.
*   **Ollama Connection Problems:**
    *   **Solution:** Make sure your Ollama instance is running and accessible at `http://localhost:11434` (or the configured `OLLAMA_BASE_URL`).

## ✅ Environment Setup Verification

To ensure your development environment is correctly configured, use the following commands:

*   **Check all required environment variables:**
    ```bash
    node scripts/check-env.js # Assuming you have a script for this
    ```
*   **Test AI service connections:**
    ```bash
    node scripts/test-ai.js
    ```
*   **Validate build output (after a successful build):**
    ```bash
    npm run build && npm run start
    ```