
    const baseApiUrl = 'https://adminapi.youcandoo.co.kr/v3/';
    export const api = {
        categoryList : baseApiUrl + 'category/list',
    }

    const fileUploadBaseUrl = 'https://fileuploader.youcandoo.co.kr/file/upload/';
    export const fileApi = {
        single : fileUploadBaseUrl+'single'
        ,event : fileUploadBaseUrl+'event'
        ,doit : fileUploadBaseUrl+'doit'
        ,promotion : fileUploadBaseUrl+'promotion'
    }