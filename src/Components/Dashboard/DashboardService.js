import BaseUrl from '../../Service/BaseUrl';
import axios from 'axios';

export const getDashboardObject =()=> {
  var loginUrl = BaseUrl.BaseUrl+"bcm-protocol/employee/healthstatus/dashboard/count";  
  return axios(loginUrl, {
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

// export const onAuthenticate = payload => {
//   var loginUrl = BaseUrl.BaseUrl+"bcm-protocol/user/login";
//   //   method: 'POST/GET',
//   return axios(loginUrl, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json', // whatever you want
//     },
//     data: payload,
//   })
//     .then(response => response.data)
//     .catch(error => {
//       throw error;
//     });
// };


// var loginUrl = BaseUrl.BaseUrl+"bcm-protocol/user/login";
// axios.post(loginUrl, requestData, {
// 	headers: {
// 		'Content-Type': 'application/json'
// 	}
// })
// .then(result => {        
// 	console.log(result);
// 	debugger;	
// })
// .catch(error => {
// 	if (error) {                    
// 	}
// });