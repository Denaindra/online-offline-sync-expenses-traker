import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import styles from './CategoryFilter.module.css';
import { CATEGORIES } from '../../../../shared/categories';
import type { Category } from '../../expense.types';

interface CategoryFilterProps {
  activeCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
}

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {

  return (
    <Box className={styles.filterContainer}>
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        
        return (
          <Chip
            key={category}
            label={category}
            onClick={() => onCategoryChange(category as Category | 'All')}
            variant={isActive ? 'filled' : 'outlined'}
            className={`${styles.chipBase} ${isActive ? styles.activeChip : styles.inactiveChip}`}
          />
        );
      })}
    </Box>
  );
};