import {
    apiCustomerHost, 
    apiUserHost,
    apiChatHost,
    apiOrgHost,
    apiBotHost,
    apiAnalysisHost,
    apiBroadcastHost,
    apiLogHost
} from "../common/Config";

/* append all the API links here and call it by GetAPIAction */

/* User service */
export const GET_USER_BY_EMAIL = apiUserHost + "email/";
export const GET_USERS_BY_TEAM = apiUserHost + "team/";
export const GET_USER_BY_PHONE = apiUserHost + "phone/";
export const GET_USER_LIST = apiUserHost + "userlist";
export const GET_TEAM_LIST = apiUserHost + "teamlist";
export const GET_ROLE_LIST = apiUserHost + "roles/list";
export const GET_ROLE_BY_NAME = apiUserHost + "roles/name/";

/* Cusrtomers service */
export const GET_CUSTOMERS = apiCustomerHost;
export const GET_CUSTOMER_BY_ID = apiCustomerHost + "id/";
export const GET_CUSTOMER_BY_NAME = apiCustomerHost + "name/";
export const GET_CUSTOMERS_BY_TEAM_ID = apiCustomerHost + "team/"

/* Chat services */
export const GET_CHAT_RECORDS = apiChatHost;
export const GET_CHAT_RECORDS_BY_CUSTOMER = apiChatHost + "customer/";

/* Organization services */
export const GET_ALL_ORGANIZATIONS_FROM_ROOT = apiOrgHost + "root";
export const GET_CHILD_ORGANIZATIONS_FROM_PARENT = apiOrgHost + "parent/";

/* Flow builder services */
export const GET_ALL_FLOW_BUILDER = apiOrgHost;
export const GET_FLOW_BUILDER_BY_ID = apiOrgHost + "id/";

/* Bot services */
export const GET_ALL_BOTS = apiBotHost;
export const GET_BOT_BY_ID = apiBotHost + "id/";

/* Broadcast services */
export const GET_ALL_BROADCAST = apiBroadcastHost;
export const GET_BROADCAST_BY_ID = apiBroadcastHost + "id/";

/* Analysis services */
export const GET_ALL_ANALYSIS = apiAnalysisHost;
export const GET_ANALYSIS_BY_ID = apiAnalysisHost + "id/";

/* Log services */
export const GET_CUSTOMER_LOGS_BY_CUSTOMER_NAME = apiLogHost + "customer/name/";