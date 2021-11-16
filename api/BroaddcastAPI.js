import * as api from "./APIAction"
import * as get_link from "./GetAPILink";
import * as post_link from "./PostAPILink";


export async function GetAllBroadcast() {
    const responseBody = await api.GetAPIAction(get_link.GET_ALL_BROADCAST);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetBroadcastById(id) {
    const responseBody = await api.GetAPIAction(get_link.GET_BROADCAST_BY_ID, id);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddBroadcasts(broadcasts) {
    const responseBody = await api.PostAPIAction(post_link.ADD_BROADCAST, "POST", JSON.stringify(broadcasts));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function UpdateBroadcast(broadcast) {
    const responseBody = await api.PostAPIAction(post_link.UPDATE_BROADCAST, "PUT", JSON.stringify(broadcast));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function DeleteBroadcast(name) {
    const responseBody = await api.PostAPIAction(post_link.DELETE_BROADCAST + name, "DELETE", "");
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}