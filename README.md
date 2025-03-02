# GPT Teaching Assistant

## Overview

This application is a simple chat interface designed to assist users with Data Structures and Algorithms (DSA) problems. It utilizes a GPT model to provide guidance, hints, and intuition-building dialogue, helping users understand and solve LeetCode problems independently.

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone [your-repository-url]
   cd [your-repository-directory]

Backend Setup:

Navigate to the backend directory: cd backend
Install dependencies: npm install
Create a .env file and add your1 Groq API key: GROQ_API_KEY=your_groq_api_key   


Frontend Setup:

Navigate to the frontend/my-app directory: cd ../frontend/my-app
Install dependencies: npm install
Start the frontend application: npm start


Architecture
The application follows a client-server architecture:

Frontend (React): Provides the user interface for submitting LeetCode URLs and questions, and displays responses from the GPT model.
Backend (Node.js/Express): Handles API requests from the frontend, communicates with the Groq API, and sends responses back to the frontend.
Groq API: Processes user inputs and generates responses based on the provided prompts.
Usage Guidelines
Open the application in your browser (usually http://localhost:3000).
Enter the URL of a LeetCode problem in the "Enter LeetCode URL" field.
Type your question or doubt in the "Type your question here..." field.
Click the "Send" button to submit your question.
View the response from the GPT-based teaching assistant in the chat log.
Use the "Clear Chat" button to clear the chat log.
GPT Integration
The backend communicates with the Groq API to generate responses. The server.js file sends a POST request to the Groq API with the user's question and the LeetCode URL.

Prompt Management:

The prompts are designed to encourage deeper understanding and independent problem-solving:

A system message is used to define the LLM's role as a DSA teaching assistant.
The prompt focuses on guiding questions, related examples, and thought-provoking hints, rather than providing direct solutions.
The LLM is instructed to break responses into short paragraphs, ask follow-up questions, and address the user directly using "you".
Example Prompts
Here's an example of how the prompt is structured:

System: You are a DSA teaching assistant. Guide the user towards solving LeetCode problems without giving direct solutions. Focus on hints, related concepts, and thought-provoking questions. Break responses into short paragraphs, and ask follow up questions. Address the user DIRECTLY using 'you' and ONLY 'you'. Do NOT use 'the user' or any other third-person references. For example, say 'You should try...' instead of 'The user should try...'. Never refer to the user in the third person. Use 'you' exclusively.
User: A user has a doubt about this DSA problem: [LeetCode URL]. Their question is: [User Question]. Guide them.
This prompt encourages the LLM to provide helpful hints and guidance, fostering a learning environment.








