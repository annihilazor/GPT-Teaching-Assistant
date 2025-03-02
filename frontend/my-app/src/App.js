// frontend/my-app/src/App.js
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [leetCodeUrl, setLeetCodeUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const chatLogRef = useRef(null);

    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [chatLog]);

    const handleSendMessage = async () => {
        if (message && leetCodeUrl) {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const response = await fetch('http://localhost:5000/ask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: leetCodeUrl, question: message }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setErrorMessage(errorData.error || 'An error occurred.');
                    setIsLoading(false);
                    return;
                }

                const data = await response.json();
                const formattedReply = data.reply.replace(/\n/g, '<br />'); // Replace newlines with <br />
                setChatLog([...chatLog, { user: message, gpt: formattedReply, timestamp: new Date().toLocaleTimeString() }]);
                setMessage('');
                setIsLoading(false);
            } catch (error) {
                console.error('Error sending message:', error);
                setErrorMessage('Failed to send message.');
                setIsLoading(false);
            }
        }
    };

    const handleClearChat = () => {
        setChatLog([]);
    };

    return (
        <div className="App dark-mode">
            <h1>DSA Teaching Assistant</h1>
            <div className="chat-container">
                <div className="chat-log fixed-chat-area" ref={chatLogRef}>
                    {chatLog.map((entry, index) => (
                        <div key={index} className="message-container">
                            <p className="user-message">
                                {entry.user} <span className="timestamp">{entry.timestamp}</span>
                            </p>
                            <p className="gpt-response" dangerouslySetInnerHTML={{ __html: entry.gpt }}></p>
                        </div>
                    ))}
                    {isLoading && <p className="loading-message">Loading...</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        placeholder="Enter LeetCode URL"
                        value={leetCodeUrl}
                        onChange={(e) => setLeetCodeUrl(e.target.value)}
                        className="input-field"
                    />
                    <textarea
                        placeholder="Type your question here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="input-field"
                    />
                    <div className="button-container">
                        <button onClick={handleSendMessage} disabled={isLoading}>
                            Send
                        </button>
                        <button onClick={handleClearChat}>Clear Chat</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;