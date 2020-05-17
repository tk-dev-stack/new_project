import axios from 'axios';
import BaseUrl from './BaseUrl';

const post = (apiUrl,payload) => {
    var url = BaseUrl.BaseUrl + `bcm-protocol${apiUrl}`;
    return axios(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json', // whatever you want
        },
        data: payload,
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};


const getAll = (apiUrl) => {
    var url = BaseUrl.BaseUrl + `bcm-protocol${apiUrl}`;
    return axios(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json', // whatever you want
        }
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};


const saveFormData = (apiUrl , payload) =>{
    var url = BaseUrl.BaseUrl + `bcm-protocol${apiUrl}`;
    
    return axios(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: payload,
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}

export const GenericApiService ={
    post ,getAll ,saveFormData
}
