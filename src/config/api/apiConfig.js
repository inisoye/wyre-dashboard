/* eslint-disable import/no-cycle */
import axios from 'axios';

import { logoutOnUnauthorized } from '../../helpers/authHelper';
import EnvData from '../EnvData';

export const instance = axios.create({
    baseURL: EnvData.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 200000,
});



const useConfig = async (config) => {
    const customConfig = config;
    if (localStorage.nibssPayJWToken) {
        customConfig.headers.Authorization = `Bearer ${localStorage.loggedWyreUser}`;
    }
    return customConfig;
};

const responseOk = (response) => response;

const responseError = async (error) => {
    logoutOnUnauthorized(error);
    return Promise.reject(error);
};

instance.interceptors.request.use(useConfig);
instance.interceptors.response.use(responseOk, responseError);

export const APIService = {
    get(endpoint, config = null) {
        return config ? instance.get(endpoint, config) : instance.get(endpoint);
    },

    post(endpoint, data) {
        return instance.post(endpoint, data);
    },

    patch(endpoint, data) {
        return instance.patch(endpoint, data);
    },

    delete(endpoint) {
        return instance.delete(endpoint);
    },

    put(endpoint, data) {
        return instance.put(endpoint, data);
    },
};
