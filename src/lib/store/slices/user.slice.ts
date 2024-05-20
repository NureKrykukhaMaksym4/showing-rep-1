import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username: '',
    role: '',
    email: '',
    name: '',
    surname: ''
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const user = action.payload;
            if (!user) {
                state.name = '';
                state.surname = '';
                state.username = '';
                state.email = '';
                state.role = '';
                return;
            }
            state.name = user.name;
            state.surname = user.surname;
            state.username = user.username;
            state.email = user.email;
            state.role = user.role;
        },
        clearUser(state: any) {
            state.name = '';
            state.surname = '';
            state.username = '';
            state.email = '';
            state.role = '';
        }
    }
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;