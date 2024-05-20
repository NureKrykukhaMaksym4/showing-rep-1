'use client';
import React, {FormEvent, useState} from 'react';
import {ClassicDialog} from "@shared/dialogs/api";
import styles from './styles/rate.module.scss';
import {ClassicInput, ClassicTextArea} from "@shared/inputs/api";
import {ValidationError} from "@shared/errors/api";
import ClassicButton from "@shared/buttons/classic/ClassicButton";
import {Rating} from "@mui/material";
import {ServiceController} from "../../lib/controllers/service/service.controller";

const RateModal = ({open, setOpen, serviceId}: {
    open: boolean,
    setOpen: (bool: boolean) => void,
    serviceId: number
}) => {

    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState('');
    const apply = async (e: FormEvent) => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            return;
        }
        console.log(feedback);
        ServiceController.rate({feedback, rating, service_id: serviceId, token})
            .then(res => {
                console.log(res);
            })
            .finally(() => {
                setOpen(false);
            })
        ;
        e.preventDefault();
    }
    return (
        open && <ClassicDialog>
            <div className={styles.section__content}>
                <h1 className={styles.section__content__title}>Rating</h1>
                <form className={styles.form}>
                    <div className={'my-10 w-full flex flex-col items-center gap-4'}>
                        <Rating name="half-rating"
                                defaultValue={5}
                                precision={0.5}
                                size={'medium'}
                                onChange={(event: any, value: any) => setRating(value)}
                        />
                        <ClassicTextArea minHeight={200} value={feedback} setValue={setFeedback}>
                            Feedback
                        </ClassicTextArea>
                    </div>
                    <div className={'flex gap-3 w-full'}>
                        <ClassicButton onClick={() => setOpen(false)}>Cancel</ClassicButton>
                        <ClassicButton onClick={apply}>Apply</ClassicButton>
                    </div>
                </form>
            </div>
        </ClassicDialog>
    );
};

export default RateModal;