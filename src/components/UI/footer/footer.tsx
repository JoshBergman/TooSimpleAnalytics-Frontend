import { staticInfo } from "../../../store/static-info";
import styles from "./styles/footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={styles.footerContainer}>
        <nav className={styles.nav}>
          <h3 className={styles.heading}>Navigation</h3>
          <a className={styles.link} href="/">
            Home
          </a>
          <a className={styles.link} href="/projects">
            Projects
          </a>
          <a className={styles.link} href="/Account">
            Account
          </a>
        </nav>
        <nav className={styles.nav}>
          <h3 className={styles.heading}>Other</h3>
          <a
            className={styles.link}
            rel="noreferrer"
            target="_blank"
            href={staticInfo.plugLinks.author}
          >
            Author
          </a>
          {/*
          Feedback page not yet made
          <a
            className={styles.link}
            rel="noreferrer"
            target="_blank"
            href={staticInfo.plugLinks.feedback}
          >
            Send Feedback
          </a> */}
          <a
            className={styles.link}
            rel="noreferrer"
            target="_blank"
            href={staticInfo.plugLinks.sourceCode}
          >
            Source Code
          </a>
        </nav>
      </div>
      <p className={styles.copyright}>© 2023 Joshua Bergman</p>
    </>
  );
};

export default Footer;
