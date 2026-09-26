import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './sortControl.module.css';

export const SortControl = () => {
  const [sortValue, setSortValue] = useState('newest');

  const handleChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value);   
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.label}>
        Sort by
      </Typography>
      
      <Select
        value={sortValue}
        onChange={handleChange}
        className={styles.selectBox}
        displayEmpty
        MenuProps={{
          disableScrollLock: true, // Prevents layout shift when dropdown opens
        }}
      >
        <MenuItem value="newest">Newest first</MenuItem>
        <MenuItem value="oldest">Oldest first</MenuItem>
        <MenuItem value="amount_high">Highest amount</MenuItem>
        <MenuItem value="amount_low">Lowest amount</MenuItem>
      </Select>
    </Box>
  );
};