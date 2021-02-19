
    const baseApiUrl = 'https://adminapi.youcandoo.co.kr/v3/';
    export const api = {
        categoryList : baseApiUrl + 'category/list',
        createCategory : baseApiUrl + 'category/create',
        detailCategory : baseApiUrl + 'category/detail',
        reorderCategory : baseApiUrl + 'category/update/sequence',
        deleteCategory : baseApiUrl + 'category/delete',

        subCategoryList : baseApiUrl + 'subcategory/list',
        createSubCategory : baseApiUrl + 'subcategory/create',
    }

    const fileUploadBaseUrl = 'https://fileuploader.youcandoo.co.kr/file/upload/';
    export const fileApi = {
        single : fileUploadBaseUrl+'single'
        ,event : fileUploadBaseUrl+'event'
        ,doit : fileUploadBaseUrl+'doit'
        ,promotion : fileUploadBaseUrl+'promotion'
    }