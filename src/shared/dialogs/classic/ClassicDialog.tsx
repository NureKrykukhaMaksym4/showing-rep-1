'use client';

import React, {useEffect} from 'react';
import {createPortal} from "react-dom";
import styles from './classic-dialog.module.scss';
import MainTheme from "../../../processes/theme/MainTheme";

const ClassicDialog = ({onClick, children}: {
    onClick?: () => void,
    children: any
}) => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
        }
    }, []);

    return (
        createPortal(
            <MainTheme>
                <div
                    className={styles.dialog}
                >
                    <div
                        onClick={onClick}
                        className={styles.background}
                    ></div>
                    <div className={styles.dialog__content}>
                        {children}
                    </div>
                </div>
            </MainTheme>, document.body)
    );
};

export default ClassicDialog;