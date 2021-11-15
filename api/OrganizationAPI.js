import * as api from "./APIAction"
import * as get_link from "./GetAPILink";
import * as post_link from "./PostAPILink";

export async function GetAllOrganizationsFromRoot() {
    const responseBody = await api.GetAPIAction(get_link.GET_CGET_ALL_ORGANIZATIONS_FROM_ROOT);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetChildOrganizationsFromParent(org_id) {
    const responseBody = await api.GetAPIAction(get_link.GET_CHILD_ORGANIZATIONS_FROM_PARENT, org_id);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function CreateOrganization(org_info) {
    const responseBody = await api.PostAPIAction(post_link.CREATE_ORGANIZATION, "POST", JSON.stringify(org_info));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function UpdateOrganizationName(org_info) {
    const responseBody = await api.PostAPIAction(post_link.UPDATE_ORGANIZATION_NAME, "POST", JSON.stringify(org_info));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}