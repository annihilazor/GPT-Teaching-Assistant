const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

const GROQ_API_KEY = "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";

app.post('/ask', async (req, res) => {
    console.log("Request body:", req.body);
    const { url, question } = req.body;

    if (!url || !question) {
        console.error("Error: Missing URL or question in the request body.");
        return res.status(400).json({ error: "Missing URL or question in the request body." });
    }

    try {
        console.log("Sending request to Groq API...");
        console.log("Sending request to Groq API with url:", url, "and question:", question);

        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a DSA teaching assistant. Guide the user towards solving LeetCode problems without giving direct solutions. Focus on hints, related concepts, and thought-provoking questions. Break responses into short paragraphs, and ask follow up questions. **Address the user DIRECTLY using 'you' and ONLY 'you'. Do NOT use 'the user' or any other third-person references. For example, say 'You should try...' instead of 'The user should try...'. Never refer to the user in the third person. Use 'you' exclusively.**",
                    },
                    {
                        role: "user",
                        content: `A user has a doubt about this DSA problem: ${url}. Their question is: ${question}. Guide themand address them by only using "you" not "user".`,
                    },
                     {
                        role: "assistant",
                        content: "For example, if the problem is about linked lists, you could ask, 'What are the key properties of a linked list that might be useful here?' or 'Have you considered using two pointers?' Now, what have you tried so far?",
                    },
                    {
                        role: "user",
                        content: `A user has a doubt about this DSA problem: ${url}. Their question is: ${question}. Guide them and address them by only using "you" not "user"`,
                    },
                ],
                max_tokens: 500,
            }),
        });

        console.log("Groq API Response Status:", groqResponse.status);
        if (!groqResponse.ok) {
            const errorBody = await groqResponse.text();
            console.error("Groq API Error:", groqResponse.status, errorBody);
            return res.status(groqResponse.status).json({ error: `Groq API Error: ${groqResponse.status} - ${errorBody}` });
        }

        const data = await groqResponse.json();
        console.log("Groq API Response Data:", data);

        const reply = data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "An unexpected error occurred while processing your request." });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});