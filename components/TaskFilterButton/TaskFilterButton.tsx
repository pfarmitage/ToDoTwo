import React from 'react';
import { Tab } from '@mui/material';

interface TaskFilterButtonProps {
  label: string;
  selected: boolean;
  onSelect: (label: string) => void;
}

const TaskFilterButton: React.FC<TaskFilterButtonProps> = ({ label, selected, onSelect }) => {
  return (
    <Tab
      label={label}
      value={label}
      selected={selected}
      onClick={() => onSelect(label)}
    />
  );
};

export default TaskFilterButton;
