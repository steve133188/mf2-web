import {
    apiUserHost,
    apiCustomerHost
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
export const ADD_ROLE = apiUserHost + "roles";
export const UPDATE_ROLE = apiUserHost + "roles";

/* Customers services */
export const GET_CUSTOMERS_BY_AGENT = apiCustomerHost + "filter/agent";
export const GET_CUSTOMERS_BY_TAGS = apiCustomerHost + "filter/tag";
export const GET_CUSTOMERS_BY_CHANNELS = apiCustomerHost + "filter/channel";
export const ADD_CUSTOMER = apiCustomerHost;
export const ADD_MANY_CUSTOMERS = apiCustomerHost + "addMany";
export const ADD_CUSTOMER_TAGS = apiCustomerHost + "add-tags";
export const UPDATE_CUSTOMER = apiCustomerHost + "id/";
export const UPDATE_CUSTOMER_TAG = apiCustomerHost + "edit-tags";
export const REMOVE_CUSTOMER_TAG = apiCustomerHost + "del-customer-tag";
export const ADD_TEAM_TO_CUSTOMER = apiCustomerHost + "add-team-to-customer";
export const CHANGE_CUSTOMERS_TEAM_BY_ID = apiCustomerHost + "change-customers-team";
export const REMOVE_TEAM_FROM_CUSTOMERS = apiCustomerHost + "delete-customers-team/";
export const DELETE_CUSTOMERS = apiCustomerHost + "id";