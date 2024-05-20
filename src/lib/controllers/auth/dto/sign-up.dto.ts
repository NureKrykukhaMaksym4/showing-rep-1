
export interface SignUpDto {
    first_name: string,
    last_name: string,
    sex: string,
    role: string,
    email: string,
    password: string,
    profile_picture: string,
    birth_date: string,
}

export interface SignUpProviderDto extends SignUpDto{
    "business_name": string,
    "description": string,
    "phone_number": string,
    "city": string,
    "work_time": string
}

