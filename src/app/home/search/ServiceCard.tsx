'use client';

import React, {useEffect, useState} from 'react';
import styles from './styles/service.module.scss';
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Service} from "../../../lib/entities/Service";
import {AuthController} from "@controllers/auth/auth.controller";
import {ProviderController} from "@controllers/provider/provider.controller";
import {SearchController} from "@controllers/search/search.controller";
import {ClassicButton} from "@shared/buttons/api";

const ServiceCard = ({service}: {service: Service}) => {
    const router = useRouter();


    const [token,setToken] = useState('')
    const [ow, setOw] = useState();
    const [ser, setSer] = useState();

    useEffect(() => {
        const fetchData = async() => {
            const token = window.localStorage.getItem('token')
            setToken(token);

            const providerIsOwner = await AuthController.verify(token).then((res)=>{
                console.log(res)
                setOw(res.service_provider)})

            let res = await SearchController.search({query:'',id:service.id})
                .then((res:any)=>{
                    let ser = res.data.results.find(item=>item.id === service.id)
                    console.log(ser)
                    setSer(ser)
            })

        }
        fetchData();

    }, []);


    return (

        <div className={styles.serviceCard} onClick={() => router.push(`/service/${service.id}`)}>
        <p></p>
            <div className={styles.serviceCardImages}>
                <img src={service.pictures[0]}
                       alt={`Service Image`}
                       className={styles.serviceCardImage}
                />
            </div>
            <div className={styles.serviceCardDetails}>
                <div>
                    <div className={styles.serviceCardRating}>
                        <p><span className={'font-bold'}>Rating:</span> <span className={'text-green-300'}>{service.rating}</span></p>
                        {ow?.id === ser?.provider && ow?.id ? (
                            <p><span className={'text-green-300'}>You are owner</span></p>
                        ) : (
                            <p></p>
                        )}
                    </div>
                    <div className={styles.serviceCardHeader}>
                        <h2 className={'text-lg font-semibold'}>{service.name}</h2>
                        <p>Price: <span className={'text-green-400'}>{service.price ? `${service.price}$` : 'Negotiable'}</span></p>
                    </div>
                </div>
                <p className={styles.serviceCardDescription} data-full-description={service.description}>
                    {service.description.length > 100 ? `${service.description.slice(0, 100)}...` : service.description}
                </p>
            </div>
        </div>
    );
}


export default ServiceCard;


