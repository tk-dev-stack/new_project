export class UrlConstants {
// News and Update Endpoits
    static saveNewsUrl  = '/BcmNotification/SaveNewsAndNotification';
    static getNewsListUrl  = '/BcmNotification/getAllNotification';
    static getNewsByIdUrl   = '/BcmNotification'; 
    

    // Employee Health Url EndPoints 

     static getDashbordPlantCountUrl = '/cleanlinessprotocol/dashboard/plant/taskstatus/count';
     static getAllPlantUrl =  '/cleanlinessprotocol/dashboard/plant/all';
     static getPlantTaskByIdUrl   = '/cleanlinessprotocol/dashboard/plant/tasklist/';
     static savePlantUrl = '/master/plant/save';

     static getAreasAndTaskUrl = '/master/areatask/combinedlist';
     static saveAssignTaskUrl = '/cleanlinessprotocol/plant/assigntask';
     static getplantAreaByIdUrl = '/cleanlinessprotocol/dashboard/plant/tasklist/';

     static getEmployeeHealthStatusUrl ='/employee/healthstatus';
} 