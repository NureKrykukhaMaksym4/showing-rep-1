'use client'
import React, {useEffect, useState} from 'react';
import {ClassicDialog} from "@shared/dialogs/api";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

enum AuthFormTypes {
    SIGN_IN = 'sign_in',
    SIGN_UP = 'sign_up',
}

export enum AuthUser {
    CUSTOMER = 'Customer',
    SERVICE_PROVIDER = 'Service provider',
}

const AuthSection = () => {
    const [authForm, setAuthForm] = useState<any>(AuthFormTypes.SIGN_IN);

    return (
        authForm === AuthFormTypes.SIGN_IN
            ? <SignIn
                onHavingAccount={() => setAuthForm(AuthFormTypes.SIGN_UP)}
            />
            : <SignUp
                onHavingAccount={() => setAuthForm(AuthFormTypes.SIGN_IN)}
            />
    );
};

export default AuthSection;