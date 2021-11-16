import * as api from "./APIAction"
import * as get_link from "./GetAPILink";
import * as post_link from "./PostAPILink";


export async function GetAllFlowBuilders() {
    const responseBody = await api.GetAPIAction(get_link.GET_ALL_FLOW_BUILDER);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetFlowBuilderById(id) {
    const responseBody = await api.GetAPIAction(get_link.GET_FLOW_BUILDER_BY_ID, id);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddFlowBuilder(flow_builder) {
    const responseBody = await api.PostAPIAction(post_link.ADD_FLOW_BUILDER, "POST", JSON.stringify(flow_builder));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function UpdateFlowBuilder(id, flow_builder) {
    const responseBody = await api.PostAPIAction(post_link.UPDATE_FLOW_BUILDER + id, "PUT", JSON.stringify(flow_builder));
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function DeleteFlowBuilder(id) {
    const responseBody = await api.PostAPIAction(post_link.DELETE_FLOW_BUILDER + id, "DELETE", "");
    if(responseBody.status ==200) {
        return true;
    } else {
        return false;
    }
}