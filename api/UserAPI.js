import * as api from "./APIAction"
import * as get_link from "./GetAPILink";
import * as post_link from "./PostAPILink";

export async function GetUsersByTeam(team, division) {
    const responseBody = await api.GetAPIAction(get_link.GET_USERS_BY_TEAM, "?team=" + team + "&division=" + division);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetUserByUserName(username) {
    const responseBody = await api.GetAPIAction(get_link.GET_USER_BY_USERNAME, "?username=" + username);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}



