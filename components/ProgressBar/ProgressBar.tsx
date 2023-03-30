// ProgressBar.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

interface ProgressBarProps {
  totalPoints: number;
  velocity: number;
}

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