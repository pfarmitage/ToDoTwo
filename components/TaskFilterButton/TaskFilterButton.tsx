import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

interface TaskFilterButtonProps {
  label: string;
  selected: boolean;
  onSelect: (label: string) => void;
}

const TaskFilterButton: React.FC<TaskFilterButtonProps> = ({ label, selected, onSelect }) => {
  return (
    <ButtonGroup variant="outlined">
      <Button
        size="small"
        variant={selected ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onSelect(label)}
      >
        {label}
      </Button>
    </ButtonGroup>
  );
};

export default TaskFilterButton;
