import React from 'react';
import styles from "./danger-button.module.scss";

const DangerButton = ({children, onClick,
                          px, py,
                      }) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{
                paddingRight: px,
                paddingLeft: px,
                paddingTop: py,
                paddingBottom: py
            }}
        >
            {children}
        </button>
    );
};

export default DangerButton;