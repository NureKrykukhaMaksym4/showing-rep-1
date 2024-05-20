'use client';
import React, {FormEvent, useState} from 'react';
import {ClassicDialog} from "@shared/dialogs/api";
import styles from './styles/rate.module.scss';
import {ClassicInput, ClassicTextArea} from "@shared/inputs/api";
import {ValidationError} from "@shared/errors/api";
import ClassicButton from "@shared/buttons/classic/ClassicButton";
import {Rating} from "@mui/material";
import {ServiceController} from "../../lib/controllers/service/service.controller";

const ErrorModal = ({open, setOpen}: {
    open: boolean,
    setOpen: (bool: boolean) => void,
}) => {

    const apply = async (e: FormEvent) => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            return;
        }
   
        e.preventDefault();
    }
    return (
        open && <ClassicDialog>
            <div className={styles.section__content}>
                <h1 className={styles.section__content__title}>Error</h1>
                <form className={styles.form}>
                    <div className={'my-10 w-full flex flex-col items-center gap-4'}>
                        Error while making order
                    </div>
                    <div className={'flex gap-3 w-full'}>
                        <ClassicButton onClick={() => setOpen(false)}>Cancel</ClassicButton>
                    </div>
                </form>
            </div>
        </ClassicDialog>
    );
};

export default ErrorModal;