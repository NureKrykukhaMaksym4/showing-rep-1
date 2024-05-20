'use client';
import React, {useEffect, useState} from 'react';
import styles from './styles/orderHistory.module.scss';
import {AuthController} from "@controllers/auth/auth.controller";
import {useRouter} from "next/navigation";
import {ServiceController} from "@controllers/service/service.controller";
import {any} from "prop-types";
import OrderCard from "./OrderCard";
const Page = ({params: {id}}: {params: {id: number}}) => {

    const router = useRouter();
    const [orderHistory, setOrderHistory] = useState([] as any[]);
    useEffect(() => {

        const fetchData = async() => {
            const token = window.localStorage.getItem('token');
            if (token) {
                AuthController.verify(token)
                    .then(res => {
                        console.log(res);
                        if (res.error) {
                            router.push('/');
                        } else {
                            ServiceController.getHistory(res.user.email).then((res:any) => setOrderHistory(res.data.entries))
                            // console.log(res.user.email);
                        }
                    })
            } else {
                router.push('/login');
            }}
        fetchData();
    }, []);
    return (
        <div style={{ height:"100vh",width: 'inherit', marginTop:"0" }}>
            <div className={styles.element}>Order History</div>
            <div>
                {orderHistory.map((item, index) => (<>
                    <OrderCard key={index} order={item}></OrderCard>
                </>
                ))}
            </div>
        </div>

    );
};

export default Page;

