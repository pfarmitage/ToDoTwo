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
  return (
    <Box width="100%">
      <Typography gutterBottom>Today's Plan</Typography>
      <Box position="relative" width="100%" padding={0.5}>
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
      <Box display="flex" width="100%" justifyContent="space-between" mt={1} >
        <Typography>0</Typography>
        <Typography>{totalPoints}/{velocity}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
