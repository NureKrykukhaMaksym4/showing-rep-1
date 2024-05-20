'use client';
import React, {memo} from 'react';
import {Select, Theme} from "@radix-ui/themes";
import styles from './classic-select.module.scss';

const ClassicSelect = memo(({placeholder,
                           label,
                           defaultValue,
                           items,
                           setSelectedItem,
                                triggerStyle
                       }: {
    placeholder?: string;
    label: string;
    defaultValue?: string;
    items: any[];
    setSelectedItem: Function;
    triggerStyle?: any;
}) => {
    return (
        <div className={styles.select}>
            <Select.Root defaultValue={defaultValue}
                         onValueChange={(value) => setSelectedItem(value)}
                         size={'3'}
            >
                <Select.Trigger
                    className={styles.select__trigger}
                    placeholder={placeholder}
                    style={triggerStyle}
                />
                <Select.Content
                    position="popper"
                    color={'cyan'}
                >
                    <Select.Group>
                        <Select.Label>{label}</Select.Label>
                        {items.length && items.map((item: any, ind: number) =>
                            <Select.Item key={ind}
                                         value={item.value ?? item}
                                         style={{cursor: 'pointer'}}
                            >
                                {item.title ?? item}
                            </Select.Item>
                        )}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </div>
    );
});

ClassicSelect.displayName = 'ClassicSelect';
export default ClassicSelect;