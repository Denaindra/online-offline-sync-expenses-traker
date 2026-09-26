import React from "react";
import styles from "./Card.module.css";

export const Card = () => {
  return (
    <div className={styles["category-card"]}>
      <div className={styles["category-label"]}>Top category</div>
      <div className={styles["category-details"]}>
        <span className={styles["category-dot"]}></span>
        <span className={styles["category-name"]}>Shopping</span>
        <span className={styles["category-percentage"]}>33% of spend</span>
      </div>
    </div>
  );
};
