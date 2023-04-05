import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { sendToChatGPT } from './sendToChatGPT';

const RefineTask = ({ task, isOpen, onClose, onSave }) => {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      askForInitialHelp();
    }
  }, [isOpen]);

  const askForInitialHelp = async () => {
    const message = `As a project manager, please help me refine this task: ${task.description}`;
    const response = await sendToChatGPT(message);
    setConversation([{ type: 'bot', content: response }]);
  };

  const handleUserInput = async (e) => {
    e.preventDefault();
    setConversation([...conversation, { type: 'user', content: userInput }]);
    const response = await sendToChatGPT(userInput);
    setConversation([...conversation, { type: 'user', content: userInput }, { type: 'bot', content: response }]);
    setUserInput('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Refine Task</DialogTitle>
      <DialogContent>
        {/* Display the conversation history */}
        {conversation.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.type === 'user' ? 'right' : 'left' }}>
            {msg.content}
          </p>
        ))}
        {/* Input for refining the task */}
        <form onSubmit={handleUserInput}>
          <TextField
            fullWidth
            label="Your message"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(conversation)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RefineTask;
