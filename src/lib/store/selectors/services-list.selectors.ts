import {ServicesList} from "../slices/services-list.slice";
import {createSelector} from "reselect";

interface RootState {
    servicesList: ServicesList
}
export const selectCountPages = (countUsers: number) => (state: RootState) => {
    return Math.ceil(countUsers / state.servicesList.limit);
}

export const selectPage = (state: RootState) => {
    return state.servicesList.page;
}

export const selectTasks = (state: RootState) => {
    return state.servicesList.services;
}

const selectList = (state: RootState) => {
    return state.servicesList;
}
export const selectRestrictions = createSelector([selectList], (servicesList) => {
    return {
            offset: servicesList.offset,
            limit: servicesList.limit
    };
});