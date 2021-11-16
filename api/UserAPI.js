import * as api from "./APIAction"
import * as get_link from "./GetAPILink";
import * as post_link from "./PostAPILink";

export async function GetUsersByTeam(team) {
    const responseBody = await api.GetAPIAction(get_link.GET_USERS_BY_TEAM, team);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetUserByEmail(email) {
    const responseBody = await api.GetAPIAction(get_link.GET_USER_BY_EMAIL, email);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetUsersList() {
    const responseBody = await api.GetAPIAction(get_link.GET_USER_LIST);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetTeamList() {
    const responseBody = await api.GetAPIAction(get_link.GET_TEAM_LIST);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function CreateUser(user) {
    const responseBody = await api.PostAPIAction(post_link.CREATE_USER, "POST", JSON.stringify(user));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function ForgotPassword(login) {
    const responseBody = await api.PostAPIAction(post_link.FORGOT_PASSWORD, "PUT", JSON.stringify(login));
    if(responseBody.status ==200) {
        return true;
    } else {
        return false;
    }
}

export async function UpdateDivTeam(divInfo) {
    const responseBody = await api.PostAPIAction(post_link.UPDATE_DIV_TEAM, "PUT", JSON.stringify(divInfo));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function RemoveUserFromTeam(user) {
    const responseBody = await api.PostAPIAction(post_link.REMOVE_USER_FROM_TEAM, "PUT", JSON.stringify(user));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function ChangeUserStatus(user) {
    const responseBody = await api.PostAPIAction(post_link.CHANGE_USER_STATUS, "PUT", JSON.stringify(user));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function ChangeUserRole(user) {
    const responseBody = await api.PostAPIAction(post_link.CHANGE_USER_ROLE, "PUT", JSON.stringify(user));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function UpdateUser(user) {
    const responseBody = await api.PostAPIAction(post_link.UPDATE_USER, "PUT", JSON.stringify(user));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function DeleteUserByName(user) {
    const responseBody = await api.PostAPIAction(post_link.DELETE_USER, "DELETE", JSON.stringify(user));
    if(responseBody.status ==200) {
        return true;
    } else {
        return false;
    }
}

export async function GetRoleList() {
    const responseBody = await api.GetAPIAction(get_link.GET_ROLE_LIST);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetRoleByName(name) {
    const responseBody = await api.GetAPIAction(get_link.GET_ROLE_BY_NAME, name);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddRoleToUser(user_role) {
    const responseBody = await api.PostAPIAction(post_link.ADD_ROLE_TO_USER, "POST", JSON.stringify(user_role));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function UpdateRoleForUser(user_role) {
    const responseBody = await api.PostAPIAction(post_link.UPDATE_ROLE_FOR_USER, "PUT", JSON.stringify(user_role));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function UpdateRolePermissions(role) {
    const responseBody = await api.PostAPIAction(post_link.UPDATE_ROLE_PERMISSIONS, "PUT", JSON.stringify(role));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetUsersByRole(role_name) {
    const responseBody = await api.GetAPIAction(get_link.GET_USERS_BY_ROLE, role_name);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetUserPermissionByPhone(phone_num) {
    const responseBody = await api.GetAPIAction(get_link.GET_USER_PERMISSION_BY_PHONE, phone_num);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetUserNumByRole(role_name) {
    const responseBody = await api.GetAPIAction(get_link.GET_USER_NUM_BY_ROLE, role_name);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function RemoveUserRoleByPhone(phone, role) {
    const responseBody = await api.PostAPIAction(post_link.REMOVE_USER_ROLE_BY_PHONE + phone, "PUT", JSON.stringify(role));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;;
    }
}
export async function DeleteRole(role_name) {
    const responseBody = await api.PostAPIAction(post_link.DELETE_ROLE + role_name, "PUT", "");
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}