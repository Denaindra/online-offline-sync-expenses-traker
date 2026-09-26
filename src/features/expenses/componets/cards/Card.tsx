import React from "react";
import styles from "./Card.module.css";

export const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.label}>Top category</div>
      <div className={styles.details}>
        <span className={styles.dot}></span>
        <span className={styles.name}>Shopping</span>
        <span className={styles.percentage}>33% of spend</span>
      </div>
    </div>
  );
};
