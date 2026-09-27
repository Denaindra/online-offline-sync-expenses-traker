import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './sortControl.module.css';
import type { SortOption } from '../../expense.types';

interface SortControlProps {
  setSort: (sort: SortOption) => void;
} 

export const SortControl = ({ setSort }: SortControlProps) => {
  const [sortValue, setSortValue] = useState('date-desc');

  const handleChange = (event: SelectChangeEvent) => {
    const nextSort = event.target.value as SortOption;
    setSortValue(nextSort);
    setSort(nextSort);
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
        <MenuItem value="date-desc">Newest first</MenuItem>
        <MenuItem value="date-asc">Oldest first</MenuItem>
        <MenuItem value="amount-desc">Highest amount</MenuItem>
        <MenuItem value="amount-asc">Lowest amount</MenuItem>
      </Select>
    </Box>
  );
};