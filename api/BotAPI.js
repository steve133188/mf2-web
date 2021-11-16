import * as api from "./APIAction"
import * as get_link from "./GetAPILink";
import * as post_link from "./PostAPILink";


export async function GetAllBots() {
    const responseBody = await api.GetAPIAction(get_link.GET_ALL_BOTS);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetBotById(id) {
    const responseBody = await api.GetAPIAction(get_link.GET_BOT_BY_ID, id);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddBot(bot) {
    const responseBody = await api.PostAPIAction(post_link.ADD_BOT, "POST", JSON.stringify(bot));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function UpdateBot(id, bot) {
    const responseBody = await api.PostAPIAction(post_link.UPDATE_BOT + id, "PUT", JSON.stringify(bot));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function DeleteBot(id) {
    const responseBody = await api.PostAPIAction(post_link.DELETE_BOT + id, "DELETE", "");
    if(responseBody.status ==200 && responseBody.success) {
        return true;
    } else {
        return false;
    }
}