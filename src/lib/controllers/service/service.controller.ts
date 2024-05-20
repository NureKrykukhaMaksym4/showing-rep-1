import $api from "lib/http";
import axios from "axios";
import RateDto from "./dto/rate.dto";
import OrderDto from "./dto/order.dto";
import CreateDto from "./dto/create.dto";
import AddGeolocationDto from "@controllers/service/dto/add-geolocation.dto";



export class ServiceController{
    static async rate({service_id, token, feedback, rating}: RateDto) {
        try{
            const response = await $api.post('api/service/rate',{
                service_id, token, rating
            })
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
    static async order({service_id, token,  message}: OrderDto) {
        try{
            const response = await $api.post('api/service/order',{
                service_id, token, message
            })
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

    static async create(createDto: CreateDto) {
        try{
            const response = await $api.post('api/service/create',createDto)
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

    static async getHistory(provider: string){
        try{
            const response = await $api.get(`api/get_history/${provider}`)
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

    static async deleteService({service_id, token}:{token:string,service_id:number}){
        try{
            const response = await $api.post(`api/service/delete`,{service_id, token})
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

    static async addGeolocation({token,service_id,latitude,longitude}:AddGeolocationDto){
        try{
            const response = await $api.post('api/add_geolocation', {token,service_id,latitude,longitude})
            return response
        }
        catch(e){
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