import React, {useState} from 'react';
import styles from "./styles/auth-form.module.scss";
import signUpStyles from "./styles/sign-up.module.scss";
import {ClassicInput, ClassicTextArea} from "@shared/inputs/api";
import {ClassicButton} from "@shared/buttons/api";
import {AuthUser} from "./AuthSection";
import {ClassicCalendar} from "@shared/calendars/api";
import {RadioGroup} from "@shared/selects/api";
import genders from "@assets/data/genders";
import {AuthController} from "../../../lib/controllers/auth/auth.controller";
import {useRouter} from "next/navigation";

type SignUpProps = {
    onHavingAccount: () => void;
}

type SignUpCustomer = {
    name: string;
    surname: string;
    sex: string;
    role: string;
    email: string;
    password: string;
    birthday: Date | null;
    avatar: string;
}

type SignUpProvider = {
    business_name: string;
    description: string;
    phone_number: string;
    city: string;
    work_time: string;
}


const SignUp = ({onHavingAccount}: SignUpProps) => {
    const router = useRouter();
    const [isSigningUpProvider, setIsSigningUpProvider] = useState(false);
    // {"email":"chad@nure.ua","password": "hello.world_123","first_name": "Hello","last_name": "World","birth_date": "2000-01-21","sex": "M","role":"U","profile_picture": "https://example.com/img.png"}
    const [customer, setCustomer] = useState<SignUpCustomer>({
        name: 'Hello',
        surname: 'World',
        sex: 'M',
        role: 'U',
        email: 'chad@nure.ua',
        password: 'hello.world_123',
        birthday: null,
        avatar: 'https://example.com/img.png'
    });

    const [provider, setProvider] = useState<SignUpProvider>({
        business_name: '',
        description: '',
        phone_number: '',
        city: '',
        work_time:  '',
    });
    const signUp = async () => {
        if (!customer.birthday) {
            return;
        }

        const date = customer.birthday?.getFullYear().toString() + '-' + (customer.birthday?.getMonth() + 1).toString() + '-' + customer.birthday?.getDate().toString();
        const res = isSigningUpProvider
            ? await AuthController.signUpProvider({
                sex: customer.sex,
                email: customer.email,
                role: customer.role,
                password: customer.password,
                first_name: customer.name,
                last_name: customer.surname,
                profile_picture: customer.avatar,
                birth_date: date,
                ...provider
            })
            : await AuthController.signUp({
            sex: customer.sex,
            email: customer.email,
            role: customer.role,
            password: customer.password,
            first_name: customer.name,
            last_name: customer.surname,
            profile_picture: customer.avatar,
            birth_date: date,
        });

        if (res.token) {
            window.localStorage.setItem('token', res.token);
            router.push('/');
        }
    }

    return (
        <div className={styles.form}>
            <div className={styles.form__inner}>
                <h2 className={styles.form__title}>Sign Up</h2>
                <button className={styles.form__btn}
                        onClick={() => setIsSigningUpProvider(prev => !prev)}
                >
                    {isSigningUpProvider
                        ? 'I want to register as customer'
                        : 'I want to register as provider'
                    }
                </button>
                <div className={styles.form__inputs}>
                    <div className={signUpStyles.signUp__block}>
                        <ClassicInput
                            value={customer.name}
                            setValue={(value) => setCustomer({...customer, name: value})}
                        >Name</ClassicInput>
                        <ClassicInput
                            value={customer.surname}
                            setValue={(value) => setCustomer({...customer, surname: value})}
                        >Surname</ClassicInput>
                    </div>
                    <div className={signUpStyles.signUp__block}>
                        <ClassicInput
                            value={customer.email}
                            setValue={(value) => setCustomer({...customer, email: value})}
                        >Email</ClassicInput>
                        <ClassicInput
                            value={customer.password}
                            setValue={(value) => setCustomer({...customer, password: value})}
                        >Password</ClassicInput>
                    </div>
                </div>
                <div className={signUpStyles.signUp__gender}>
                    <h4 className={signUpStyles.signUp__gender__title}>Your gender</h4>
                    <RadioGroup
                        items={genders}
                        setSelectedItem={(value) => setCustomer({...customer, sex: value})}
                        defaultValue={genders[0].value}
                    />
                </div>
                <ClassicCalendar
                    date={customer.birthday}
                    setDate={(date) => setCustomer({...customer, birthday: date})}
                >
                    Birthday &mdash;
                </ClassicCalendar>
                {isSigningUpProvider && <>
                        <div className={`${styles.form__inputs} mt-5`}>
                        <div className={signUpStyles.signUp__block}>
                            <ClassicInput
                                value={provider.business_name}
                                setValue={(value) => setProvider({...provider, business_name: value})}
                            >Business name</ClassicInput>
                            <ClassicInput
                                value={provider.phone_number}
                                setValue={(value) => setProvider({...provider, phone_number: value})}
                            >Phone</ClassicInput>
                        </div>
                        <div className={signUpStyles.signUp__block}>
                            <ClassicInput
                                value={provider.city}
                                setValue={(value) => setProvider({...provider, city: value})}
                            >City</ClassicInput>
                            <ClassicInput
                                value={provider.work_time}
                                setValue={(value) => setProvider({...provider, work_time: value})}
                            >Work time</ClassicInput>
                        </div>
                        <ClassicTextArea minHeight={200}
                                         value={provider.description}
                                         setValue={(value) => setProvider({...provider, description: value})}
                        >Description</ClassicTextArea>
                    </div>
                </>}
                <div className={styles.form__btns}>
                    <ClassicButton onClick={signUp}>Continue</ClassicButton>
                    <button className={styles.form__btn}
                            onClick={onHavingAccount}
                    >
                        I already have account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;