import React, {useEffect, useState} from 'react';
import {ClassicDialog} from "@shared/dialogs/api";
import {ClassicInput, ClassicTextArea} from "@shared/inputs/api";
import {ClassicSelect} from "@shared/selects/api";
import {CategoryController} from "../../lib/controllers/category/category.controller";
import {ClassicButton} from "@shared/buttons/api";
import {ServiceController} from "../../lib/controllers/service/service.controller";

const CreateServiceModal = ({close, provider_id}: any) => {
    const [service, setService] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        pictures: [''],
        provider_id
    });

    const [geolocation, setGeolocation] = useState(({
        longitude:'',
        latitude:''
    }))
    const [categories, setCategories] = useState([] as any[]);
    useEffect(() => {
        CategoryController.getCategories().then((res: any) => {
            setCategories(Object.keys(res.data).map(item => ({
                title: res.data[item],
                value: item
            })))
        })
    }, []);

    const apply = async (e: any) => {
        e.preventDefault();
        const createdService = await ServiceController.create(service) as any
        const token = window.localStorage.getItem('token');
        const addGeolocation = await ServiceController.addGeolocation({
            token: token,
            service_id:createdService.data.id,
            latitude:geolocation.latitude,
            longitude:geolocation.longitude
        })
        close();
    }

    const cancel = () => {
        close();
    }

    return (
        <ClassicDialog>
            <form className={'space-y-4 bg-gray-900 p-7 rounded-2xl min-w-[500px] z-[100]'}>
                <h1 className={'text-2xl text-center font-bold'}>Create a service</h1>
                <ClassicInput
                    value={service.name}
                    setValue={(value) => setService({...service, name: value})}
                >
                    Name
                </ClassicInput>
                <ClassicInput
                    value={service.price}
                    setValue={(value) => setService({...service, price: value})}
                >
                    Price $
                </ClassicInput>
                <ClassicInput
                    value={service.pictures[0]}
                    setValue={(value) => setService({...service, pictures: [value]})}
                >
                    Image
                </ClassicInput>
                <ClassicSelect
                    label={'Category'}
                    placeholder={'Category'}
                    items={categories}
                    setSelectedItem={(item: any) => setService({...service, category: item})}
                />
                <div>
                    <div style={ {fontWeight:'bold',marginBottom:'7px'}}>
                        Geolocation
                    </div>

                    <div style={ {display:'flex', gap:'10px'} }>


                        <ClassicTextArea
                            minHeight={10}
                            value={geolocation.latitude}
                            setValue={(value: any) => setGeolocation({...geolocation, latitude: value})}
                        >
                            Latitude
                        </ClassicTextArea>

                        <ClassicTextArea
                            minHeight={10}
                            value={geolocation.longitude}
                            setValue={(value: any) => setGeolocation({...geolocation, longitude: value})}
                        >
                            Longitude
                        </ClassicTextArea>



                    </div>
                </div>

                <ClassicTextArea
                    minHeight={200}
                    value={service.description}
                    setValue={(value: any) => setService({...service, description: value})}
                >
                    Description
                </ClassicTextArea>
                <div className={'flex gap-3'}>
                    <ClassicButton onClick={cancel} variant={'danger'}>Cancel</ClassicButton>
                    <ClassicButton onClick={apply}>Apply</ClassicButton>
                </div>
            </form>
        </ClassicDialog>
    );
};

export default CreateServiceModal;