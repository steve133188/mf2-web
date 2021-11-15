import * as api from "./APIAction"
import * as get_link from "./GetAPILink";
import * as post_link from "./PostAPILink";

export async function GetAllChatMessages() {
    const responseBody = await api.GetAPIAction(get_link.GET_CHAT_RECORDS);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetChatMessagesByCustomer(customer_name) {
    const responseBody = await api.GetAPIAction(get_link.GET_CHAT_RECORDS_BY_CUSTOMER, customer_name);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddMessage(message) {
    const responseBody = await api.PostAPIAction(post_link.ADD_MESSAGE, "POST", JSON.stringify(message));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddManyMessages(messages) {
    const responseBody = await api.PostAPIAction(post_link.ADD_MANY_MESSAGES, "POST", JSON.stringify(messages));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}