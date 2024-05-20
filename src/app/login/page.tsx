'use client';

import React, {FormEvent, useCallback, useState} from 'react';
import styles from './styles/login.module.scss'
import {useRouter} from "next/navigation";
import {ClassicInput} from "@shared/inputs/api";
import {ValidationError} from "@shared/errors/api";
import ClassicButton from "@shared/buttons/classic/ClassicButton";
import {AuthController} from "../../lib/controllers/auth/auth.controller";
import AuthSection, {AuthUser} from "../home/auth/AuthSection";

const Page = () => {
    return (
        <div className={'w-full flex justify-center py-20'}>
            <AuthSection/>
        </div>
    );
};

export default Page;