# LangChain Agents

This document details the setup, configuration, and patterns for LangChain agents within the AI-Powered Portfolio's career coach chatbot. It covers the agent architecture, tool registry, and robust error handling strategies.

## Agent Architecture

Our system employs a sophisticated multi-agent architecture based on the LangChain Planner/Executor style. This design allows for complex user tasks to be broken down and processed efficiently.

*   **Planner Agent:** This high-level agent is responsible for dissecting user requests into smaller, manageable subtasks.
*   **Executor Agents:** Multiple specialized Executor agents handle these subtasks. Examples include agents for:
    *   **RAG (Retrieval-Augmented Generation):** For fetching relevant information from knowledge bases.
    *   **Code Execution:** For running code snippets or interacting with programming environments.
    *   **Knowledge Retrieval:** For accessing and synthesizing information from various sources (e.g., Pinecone, Notion).
*   **Communicator/Assistant Model:** This agent interacts directly with the user, providing responses and clarifying queries.
*   **Evaluator Agent:** This agent may verify the outputs of other agents to ensure accuracy and relevance.

This multi-agent setup is a known pattern for building intelligent and adaptable AI systems. For a visual representation, refer to the `Gemma + llama.cpp + your Next.js API routes flowchart.png` in the project root, which illustrates a similar multi-agent flow.

## Tool Registry

Agents in our system are equipped with a comprehensive set of tools to perform their tasks. These tools are registered and made available for agents to utilize based on the context of the user's request.

*   **Database Access:** Tools for interacting with Pinecone (vector database) and Notion (CMS).
*   **External APIs:** Integration with OpenAI for advanced language models and Ollama for local AI capabilities.
*   **Custom Functions:** Specialized functions tailored to specific career coaching tasks.

Optionally, we can integrate with a Smithery/MCP tool registry, which allows models to dynamically discover and query external tools, enhancing extensibility.

## Fallback Strategies

To ensure resilience and continuous service availability, our LangChain setup incorporates robust fallback mechanisms, particularly when LLMs or agent chains encounter failures.

*   **OpenAI Fallback:** If the primary OpenAI chat API times out or hits rate limits, the system can automatically retry with a different model or fall back to a local Ollama instance.
*   **Ollama Integration:** We utilize the `langchain-ollama` provider for local/self-hosted Ollama LLMs. If OpenAI fails, Ollama serves as a fallback. Conversely, if Ollama provides incoherent output, the system can fall back to OpenAI.

## Error Handling Patterns

Effective error handling is crucial for a stable and user-friendly chatbot experience. We employ the following patterns:

*   **Retry Logic:** For transient errors (e.g., network issues, rate limits), we implement retry mechanisms with exponential backoff to ensure temporary failures do not disrupt the user experience.
*   **Logging:** All errors and tool usage are comprehensively logged via LangChain callbacks, providing valuable data for observability and debugging.
*   **Custom Exceptions:** We throw clear, custom exceptions when tools return invalid data, enabling graceful recovery and preventing cascading failures.
*   **User-Friendly Feedback:** Exceptions within the agent chain are caught to provide user-friendly messages (e.g., "Sorry, I'm having trouble accessing the database.") instead of technical errors.

These patterns collectively reflect LangChain best practices for modular agents, tool registration, and robust fault tolerance.

## Security for Agents

Security is paramount when dealing with AI agents that can interact with external tools and data. Our approach includes:

*   **Tool Whitelisting:** Agents are restricted to calling only explicitly whitelisted tools. They cannot call arbitrary URLs or execute unapproved functions.
*   **Scoped Credentials:** Each tool is configured to use credentials with the minimum necessary scope, adhering to the principle of least privilege.
*   **Auditing and Logging:** All tool calls and agent actions are audited and logged (e.g., to Sentry and a custom audit log) for traceability and security monitoring.

## Example Agent Flow

To illustrate how our LangChain agents operate, consider the following user query:

**User asks:** "Which of my projects match Frontend roles?"

**AgentExecutor Process:**

1.  **Retrieval Tool:** The agent utilizes a retrieval tool to query Pinecone for projects that have embeddings related to "frontend" roles.
2.  **Notion Tool:** For the top matching projects from Pinecone, the agent uses a Notion tool to fetch detailed project information (e.g., descriptions, technologies).
3.  **Ranker Tool:** A ranking tool (or a component within the agent) then ranks the retrieved projects by relevance and last updated date.
4.  **Response Generation:** The agent constructs a comprehensive response, including recommended project links and summaries, which is then presented to the user.