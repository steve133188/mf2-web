import * as api from "./APIAction"
import * as get_link from "./GetAPILink";
import * as post_link from "./PostAPILink";


export async function GetCustomerLogsByCustomerName(name) {
    const responseBody = await api.GetAPIAction(get_link.GET_CUSTOMER_LOG_BY_CUSTOMER_NAME, name);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddUserLog(log) {
    const responseBody = await api.PostAPIAction(post_link.ADD_USER_LOG, "POST", JSON.stringify(log));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddCustomerLog(log) {
    const responseBody = await api.PostAPIAction(post_link.ADD_CUSTOMER_LOG, "POST", JSON.stringify(log));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddSystemLog(log) {
    const responseBody = await api.PostAPIAction(post_link.ADD_SYSTEM_LOG, "POST", JSON.stringify(log));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}