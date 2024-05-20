"use client"
import { ClassicInput } from '@shared/inputs/api';
import { SearchController } from 'lib/controllers/search/search.controller';
import React, {useEffect, useState} from 'react';
import ServiceCard from './ServiceCard';
import {ClassicButton} from "@shared/buttons/api";
import {any} from "prop-types";
import {Service} from "../../../lib/entities/Service";
import {CategoryController} from "../../../lib/controllers/category/category.controller";
import {ClassicSelect} from "@shared/selects/api";
import {CircularProgress} from "@mui/material";

type SearchForm = {
    query: string;
    category?: string;
    min_rating: number;
}
const ratings = [
    {
        title: '0',
        value: '0'
    },
    {
        title: '1',
        value: '1'
    },
    {
        title: '2',
        value: '2'
    },
    {
        title: '3',
        value: '3'
    },
    {
        title: '4',
        value: '4'
    },
    {
        title: '5',
        value: '5'
    }
]
const SearchComponent = () => {
    const [form, setForm] = useState<SearchForm>({
        query: "",
        min_rating: 0,
    })
    const [categories, setCategories] = useState([] as any[]);
    const [services, setServices] = useState<Service[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        CategoryController.getCategories()
            .then((res: any) => {
                setCategories(Object.keys(res.data).map(item => ({
                    title: res.data[item],
                    value: item
                })))
        })
    }, []);

    const toSelectItems = (items: any) => {

    }
    const searchFunc = async () => {
        try {
            const res: any = await SearchController.search(form);

            const results = res.data.results;
            setServices(results);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        searchFunc();
    }, []);
    return (
        <>
            <div className={'flex mt-10 gap-4 mb-10 bg-inherit'}>
                <div className={'w-full bg-inherit'}>
                    <ClassicInput
                        value={form.query}
                        setValue={(value) => setForm({ ...form, query: value })}
                    >
                        Title
                    </ClassicInput>
                    <div className={'w-fit  mt-2'}>
                        <ClassicSelect
                            items={categories}
                            placeholder={'Category'}
                            setSelectedItem={(value: any) => setForm({...form, category: value as string})}
                            label={'Category'}
                        />
                    </div>
                    <div className={'w-fit  mt-2'}>
                        <ClassicSelect
                            items={ratings}
                            placeholder={'Min Rating'}
                            setSelectedItem={(value: any) => setForm({...form, min_rating: +value})}
                            label={'Min Rating'}
                        />
                    </div>
                </div>
                <div className={'h-[55px]'}>
                    <ClassicButton onClick={searchFunc}>Search</ClassicButton>
                </div>
            </div>
            {isLoading
                ? <div className={'flex w-full justify-center'}>
                    <CircularProgress />
                </div>
                : services.length > 0 ? (
                    services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))
                ) : (
                    <p>No results.</p>
                )
            }
        </>
    );
};

export default SearchComponent;