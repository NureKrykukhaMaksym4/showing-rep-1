'use client';
import React, {memo} from 'react';
import {RadioGroup, Flex, Text, Theme} from "@radix-ui/themes";
import styles from './radio-group.module.scss';

type Radio = {
    value: string;
    content: string;
}
type ClassicSelectTypes = {
    items: Radio[];
    setSelectedItem: (value: string) => void;
    defaultValue: string;
}
const ClassicSelect = memo(({
                            items, defaultValue, setSelectedItem
                       }: ClassicSelectTypes) => {
    return (
        <div className={styles.radioGroup__wrapper}>
            <RadioGroup.Root defaultValue={defaultValue}
                             variant={'surface'}
                             color={'red'}
            >
                <div className={styles.radioGroup}>
                    {items.map(item =>
                        <Text key={item.value} as="label" size={'3'}>
                            <div className={styles.radio}>
                                <RadioGroup.Item className={styles.radio__btn}
                                                 value={item.value}
                                                 onClick={() => setSelectedItem(item.value)}
                                /> {item.content}
                            </div>
                        </Text>
                    )}
                </div>
            </RadioGroup.Root>
        </div>
    );
});

ClassicSelect.displayName = 'ClassicSelect';
export default ClassicSelect;