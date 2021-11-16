import {
    apiUserHost,
    apiCustomerHost,
    apiChatHost,
    apiOrgHost,
    apiFlowBuilderHost,
    apiBotHost,
    apiBroadcastHost,
    apiLogHost
} from "../common/Config";

/* append all the API links here and call it by PostAPIAction */

/* User services */
export const CREATE_USER = apiUserHost;
export const FORGOT_PASSWORD = apiUserHost + "forgot-password";
export const UPDATE_DIV_TEAM = apiUserHost + "update-div-team";
export const REMOVE_USER_FROM_TEAM = apiUserHost + "remove-user-from-team";
export const CHANGE_USER_STATUS = apiUserHost + "status";
export const CHANGE_USER_ROLE = apiUserHost + "role";
export const UPDATE_USER = apiUserHost + "name";
export const DELETE_USER = apiUserHost + "name";
export const ADD_ROLE_TO_USER = apiUserHost + "role";
export const UPDATE_ROLE_FOR_USER = apiUserHost + "role";
export const UPDATE_ROLE_PERMISSIONS = apiUserHost + "roles";
export const REMOVE_USER_ROLE_BY_PHONE = apiUserHost + "role/"
export const DELETE_ROLE = apiUserHost + "roles/";   

/* Customers services */
export const GET_CUSTOMERS_BY_AGENT = apiCustomerHost + "filter/agent";
export const GET_CUSTOMERS_BY_TAGS = apiCustomerHost + "filter/tag";
export const GET_CUSTOMERS_BY_CHANNELS = apiCustomerHost + "filter/channel";
export const ADD_CUSTOMER = apiCustomerHost;
export const ADD_MANY_CUSTOMERS = apiCustomerHost + "addMany";
export const ADD_CUSTOMER_TAGS = apiCustomerHost + "add-tags";
export const UPDATE_CUSTOMER = apiCustomerHost + "id";
export const UPDATE_CUSTOMER_TAG = apiCustomerHost + "edit-tags";
export const REMOVE_CUSTOMER_TAG = apiCustomerHost + "del-customer-tag";
export const ADD_TEAM_TO_CUSTOMER = apiCustomerHost + "add-team-to-customer";
export const CHANGE_CUSTOMERS_TEAM_BY_ID = apiCustomerHost + "change-customers-team";
export const REMOVE_TEAM_FROM_CUSTOMERS = apiCustomerHost + "delete-customers-team/";
export const DELETE_CUSTOMERS = apiCustomerHost + "id";

/* Chat services */
export const ADD_MESSAGE = apiChatHost + "postOne";
export const ADD_MANY_MESSAGES = apiChatHost + "postMany";

/* Organization service */
export const CREATE_ORGANIZATION = apiOrgHost;
export const UPDATE_ORGANIZATION_NAME = apiOrgHost;

/* Flow builder services */
export const ADD_FLOW_BUILDER = apiFlowBuilderHost;
export const UPDATE_FLOW_BUILDER = apiFlowBuilderHost + "id/";
export const DELETE_FLOW_BUILDER = apiFlowBuilderHost + "id/";

/* Bot services */
export const ADD_BOT = apiBotHost;
export const UPDATE_BOT = apiBotHost + "id/";
export const DELETE_BOT = apiBotHost + "id/";

/* Broadcast services */
export const ADD_BROADCAST = apiBroadcastHost;
export const UPDATE_BROADCAST = apiBroadcastHost + "name";
export const DELETE_BROADCAST = apiBroadcastHost + "name/";

/* Log services */
export const ADD_USER_LOG = apiLogHost + "user";
export const ADD_CUSTOMER_LOG = apiLogHost + "customer";
export const ADD_SYSTEM_LOG = apiLogHost + "system";