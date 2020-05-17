import BaseUrl from '../../Service/BaseUrl';
import axios from 'axios';

export const empHistoryRecord=(empId)=> {
  var empHistoryRecordUrl = BaseUrl.BaseUrl+"bcm-protocol/employee/heathrecord/showdetail/"+empId;  
  return axios(empHistoryRecordUrl, {
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

export const empHealthDirectoryList=(mappingUrl)=> {
  var empHealthDirectoryListUrl = BaseUrl.BaseUrl+"bcm-protocol/employee/healthstatus/range/?"+mappingUrl;  
  return axios(empHealthDirectoryListUrl, {
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