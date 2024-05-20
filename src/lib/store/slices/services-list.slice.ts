import {Service} from "../../entities/Task";
import {createSlice} from '@reduxjs/toolkit';

export type ServicesList = {
    page: number,
    limit: number,
    offset: number,
    services: Service[]
}

const initialState: ServicesList = {
    page: 0,
    limit: 10,
    offset: 0,
    services: [],
}
const servicesListSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setServices(state, action: {payload: Service[]}) {
            const services = action.payload;

            state.services = services;
        },
        setPage(state, action: {payload: number}) {
            const page = action.payload;

            state.page = page;
            state.offset = page * state.limit;
        }
    }
});

export const {setServices, setPage} = servicesListSlice.actions;
export default servicesListSlice.reducer;