import React from 'react'
import styles from './footerContainer.module.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



interface FooterContainerProps {
  loadMore: () => void;
  page: number;
  total: number;
} 

const FooterContainer = ({ loadMore, page, total }: FooterContainerProps) => {

  return (
     <div className={styles.footerContainer}>
        <Typography className={styles.showingText}>
          Showing {page} of {total}
        </Typography>
        <Button 
          variant="outlined" 
          className={styles.loadMoreBtn}
          disableElevation
          onClick={loadMore}
        >
          Load more
        </Button>
      </div>
  )
}
export default FooterContainer;