'use client';
import React, {FormEvent, useState} from 'react';
import {ClassicDialog} from "@shared/dialogs/api";
import styles from './styles/rate.module.scss';
import {ClassicInput, ClassicTextArea} from "@shared/inputs/api";
import ClassicButton from "@shared/buttons/classic/ClassicButton";
import { ServiceController } from 'lib/controllers/service/service.controller';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';

type OrderForm = {
    phoneNumber:string;
}

const OrderModal = ({open, setOpen, service_id}: {
    open: boolean,
    setOpen: (bool: boolean) => void,
    service_id: number
}) => {
    const [orderForm, setOrderForm] = useState<OrderForm>({
        phoneNumber:""
    })
    const [message, setMessage] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

    const apply = async (e: FormEvent) => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            return;
        }
        const finalMessage = message + ` | Phone number: ${orderForm.phoneNumber}`
        ServiceController.order({service_id , token, message: finalMessage})
        .then((res: any) => {
            console.log(res)
            if (res.field || res.error) {
                setOpen(false);
                setErrorModal(true);
            }
            else{
                setOpen(false)
                setSuccessModal(true);
                
            }
        });
        e.preventDefault();
    }

    return (
    <>
       {open && <ClassicDialog>
            <div className={styles.section__content}>
                <h1 className={styles.section__content__title}>Order</h1>
                <form className={styles.form}>
                    <div className={'my-10 w-full flex flex-col items-center gap-4'}>
                        <div style={{width:"100%", background: '#0B1617'}}>                   
                            <div className={'w-full bg-inherit'}>
                                <ClassicInput
                                    value={orderForm.phoneNumber}
                                    setValue={(value) => setOrderForm({ ...orderForm, phoneNumber: value })}
                                >
                                    Phone number
                                </ClassicInput>
                            </div>
                        </div>
                        <ClassicTextArea minHeight={200} value={message} setValue={setMessage}>
                            Order
                        </ClassicTextArea>
                    </div>
                    <div className={'flex gap-3 w-full'}>
                        <ClassicButton onClick={() => setOpen(false)}>Cancel</ClassicButton>
                        <ClassicButton onClick={apply}>Apply</ClassicButton>
                    </div>
                </form>
            </div>
        </ClassicDialog>} 
        {!open && errorModal && <ErrorModal open={errorModal} setOpen={setErrorModal}></ErrorModal>}
        {!open && successModal && <SuccessModal open={successModal} setOpen={setSuccessModal}></SuccessModal>}
        </>
    );
};

export default OrderModal;