import React, {useEffect, useState} from 'react';
import styles from './header.module.scss';
import Logo from "@shared/logos/main/Logo";
import Link from "next/link";
import Menu from "./menu/Menu";
import ProfileButton from "./menu/ProfileButton";
import {selectUsername} from "../../lib/store/selectors/user.selectors";
import {useSelector} from "react-redux";
import {AuthController} from "../../lib/controllers/auth/auth.controller";

const Header = () => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            AuthController.verify(token)
                .then(res => {
                    if (res.error) {
                    } else {
                        setUsername(res.user.first_name + ' ' + res.user.last_name);
                    }
                })
        }
    })

    return (
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <Logo/>
            </div>
            <nav className={styles.header__navbar}>
                <li className={styles.header__navbar_item}><Link href={'/'}>Home</Link></li>
            </nav>
            <div className={styles.header__profile_wrapper}>
                <Menu username={username}/>
            </div>
        </header>
    );
};

export default Header;