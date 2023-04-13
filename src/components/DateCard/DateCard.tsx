import React, { useState } from 'react';
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, List, ListItem } from '@mui/material';

const DateCard = ({ date, velocity, actualVelocity, tasksCompleted }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card onClick={handleClickOpen}>
        <CardContent>
          <Typography>Date: {date}</Typography>
          <Typography>Velocity: {velocity}</Typography>
          <Typography>Points Completed: {actualVelocity}</Typography>
          <Typography>Tasks Completed: {tasksCompleted.length}</Typography>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tasks Completed on {date}</DialogTitle>
        <DialogContent>
          <List>
            {tasksCompleted.map((task) => (
              <ListItem key={task.id}>
                <Typography>{task.name}</Typography>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DateCard;
