"use client"

import styles from "./styles.module.scss";

type ProductInfoType = {
    name: string;
    description: string;
    isVisible: boolean;
}

export const ProductInfo = ({ name, description, isVisible }: ProductInfoType) => {
    
  return (
    <div style={{opacity: isVisible ? 1 : 0}} className={styles.productInfoContainer}>
      <span className={styles.name}>{name}</span>
      <span className={styles.description}>{description}</span>
    </div>
  );
};
