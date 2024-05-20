'use client';
import React, {useEffect, useState} from 'react';
import {ClassicInput} from "@shared/inputs/api";
import {SearchController} from "../../lib/controllers/search/search.controller";
import {User} from "../../lib/entities/User";
import {ClassicButton} from "@shared/buttons/api";
import {AuthController} from "../../lib/controllers/auth/auth.controller";
import {CircularProgress} from "@mui/material";
import {useRouter} from "next/navigation";
import {setUser} from "../../lib/store/slices/user.slice";

const Page = () => {
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([] as User[]);
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            AuthController.verify(token)
                .then(res => {

                    if (res.error || !res.user.is_admin) {
                        router.push('/');
                    } else {
                        SearchController.getUsers()
                            .then((res: any) => {
                                if (!res.error) {
                                    console.log(res);
                                    setUsers(res.data);
                                }
                                setIsLoading(false)
                            })
                    }
                })
        }
    }, []);
    const banUser = async (user: User) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const result = await AuthController.ban({token, email: user.email})
            if (!result.error) {
                setUsers(users => users.map(oldUser => oldUser.email === user.email ? {...user, is_banned: true} : oldUser))
            }
        }
    }

    const unbanUser = async (user: User) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const result = await AuthController.unban({token, email: user.email})
            if (!result.error) {
                setUsers(users => users.map(oldUser => oldUser.email === user.email ? {...user, is_banned: false} : oldUser))
            }
        }
    }

    if (isLoading) {
        return <div className={'flex w-full justify-center'}>
            <CircularProgress />
        </div>
    }
    return (
        <div className={'min-h-screen bg-[#111113] w-full flex flex-col items-center mb-10'}>
            <h1 className={'text-3xl font-bold mt-10'}>Users</h1>
            {/*<div className={'bg-inherit my-10'}>
                <ClassicInput
                    value={email}
                    setValue={setEmail}
                >Email</ClassicInput>
            </div>*/}
            <div className={'space-y-5 mt-10'}>
                {users.length > 0 && users.filter((user: User) => user.email !== 'admin@gmail.com')
                    .map((user: User, ind) =>
                    <div key={ind}
                         className={'flex items-center justify-center w-fit'}
                    >
                        <div className={'w-full min-w-[300px]'}>
                            <p>{user.first_name} {user.last_name}</p>
                            <p>{user.email}</p>
                        </div>
                        {user.is_banned
                            ? <div className={'w-full min-w-[100px]'}>
                                <p className={'text-red-700 ml-3 text-center'}>Banned</p>
                            </div>
                            : <div className={'w-full min-w-[100px]'}>
                                <p className={'text-green-700 ml-3 text-center'}>OK</p>
                            </div>
                        }
                        {user.is_banned
                            ?  <div className={'w-fit ml-10'}>
                                <ClassicButton onClick={() => unbanUser(user)}>Unban</ClassicButton>
                            </div>
                            :  <div className={'w-fit ml-10'}>
                                <ClassicButton onClick={() => banUser(user)}>Ban</ClassicButton>
                            </div>
                        }

                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;