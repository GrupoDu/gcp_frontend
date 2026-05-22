import styles from "./styles.module.scss";

const DataNotFound = () => {
  return (
    <div className={styles.dataNotFound}>
      <span>Não foi possível carregar os dados</span>
    </div>
  );
};

export default DataNotFound;
