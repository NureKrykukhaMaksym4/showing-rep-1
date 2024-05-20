import $api from "lib/http";
import axios from "axios";
import CategoryDto from "./dto/category.dto";



export class CategoryController{
    static async getCategories(){
        try{
            const response = await $api.get('api/enum/categories')
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