import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [document, setDocument] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getChatGPTResponse = async (userMessage) => {

  };
  
  

  const sendMessage = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user', timestamp: new Date() };
      setMessages([...messages, userMessage]);
      setInput('');

      const chatGPTResponse = await getChatGPTResponse(input);
      if (chatGPTResponse) {
        setMessages(prevMessages => [...prevMessages, { text: chatGPTResponse, sender: 'chatgpt', timestamp: new Date() }]);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDocument(file);
      // Add any logic here for file handling
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Drycana</h2>
      <div className="messages-area">
        {messages.map((message, index) => (
          <div key={index} className={`message-bubble ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          className="file-input"
          type="file"
          onChange={handleFileChange}
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
        <input
          className="text-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="send-button" type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
