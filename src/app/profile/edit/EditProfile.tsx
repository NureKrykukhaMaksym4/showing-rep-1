'use client'
import React, {useState} from 'react';
import {ClassicButton} from "@shared/buttons/api";
import EditProfileDialog from "./EditProfileDialog";
import {ClassicDialog} from "@shared/dialogs/api";
import ChangePasswordDialog from "./ChangePasswordDialog";

const EditProfile = ({first_name, last_name}: {
    first_name: string,
    last_name: string,
}) => {
    const [editForm, setEditForm] = useState('');
    const edit = () => {
        setEditForm('private-edit');
    }

    const changePassword = () => {
        setEditForm('password-edit');
    }

    const cancel = () => {
        setEditForm('');
    }


    return (
        <>
            <ClassicButton onClick={edit}>Edit profile</ClassicButton>
            <ClassicButton variant={'danger'} onClick={changePassword}>Change password</ClassicButton>
            {editForm === 'private-edit'
                ? <ClassicDialog>
                    <EditProfileDialog
                        cancel={cancel}
                        first_name={first_name}
                        last_name={last_name}
                    />
                </ClassicDialog>
                : editForm === 'password-edit' ? <ClassicDialog>
                    <ChangePasswordDialog
                        cancel={cancel}
                    />
                </ClassicDialog>
                    : null
            }
        </>
    );
};

export default EditProfile;