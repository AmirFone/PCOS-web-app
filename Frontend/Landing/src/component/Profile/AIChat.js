import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, ListGroup, ListGroupItem, Card, CardBody, CardHeader } from 'reactstrap';
import { FaRobot, FaUser, FaPaperPlane, FaTimes } from 'react-icons/fa';

function AIChat({ profile, isOpen, toggle }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

//    send the message to your LLM API
    setTimeout(() => {
      const aiMessage = { 
        text: `This is a simulated response. In a real scenario, this would be the LLM's response, taking into account your PCOS data and chat history.`, 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <Card className="chat-window" style={{position: 'fixed', bottom: '20px', right: '20px', width: '300px', height: '400px', zIndex: 1000}}>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <span>AI Assistant</span>
        <Button close onClick={toggle} />
      </CardHeader>
      <CardBody className="d-flex flex-column" style={{height: '100%'}}>
        <ListGroup className="chat-messages flex-grow-1" style={{overflowY: 'auto'}}>
          {messages.map((message, index) => (
            <ListGroupItem key={index} className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              {message.sender === 'ai' && <FaRobot className="mr-2" />}
              <span>{message.text}</span>
              {message.sender === 'user' && <FaUser className="ml-2" />}
            </ListGroupItem>
          ))}
          <div ref={messagesEndRef} />
        </ListGroup>
        <div className="mt-3 d-flex">
          <Input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <Button color="primary" onClick={handleSend} className="ml-2">
            <FaPaperPlane />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default AIChat;