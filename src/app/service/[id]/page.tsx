'use client';
import React, {useEffect, useState} from 'react';
import styles from '../styles/service.module.scss';
import Image from "next/image";
import {Service} from "../../../lib/entities/Service";
import {Provider} from "../../../lib/entities/Provider";
import {ClassicButton} from "@shared/buttons/api";
import {SearchController} from "../../../lib/controllers/search/search.controller";
import {useRouter} from "next/navigation";
import RateModal from "../RateModal";
import OrderModal from "../OrderModal";
import { CategoryController } from 'lib/controllers/category/category.controller';
import { ProviderController } from 'lib/controllers/provider/provider.controller';
import {AuthController} from "lib/controllers/auth/auth.controller";
import DeleteService from "../DeleteModal";

type Category = {
    category : string;
}

const Page = ({params: {id}}: {params: {id: number}}) => {
    function formatPhoneNumber(phone: string): string {
        const cleanedNumber = phone.replace(/\D/g, '');
        const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
        return formattedNumber;
    }

    const [service, setService] = useState<Service>({
        id,
        name: '',
        price: 0,
        provider: 0,
        description: '',
        pictures: [],
        rating: 0,
        category: ''
    });
    
    const [provider,setProvider] = useState<Provider>({
        business_name: "",
        description: "",
        phone_number: "",
        city:"",
        work_time: "",
        created_at: ""
    });

    const [geolocation, setGeolocation] = useState({
        longitude:0,
        latitude:0
    }) as any

    const router = useRouter();

    const [token,setToken] = useState('')
    const [rateModal, setRateModal] = useState(false);
    const [orderModal, setOrderModal] = useState(false);
    const [deleteService, setDeleteService] = useState(false);

    const [pr, setPr] = useState();
    const [ow, setOw] = useState();

    const [categories, setCategories] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            let providerId: any;
            let result = await SearchController.search({query: '', id})
                .then((res: any) => {
                    console.log(res);
                    if (res.error) {
                        router.push('/');
                    } else {

                        const service = res.data.results.find(item => item.id === +id);
                        try{
                            const { id, geolocation } = service;
                            setGeolocation({ longitude: geolocation.longitude, latitude: geolocation.latitude });
                        }
                        catch(e){
                            console.log(e)
                        }
                        providerId = service.provider;
                        setService(service);
                    }
                })
            await CategoryController.getCategories().then((res: any)=>{
                setCategories(res.data);
            })
            const provider = await ProviderController.getProvider({provider_id: providerId} as any).then((res:any)=>{
                setProvider(res.data)
                setPr(res.data)
            })



            const token = window.localStorage.getItem('token')
            setToken(token);
            const providerIsOwner = await AuthController.verify(token)
            setOw(providerIsOwner)


    }
    fetchData()
    }, []);

    const rate = async () => {
        setRateModal(true)
    }
    const order = async () => {
        setOrderModal(true)
    }

    const del= async () => {
        setDeleteService(true)
    }

    return (
        <section className={styles.service}>
            <div className={styles.service__inner}>
                <div className={styles.service__left_block}>
                    <div className={styles.service__avatar}>
                        {service.pictures
                            ? <img src={service.pictures[0]} alt={''} width={250} height={200}
                                     style={{height: 200, width: 250}}/>
                            : <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g id="service-circle-2" transform="translate(-2 -2)">
                                        <path id="secondary" fill="#2ca9bc" d="M12,3A9,9,0,0,0,5.55,18.27a7,7,0,0,1,4.28-3.92h0a4,4,0,1,1,4.34,0h0a7,7,0,0,1,4.28,3.92A9,9,0,0,0,12,3Z"></path>
                                        <path id="primary" d="M16,11a4,4,0,1,1-4-4A4,4,0,0,1,16,11Zm-1.83,3.35a3.95,3.95,0,0,1-4.34,0,7,7,0,0,0-4.28,3.92,9,9,0,0,0,12.81.09l.09-.09a7,7,0,0,0-4.28-3.92ZM21,12h0a9,9,0,0,0-9-9h0a9,9,0,0,0-9,9H3a9,9,0,0,0,9,9h0a9,9,0,0,0,9-9Z" fill="none" stroke={'#797c7b'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></path>
                                    </g>
                                </g>
                            </svg>
                        }
                    </div>
                    <div>
                        <p className={styles.service__email}>Category - {categories[service.category]}</p>
                    </div>
                    <div className={styles.service__options}>
                        <ClassicButton onClick={order}>Order</ClassicButton>

                        <ClassicButton onClick={rate}>Rate</ClassicButton>
                        {pr?.id === ow?.service_provider?.id && pr?.id ? (
                            <ClassicButton variant={"danger"} onClick={del}>Delete Service</ClassicButton>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
                <div className={styles.service__right_block}>
                    <h3 className={styles.service__title}>Detail information</h3>
                    <div className={styles.service__info_blocks_wrapper}>
                        <div className={styles.service__info_block}>
                            <p className={styles.service__info_item}><span>Name:</span> {service.name}</p>
                            <p className={styles.service__info_item}><span>Price:</span> {service.price ?? 'Negotiable'}</p>
                            <p className={styles.service__info_item}><span>Phone number:</span> {formatPhoneNumber("+380"+ provider.phone_number)}</p>

                            {geolocation.latitude !=0 ?  (
                                <ClassicButton onClick={() => {
                                    const url = `https://www.google.com/maps?q=${geolocation.latitude},${geolocation.longitude}`;
                                    window.open(url, '_blank');
                                }}>Geolocation</ClassicButton>
                            ):(
                                <p>No geolocation</p>
                            )}

                        </div>
                        <div className={styles.service__info_block}>
                            <p className={styles.service__info_item}><span>Provider:</span> {provider.business_name}</p>
                            <p className={styles.service__info_item}><span>Rating:</span> {service.rating}</p>
                            <p className={styles.service__info_item}><span>Work time:</span> {provider.work_time}</p>
                        </div>
                    </div>
                    <p className={styles.service__info_description_title}>Description</p>
                    <p className={styles.service__info_description}>{service.description}</p>
                </div>
            </div>
            <DeleteService open={deleteService} setOpen={setDeleteService} service_id={service.id} />
            <OrderModal open={orderModal} setOpen={setOrderModal} service_id={id}/>
            <RateModal open={rateModal} setOpen={setRateModal} serviceId={service.id}/>

        </section>
    );
};

export default Page;