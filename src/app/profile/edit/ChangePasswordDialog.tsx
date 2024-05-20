'use client';

import React, {useState} from 'react';
import styles from '../styles/edit-profile-dialog.module.scss';
import {ClassicInput, ClassicTextArea} from "@shared/inputs/api";
import {ClassicButton} from "@shared/buttons/api";
import {ProviderController} from "../../../lib/controllers/provider/provider.controller";
import {AuthController} from "../../../lib/controllers/auth/auth.controller";

const EditProfileDialog = ({cancel}: {
    cancel: () => void,
}) => {
    const [newPassword, setNewPassword] = useState('');

    const apply = async () => {
        const token = window.localStorage.getItem('token');
        let user: any;
        if (token) {
            await AuthController.verify(token).then((res) => {
                user = res.user
            })
            await ProviderController.update({password: newPassword, email: user.email, token})
                .then((res) => console.log(res));
        }
        cancel();
    }
    return (
        <div className={styles.dialog}>
            <h1 className={styles.dialog__title}>Editing</h1>
            <div className={styles.dialog__block}>
                <ClassicInput
                    value={newPassword}
                    setValue={setNewPassword}
                >
                    New Password
                </ClassicInput>
            </div>
            <div className={styles.dialog__options}>
                <ClassicButton variant={'danger'} onClick={cancel}>Cancel</ClassicButton>
                <ClassicButton onClick={apply}>Apply</ClassicButton>
            </div>
        </div>
    );
};

export default EditProfileDialog;