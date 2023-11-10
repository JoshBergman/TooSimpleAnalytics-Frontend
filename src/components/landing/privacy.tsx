import styles from "./styles/privacy.module.css";
import simple_and_fast_styles from "./styles/simple-and-fast.module.css";

const Privacy = () => {
  return (
    <div className={styles.container}>
      <h1 className={simple_and_fast_styles.heading}>Privacy</h1>
      <p className={simple_and_fast_styles.p}>Own your data</p>
      <ul className={styles.ul}>
        <li className={styles.li}>You data will never be sold</li>
        <li className={styles.li}>Your visitors will never be tracked</li>
        <li className={styles.li}>
          Deleting your account actually removes your information, as well as
          ANY related data
        </li>
      </ul>
    </div>
  );
};

export default Privacy;
