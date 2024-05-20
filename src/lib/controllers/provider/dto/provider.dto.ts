export type ProviderDto = {
    provider_id: number;
}

export type UpdateProviderDto = {
    email: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    token: string;
}

