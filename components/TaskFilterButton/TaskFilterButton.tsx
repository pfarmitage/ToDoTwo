import React from 'react';
import { Button } from '@mui/material';

interface TaskFilterButtonProps {
  label: string;
  selected: boolean;
  onSelect: (label: string) => void;
}

const TaskFilterButton: React.FC<TaskFilterButtonProps> = ({ label, selected, onSelect }) => {
  return (
    <Button
      variant={selected ? 'contained' : 'outlined'}
      color="primary"
      onClick={() => onSelect(label)}
      sx={{ margin: 1 }}
    >
      {label}
    </Button>
  );
};

export default TaskFilterButton;
