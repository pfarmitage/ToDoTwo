import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ProgressBarSection = styled(Box)`
  height: 20px;
  position: absolute;
  top: 0;
  border-radius: 0px;
`;

const ProgressBar = ({ totalPoints, velocity, completedPoints }) => {
  const barLength = Math.max(velocity, totalPoints);
  const completed = (completedPoints / barLength) * 100;
  const remaining = (Math.max(Math.min(totalPoints - completedPoints, velocity - completedPoints), 0) / barLength) * 100;
  const underVelocity = (Math.max(velocity - totalPoints, 0) / barLength) * 100;
  const overVelocity = (Math.max(Math.min(totalPoints - velocity, totalPoints - completedPoints), 0) / barLength) * 100;
console.log(barLength,completed,remaining,underVelocity,overVelocity)
  return (
    <Box>
      <Typography gutterBottom>Today's Progress</Typography>
      <Box position="relative" width="100%">
        <ProgressBarSection
          width={`${completed}%`}
          bgcolor="green"
          title={`Completed: ${completedPoints}`}
        />
        <ProgressBarSection
          width={`${remaining}%`}
          bgcolor="blue"
          title={`Remaining: ${totalPoints - completedPoints}`}
          style={{ left: `${completed}%` }}
        />
        <ProgressBarSection
          width={`${underVelocity}%`}
          bgcolor="grey"
          title={`Spare Capacity: ${velocity - totalPoints}`}
          style={{ left: `${completed + remaining}%` }}
        />
        <ProgressBarSection
          width={`${overVelocity}%`}
          bgcolor="red"
          title={`Remaining: ${totalPoints - completedPoints}`}
          style={{ left: `${completed + remaining + underVelocity}%` }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography>0</Typography>
        <Typography>{barLength}/{velocity}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
