import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', // Replace with your actual API key
  dangerouslyAllowBrowser: true
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendChatGPTRequest = async (message) => {
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      });
      return chatCompletion.choices[0].message.content;
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
      return 'An error occurred while processing your request.';
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user', timestamp: new Date() };
      setMessages([...messages, userMessage]);
      setInput('');

      const chatGPTResponse = await sendChatGPTRequest(input);
      setMessages(prevMessages => [...prevMessages, { text: chatGPTResponse, sender: 'chatgpt', timestamp: new Date() }]);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="chat-container">
      <div className="chat-header" onClick={toggleMinimize}>
        {isMinimized ? 'Open ChatGPT' : '↓'} {/* Toggle icon based on isMinimized state */}
      </div>
      {!isMinimized && (
        <div className="messages-area">
          {messages.map((message, index) => (
            <div key={index} className={`message-bubble ${message.sender === 'user' ? 'user' : 'chatgpt'}`}>
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
          <form onSubmit={sendMessage} className="message-form">
            <input
              className="text-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question, powered by ChatGPT..."
            />
            <button className="send-button" type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;