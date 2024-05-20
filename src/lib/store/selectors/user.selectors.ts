import {createSelector} from "@reduxjs/toolkit";

export const selectUsername = (state: { user: { username: any; }; }) => {
    return state.user.username;
}

export const selectUser = createSelector(
    (state) => state.user,
    (user) => user,
);