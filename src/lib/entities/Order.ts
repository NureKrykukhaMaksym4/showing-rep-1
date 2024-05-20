import {Service} from "./Service";

export interface Order {
    email:string,
    service: Service,
    message:string,
    created_at:string,

}