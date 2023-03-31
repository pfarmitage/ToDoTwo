import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const GradientProgressBar = styled(Box)`
  height: 20px;
  border-radius: 5px;
  background-image: linear-gradient(
    90deg,
    green,
    green ${(props) => props.completed}%,
    blue ${(props) => props.completed}%,
    blue ${(props) => props.completed + props.remaining}%,
    grey ${(props) => props.completed + props.remaining}%,
    grey ${(props) => props.completed + props.remaining + props.underVelocity}%,
    red ${(props) => props.completed + props.remaining + props.underVelocity}%,
    red ${(props) => props.completed + props.remaining + props.underVelocity + props.overVelocity}%
  );
`;

const ProgressBar = ({ totalPoints, velocity, completedPoints }) => {
  const barLength = Math.max(velocity, totalPoints);
  const completed = (completedPoints/barLength)*100;
  const remaining = (Math.min(totalPoints-completedPoints,velocity-completedPoints))/barLength*100;
  const underVelocity = (Math.max(velocity - totalPoints, 0)/barLength)*100;
  const overVelocity = (Math.max(totalPoints - velocity, 0)/barLength)*100;
console.log(barLength,completed,remaining,underVelocity,overVelocity)
  return (
    <Box>
      <Typography gutterBottom>Today's Progress</Typography>
      <GradientProgressBar
        completed={completed}
        remaining={remaining}
        underVelocity={underVelocity}
        overVelocity={overVelocity}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography>0</Typography>
        <Typography>{barLength}/{velocity}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;


/*
const barLength = '1000'//Math.max(velocity, totalPoints);
  const completedPercentage = '50' //(completedPoints / barLength) * 100;
  const remainingPercentage = '80'//((totalPoints - completedPoints) / barLength) * 100;
  const underVelocityPercentage = '10'//(Math.max(velocity - totalPoints, 0) / barLength) * 100;
  const overVelocityPercentage = '10'//(Math.max(totalPoints - velocity, 0) / barLength) * 100;
  */