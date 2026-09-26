import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import styles from './CategoryFilter.module.css';
import { CATEGORIES } from '../../../../shared/Categories';



export const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <Box className={styles.filterContainer}>
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        
        return (
          <Chip
            key={category}
            label={category}
            onClick={() => setActiveCategory(category)}
            variant={isActive ? 'filled' : 'outlined'}
            className={`${styles.chipBase} ${isActive ? styles.activeChip : styles.inactiveChip}`}
          />
        );
      })}
    </Box>
  );
};