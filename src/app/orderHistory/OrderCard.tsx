'use client';

import React from 'react';
import styles from './styles/orderHistory.module.scss';
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Order} from "../../lib/entities/Order";

const OrderCard = ({order} : {order:Order}) => {
    const router = useRouter();
    return (
        <div className={styles.block}>
            <div className={styles.order}>
                <div>
                    <Image src = {order.service.pictures[0]} alt={'Service Image'}
                           width={150}
                           height={150}
                           quality={100}
                           priority={true}/>
                </div>
                <div className={styles.order__rightBlock}>
                    <div className={styles.order__rightBlock__Up}>
                        <div>{order.service.name}</div>
                        <div>{new Date(order.created_at).toLocaleString()}</div>
                    </div>
                    <div className={styles.order__rightBlock__Down}>
                        <div>Price: {order.service.price ? order.service.price : "Negotiable"}.</div>
                        <div>Message: {order.message}</div>
                    </div>
                </div>
            </div>


        </div>
    );
}


export default OrderCard;
