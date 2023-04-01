// SettingsDialog.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (velocity: number) => void;
  initialVelocity: number;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose, onSave, initialVelocity }) => {
  const [velocity, setVelocity] = useState(initialVelocity);

  const handleSave = () => {
    onSave(velocity);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Settings
        <IconButton
          style={{ position: 'absolute', top: 1, right: 5, zIndex: 1 }}
          edge="end"
          color="inherit"
          onClick={onClose} // change this line
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Velocity"
          type="number"
          value={velocity}
          onChange={(e) => setVelocity(Number(e.target.value))}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
