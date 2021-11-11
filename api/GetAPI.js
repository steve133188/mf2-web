import { getDataFromAPI } from "./ApiHelper";

export async function GetAPIAction(apiLink, param) {

    try {
        const apiResult = await getDataFromAPI(apiLink + (param == undefined ? "" : param));
        if (apiResult.status == 200) {
            const apiData = await apiResult.json();
            console.log('GetAPIAction apiData ', apiData);
            const errMsg = apiData[apiLink.type]["data"].length > 0 ? "" : "No data retrieved.";
            return {
                payload: apiData,
                errMsg: errMsg,
                status: apiResult.status
            };
        } else {
            if (apiResult.status == 401) {
                localStorage.setItem("token", "")
                localStorage.setItem("user", "")
                window.location.href = "/login";
            }

            return {
                errMsg: apiResult.statusText,
                status: apiResult.status
            };
        }
    } catch (error) {
        return {
            errMsg: error.message,
            status: 500
        };
    }
}