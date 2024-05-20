'use client';
import React, {useEffect, useMemo, useState} from 'react';
import styles from './classic-textarea.module.scss';
import {TextArea} from "@radix-ui/themes";
type ClassicTextAreaProps = {
    children: any,
    minHeight: number,
    value: any,
    setValue: (value: any) => void,
}
const ClassicTextArea = ({
                             children,
                             minHeight,
                             value,
                             setValue,
                         }: ClassicTextAreaProps) => {
    return (
        <div
            className={styles.textarea__wrapper}
        >
            <TextArea
                size="3"
                placeholder={children}
                value={value}
                onChange={e => setValue(e.target.value)}
                style={{
                    minHeight: minHeight ?? 200
                }}

            />
        </div>
    );
};

export default ClassicTextArea;