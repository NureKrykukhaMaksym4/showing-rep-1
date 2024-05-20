import $api from "lib/http";
import SearchDto from "./dto/search.dto";
import axios from "axios";



export class SearchController{
    static async search(searchDto: SearchDto){
        try{
            const response = await $api.post('api/service/search',{
                ...searchDto,
                page_limit: 10000,
                page_offset: 0,
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

    static async getUsers(){
        try{
            const response = await $api.get('security/users')
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
}