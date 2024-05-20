'use client';
import React, {memo, useEffect, useMemo, useState} from 'react';
import styles from './classic-input.module.scss';
import * as uuid from 'uuid';

type ClassicInputProps = {
    value: any,
    setValue: (value: any) => void;
    minValue?: number;
    maxValue?: number;
    type?: string;
    placeholder?: string;
    px?: number;
    py?: number;
    inputStyle?: any;
    children: any;
}
const ClassicInput = memo(({
                          children,
                          value,
                          setValue,
                          minValue,
                          maxValue,
                          type,
                          placeholder,
                          py, px, inputStyle
                      }: ClassicInputProps) => {
    const [id, setId] = useState('')
    useEffect(() => {
        setId(uuid.v4());
    }, []);
    return (
        <div className={styles.input__wrapper}
        >
            <input
                id={id}
                type={type ?? 'text'}
                min={minValue}
                max={maxValue}
                className={styles.input}
                placeholder={placeholder ?? ''}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{
                    paddingTop: py,
                    paddingBottom: py,
                    paddingLeft: px,
                    paddingRight: px,
                    ...inputStyle
                }}
            />
            <label htmlFor={id} className={styles.label}>{children}</label>
        </div>
    );
});

ClassicInput.displayName = 'ClassicInput';

export default ClassicInput;