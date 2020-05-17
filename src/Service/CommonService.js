import BaseUrl from './BaseUrl';
import axios from 'axios';

export const getScancount =()=> {
    var getScancountUrl = BaseUrl.BaseUrl+"bcm-protocol/employee/healthtracker/scancount";
    return axios(getScancountUrl, {
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