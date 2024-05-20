import $api from "lib/http";
import axios from "axios";
import {ProviderDto, UpdateProviderDto} from "./dto/provider.dto";



export class ProviderController{
    static async getProvider({provider_id}: ProviderDto){
        try {
            const response = await $api.post('security/get_provider',{provider_id})
            return response;
        } catch (e){
            console.log(e)
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }

    static async update(updateProviderDto: UpdateProviderDto) {
        try {
            const response = await $api.post('security/update', updateProviderDto)
            return response;
        } catch (e) {
            console.log(e)
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
}