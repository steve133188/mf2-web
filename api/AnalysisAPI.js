import * as api from "./APIAction"
import * as get_link from "./GetAPILink";
import * as post_link from "./PostAPILink";


export async function GetAllAnalysis() {
    const responseBody = await api.GetAPIAction(get_link.GET_ALL_ANALYSIS);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}

export async function GetAnalysisById(id) {
    const responseBody = await api.GetAPIAction(get_link.GET_ANALYSIS_BY_ID, id);
    if(responseBody.status ==200) {
        return responseBody.payload;
    } else {
        return responseBody.errMsg;
    }
}