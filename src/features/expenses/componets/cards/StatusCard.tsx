import React from "react";
import styles from "./StatusCard.module.css";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

export const StatusCard = () => {
  return (
 <Card variant="outlined" className={styles.cardContainer}>
      <CardContent className={styles.cardContent}>
        <div className={styles.categoryLabel}>
          Top category
        </div>
        
        <div className={styles.categoryDetails}>
          <div className={styles.categoryDot} />
          <span className={styles.categoryName}>
            Shopping
          </span>
          <span className={styles.categoryPercentage}>
            33% of spend
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
