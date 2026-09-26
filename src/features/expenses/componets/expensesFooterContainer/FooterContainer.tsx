import React from 'react'
import styles from './footerContainer.module.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const currentCount = 6;
const totalCount = 13;


const FooterContainer = () => {
  return (
     <div className={styles.footerContainer}>
        <Typography className={styles.showingText}>
          Showing {currentCount} of {totalCount}
        </Typography>
        <Button 
          variant="outlined" 
          className={styles.loadMoreBtn}
          disableElevation
        >
          Load more
        </Button>
      </div>
  )
}
export default FooterContainer;