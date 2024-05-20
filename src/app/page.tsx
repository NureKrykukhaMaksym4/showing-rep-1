'use client';
import Search from './home/search/Search';
import CreateServiceModal from "./profile/CreateServiceModal";
import {useEffect, useState} from "react";

export default function Home() {
    return (
        <section style={{width:"100%", minHeight: '100vh', background: '#111113'}}>
            <Search/>
        </section>
    )
}
