import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styles from './DeleteExpenses.module.css';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  expenseTitle: string;
  expenseAmount: string; 
}

export const DeleteExpenses = ({
  open,
  onClose,
  onConfirm,
  expenseTitle,
  expenseAmount,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: styles.dialogPaper }}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle className={styles.dialogTitle}>
        Delete this expense?
      </DialogTitle>
      
      <DialogContent className={styles.dialogContent}>
        <DialogContentText className={styles.dialogText}>
          {expenseTitle} ({expenseAmount}) will be removed. You can undo this right after.
        </DialogContentText>
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
          onClick={onConfirm} 
          variant="contained" 
          className={styles.deleteBtn} 
          disableElevation
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};