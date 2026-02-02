import React from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import { IoMdClipboard } from "react-icons/io";

const ProductionPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
    </div>
  );
};

export default ProductionPage;
