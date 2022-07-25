import React from "react";
import styles from './Loader.module.css'

function Loader() {
  return (
    <div className={styles.span}>
      <div className={styles.span2}>
        <div className={styles.eye}></div>
      </div>
    </div>
  );
}

export default Loader;
