'use client';
import React, {FormEvent, useState} from 'react';
import {ClassicDialog} from "@shared/dialogs/api";
import styles from './styles/rate.module.scss';
import ClassicButton from "@shared/buttons/classic/ClassicButton";
import {ServiceController} from "../../lib/controllers/service/service.controller";
import {useRouter} from "next/navigation";



const DeleteService = ({open, setOpen,service_id}: {
    open: boolean,
    setOpen: (bool: boolean) => void,
    service_id:number
}) => {

    const router = useRouter();
    const apply = async (e: FormEvent) => {
        e.preventDefault();
        const token = window.localStorage.getItem('token');
        if (!token) {
            return;
        }
        try {
          const result = await ServiceController.deleteService({token,service_id: Number(service_id)})
            router.push('/');
        } catch(e){
        }


    }

    return (
        <>
            {open && <ClassicDialog>
                <div className={styles.section__content}>
                    <h1 className={styles.section__content__title}>Do you want to delete service?</h1>
                    <form className={styles.form}>

                        <div className={'flex gap-3 w-full'}>
                            <ClassicButton onClick={() => setOpen(false)}>Cancel</ClassicButton>
                            <ClassicButton variant={'danger'} onClick={apply}>Delete</ClassicButton>
                        </div>
                    </form>
                </div>
            </ClassicDialog>}

        </>
    );
};

export default DeleteService;