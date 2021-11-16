import * as api from "./APIAction"
import * as get_link from "./GetAPILink";
import * as post_link from "./PostAPILink";

export async function GetCustomers() {
    const responseBody = await api.GetAPIAction(get_link.GET_CUSTOMERS);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetCustomerById(id) {
    const responseBody = await api.GetAPIAction(get_link.GET_CUSTOMERS, id);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetCustomerByName(name) {
    const responseBody = await api.GetAPIAction(get_link.GET_CUSTOMERS, name);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetCustomersByAgent(agents) {
    const responseBody = await api.PostAPIAction(post_link.GET_CUSTOMERS_BY_AGENT, "POST", JSON.stringify(agents));
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetCustomersByTags(tags) {
    const responseBody = await api.PostAPIAction(post_link.GET_CUSTOMERS_BY_TAGS, "POST", JSON.stringify(tags));
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetCustomersByChannels(channels) {
    const responseBody = await api.PostAPIAction(post_link.GET_CUSTOMERS_BY_CHANNELS, "POST", JSON.stringify(channels));
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetCustomersByTeamId(team_id) {
    const responseBody = await api.GetAPIAction(get_link.GET_CUSTOMERS_BY_TEAM_ID, team_id);
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddCustomer(customer) {
    const responseBody = await api.PostAPIAction(post_link.ADD_CUSTOMER, "POST", JSON.stringify(customer));
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddCustomerTags(tags) {
    const responseBody = await api.PostAPIAction(post_link.ADD_CUSTOMER, "POST", JSON.stringify(customer));
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function UpdateCustomerInfo(customer) {
    const responseBody = await api.PostAPIAction(post_link.UPDATE_CUSTOMER, "PUT", JSON.stringify(customer));
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function UpdateCustomerTags(tags) {
    const responseBody = await api.PostAPIAction(post_link.UPDATE_CUSTOMER_TAG, "PUT", JSON.stringify(tags));
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function RemoveCustomerTags(tags) {
    const responseBody = await api.PostAPIAction(post_link.REMOVE_CUSTOMER_TAG, "PUT", JSON.stringify(tags));
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function AddTeamToCustomer(team_info) {
    const responseBody = await api.PostAPIAction(post_link.ADD_TEAM_TO_CUSTOMER, "PUT", JSON.stringify(team_info));
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function ChangeCustomersTeamByTeamId(team_ids) {
    const responseBody = await api.PostAPIAction(post_link.CHANGE_CUSTOMERS_TEAM_BY_ID, "PUT", JSON.stringify(team_ids));
    if(responseBody.status ==200) {
        return responseBody.payload.data;
    } else {
        return responseBody.errMsg;
    }
}

export async function RemoveTeamFromCustomers(team_id) {
    const responseBody = await api.PostAPIAction(post_link.REMOVE_TEAM_FROM_CUSTOMERS + team_id, "PUT", "");
    if(responseBody.status ==200 && responseBody.success) {
        return true;
    } else {
        return false;
    }
}

export async function DeleteCustomers(customer_ids) {
    const responseBody = await api.PostAPIAction(post_link.DELETE_CUSTOMERS, "DELETE", customer_ids);
    if(responseBody.status ==200 && responseBody.success) {
        return true;
    } else {
        return false;
    }
}