import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { CATEGORIES } from '../../../../shared/Categories';
import  styles  from "./ExpenseFormModal.module.css";

interface ExpenseFormModalProps {
  open: boolean;
  onClose: () => void;
}

export const ExpenseFormModal = ({ open, onClose }: ExpenseFormModalProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      classes={{ paper: styles.dialogPaper }}
    >
      <DialogTitle className={styles.dialogTitle}>
        Add expense
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: '#6b7280' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent className={styles.dialogContent}>
        <Box className={styles.inputGroup}>
          <label className={styles.label}>Title</label>
          <OutlinedInput 
            fullWidth 
            placeholder="e.g. Lunch with team" 
            className={styles.inputField}
          />
        </Box>

        <Box className={styles.row}>
          <Box className={styles.inputGroup}>
            <label className={styles.label}>Amount (LKR)</label>
            <OutlinedInput 
              fullWidth 
              placeholder="0.00" 
              className={styles.inputField}
            />
          </Box>
          <Box className={styles.inputGroup}>
            <label className={styles.label}>Date</label>
            <OutlinedInput 
              fullWidth 
              type="date"
              className={styles.inputField}
            />
          </Box>
        </Box>

        <Box className={styles.inputGroup}>
          <label className={styles.label}>Category</label>
          <Select 
            fullWidth 
            defaultValue="Food"
            className={styles.inputField}
            displayEmpty
          >
           {CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box className={styles.inputGroup}>
          <label className={styles.label}>
            Notes <span className={styles.optionalText}>(optional)</span>
          </label>
          <OutlinedInput 
            fullWidth 
            multiline
            rows={3}
            placeholder="Anything worth remembering" 
            className={styles.inputField}
          />
        </Box>
      </DialogContent>

      <DialogActions className={styles.dialogActions}>
        <Button 
          onClick={onClose} 
          className={styles.cancelBtn}
          disableElevation
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          className={styles.submitBtn}
          disableElevation
        >
          Add expense
        </Button>
      </DialogActions>
    </Dialog>
  );
};