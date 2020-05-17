import BaseUrl from '../../Service/BaseUrl';
import axios from 'axios';

export const getEmployeeCodeList =(SearchCode)=> {
  var getEmployeeCodeListUrl = BaseUrl.BaseUrl+"bcm-protocol/user/"+SearchCode;
  return axios(getEmployeeCodeListUrl, {
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
export const getUserDetails =(userId)=> {
    var getUserDetailsUrl = BaseUrl.BaseUrl+"bcm-protocol/user/getbyId/"+userId;
    return axios(getUserDetailsUrl, {
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
export const submitEntryHealthCheckDetails =(healthCheckUpData)=> {
    var healthCheckUpDataReqUrl = BaseUrl.BaseUrl+"bcm-protocol/employee/healthtracker/gate";
    return axios(healthCheckUpDataReqUrl, {
        method: 'POST',
            headers: {
            'content-type': 'application/json', // whatever you want
            },
            data: healthCheckUpData,
        })
        .then(response => response.data)
        .catch(error => {
        throw error;
    });
};
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

// onHandleSearch = async (term) => {
//     this.setState({isLoading: true});
//     const response = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=c055530078ac3b21b64e0bf8a0b3b9e1&language=en-US&page=1&include_adult=false', {
//         params: { query: term }
//     });

//     //Extract details from the search 
//     const searchResults = response.data.results.map((i) => ({
//         title: i.original_title,
//         id: i.id,
//       }));

//     this.setState({
//         isLoading: false,
//         options: searchResults
//     })     
// }

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