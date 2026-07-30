import React from "react";
import styles from "./styles.module.scss";

const ListFooter = ({ status }: { status: string[] }) => {
  const statusColors = ["#FFD079", "#009688", "#d32f2"];

  return (
    <div className={styles.listFooterContainer}>
      <div className={styles.statusContainer}>
        {status.map((status, index) => (
          <div key={index} className={styles.statusItem}>
            <div
              className={styles.statusColor}
              style={{
                backgroundColor: statusColors[index],
              }}
            />
            {status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListFooter;
