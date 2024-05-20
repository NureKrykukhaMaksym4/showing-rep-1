import $api, {API_URL} from "../../http";
import SignInDto from "./dto/sign-in.dto";
import axios, {AxiosError} from "axios";
import {SignUpDto, SignUpProviderDto} from "./dto/sign-up.dto";

export class AuthController {
    static async signIn({email, password}: SignInDto) {
        try {
            const response = await $api.post('security/login',{
                email,
                password,
            });

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error ?? e?.response?.data?._description ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
    static async signUp(signUpDto: SignUpDto) {
        try {
            const response = await $api.post('security/register', signUpDto);
            console.log(response);
            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.invalid_fields ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
    static async signUpProvider(signUpDto: SignUpProviderDto) {
        try {
            await AuthController.signUp({
                email: signUpDto.email,
                sex: signUpDto.sex,
                birth_date: signUpDto.birth_date,
                role: signUpDto.role,
                last_name: signUpDto.last_name,
                profile_picture: signUpDto.profile_picture,
                first_name: signUpDto.first_name,
                password: signUpDto.password
            })
            const response = await $api.post('security/register_provider', {
                business_name: signUpDto.business_name,
                description: signUpDto.description,
                phone_number: signUpDto.phone_number,
                city: signUpDto.city,
                work_time: signUpDto.work_time,
                email: signUpDto.email
            });

            console.log(response);
            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.invalid_fields ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
    static async logout() {
        window.localStorage.removeItem('token');
    }

    static async verify(token: string) {
        try {
            const signInResponse = await $api.post('security/authenticate', {
                token
            });
            if (signInResponse.data.error) {
                return {
                    error: signInResponse.data.error
                };
            } else {
                return signInResponse.data;
            }
        } catch (e: any) {
            console.log(e);
            return {
                error: e?.response?.data?.error ?? e?.response?.data?._description ?? 'Internal server error. Try again!',
            }
        }
    }

    static async ban({token, email}: any) {
        try {
            const response = await $api.post('security/ban', {
                token,
                email,
                reason: 'Violation of service rules'
            });
            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.invalid_fields ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }

    static async unban({token, email}: any) {
        try {
            const response = await $api.post('security/unban', {
                token,
                email,
                reason: 'Violation of service rules'
            });
            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.invalid_fields ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
}