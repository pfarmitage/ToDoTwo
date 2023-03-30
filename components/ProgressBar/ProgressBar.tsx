import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';

interface ProgressBarProps {
  totalPoints: number;
  velocity: number;
  completedPoints: number;
}

const StyledLinearProgress = styled(LinearProgress)`
  height: 20px;
  border-radius: 5px;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ totalPoints, velocity, completedPoints }) => {
  //const completed = (totalPoints / velocity) * 100;
  const completed = (completedPoints) * 100;
  const remaining = ((totalPoints - completed) * 100);
  const underVelocity = Math.max(velocity - totalPoints, 0);
  const overVelocity = Math.max(totalPoints - velocity, 0);
  console.log(totalPoints, velocity, completed, remaining, overVelocity, underVelocity)

  return (
    <Box>
      <Typography gutterBottom>Today's Progress</Typography>
      <Box position="relative">
        <StyledLinearProgress
          variant="determinate"
          value={completed}
          color="success"
        />
        <StyledLinearProgress
          variant="determinate"
          value={remaining}
          color="primary"
          sx={{ position: 'absolute', left: 0, top: 0 }}
        />
        <StyledLinearProgress
          variant="determinate"
          value={underVelocity}
          color="error"
          sx={{ position: 'absolute', left: 0, top: 0 }}
        />
        <StyledLinearProgress
          variant="determinate"
          value={overVelocity}
          color="error"
          sx={{ position: 'absolute', left: 0, top: 0 }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>0</Typography>
        <Typography>{velocity}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
/*
const ProgressBar: React.FC<{ totalPoints: number; velocity: number }> = ({ totalPoints, velocity }) => {
  const percentage = Math.min((totalPoints / velocity) * 100, 100);
  const isOverCapacity = totalPoints > velocity;

  return (
    <>
      <Typography>Task Capacity for Today</Typography>
        <Box border={1} borderColor="grey.500" borderRadius={5} width="100%" height={20}>
          <Box
            bgcolor={isOverCapacity ? 'error.main' : 'primary.main'}
            borderRadius={5}
            width={`${percentage}%`}
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
          <Typography color="white" fontWeight="bold">
            {totalPoints} / {velocity}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProgressBar;
*/