import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const DateCard = ({ date, velocity, totalPointsCompleted, tasksCompleted }) => {
  return (
    <Card>
      <CardContent>
        <Typography>Date: {date}</Typography>
        <Typography>Velocity: {velocity}</Typography>
        <Typography>Total Points Completed: {totalPointsCompleted}</Typography>
        <Typography>Tasks Completed: {tasksCompleted.length}</Typography>
      </CardContent>
    </Card>
  );
};

const DateList = ({ dateData }) => {
  const sortedDateData = dateData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Box>
      {sortedDateData.map((dateItem) => (
        <Box key={dateItem.id} mb={2}>
          <DateCard {...dateItem} />
        </Box>
      ))}
    </Box>
  );
};

export default DateList;

