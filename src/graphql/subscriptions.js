/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const subscribeToChatroom = /* GraphQL */ `
  subscription SubscribeToChatroom($room_id: Int, $channel: String) {
    subscribeToChatroom(room_id: $room_id, channel: $channel) {
      room_id
      timestamp
      sender
      recipient
      body
      is_media
      channel
      link
      media_url
      from_me
      message_type
      message_id
      hasQuotedMsg
      quote
      is_forwarded
      v_card
      read
      sign_name
      status
    }
  }
`;
export const subscribeToChatroomUpdate = /* GraphQL */ `
  subscription SubscribeToChatroomUpdate($user_id: Int, $is_pin: Boolean) {
    subscribeToChatroomUpdate(user_id: $user_id, is_pin: $is_pin) {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      unread
      user_id
      avatar
    }
  }
`;
export const subscribeToNewChatroom = /* GraphQL */ `
  subscription SubscribeToNewChatroom($user_id: Int) {
    subscribeToNewChatroom(user_id: $user_id) {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      unread
      user_id
      avatar
    }
  }
`;
export const multipleSubscribe = /* GraphQL */ `
  subscription MultipleSubscribe($unread: Int) {
    multipleSubscribe(unread: $unread) {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      unread
      user_id
      avatar
    }
  }
`;
export const allChatSubscribe = /* GraphQL */ `
  subscription AllChatSubscribe {
    AllChatSubscribe {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      unread
      user_id
      avatar
    }
  }
`;
export const onUpdateWhatsapp_node = /* GraphQL */ `
  subscription OnUpdateWhatsapp_node(
    $node_index: Int
    $whatsapp_id: String
    $node_name: String
    $status: String
    $init: Boolean
  ) {
    onUpdateWhatsapp_node(
      node_index: $node_index
      whatsapp_id: $whatsapp_id
      node_name: $node_name
      status: $status
      init: $init
    ) {
      node_index
      user_id
      whatsapp_id
      node_name
      status
      init
      channel_id
    }
  }
`;
export const onCreateNotesTable = /* GraphQL */ `
  subscription OnCreateNotesTable(
    $customer_id: Int
    $timestamp: String
    $message: String
    $user_id: Int
    $signed_name: String
  ) {
    onCreateNotesTable(
      customer_id: $customer_id
      timestamp: $timestamp
      message: $message
      user_id: $user_id
      signed_name: $signed_name
    ) {
      customer_id
      timestamp
      message
      user_id
      signed_name
    }
  }
`;
export const onUpdateNotesTable = /* GraphQL */ `
  subscription OnUpdateNotesTable(
    $customer_id: Int
    $timestamp: String
    $message: String
    $user_id: Int
    $signed_name: String
  ) {
    onUpdateNotesTable(
      customer_id: $customer_id
      timestamp: $timestamp
      message: $message
      user_id: $user_id
      signed_name: $signed_name
    ) {
      customer_id
      timestamp
      message
      user_id
      signed_name
    }
  }
`;
export const onCreateActivity = /* GraphQL */ `
  subscription OnCreateActivity(
    $timestamp: String
    $payload: String
    $action: String
    $type: String
    $user_id: Int
  ) {
    onCreateActivity(
      timestamp: $timestamp
      payload: $payload
      action: $action
      type: $type
      user_id: $user_id
    ) {
      timestamp
      payload
      action
      type
      user_id
      customer_id
      status
      is_sys
      team_id
    }
  }
`;
export const onUpdateActivity = /* GraphQL */ `
  subscription OnUpdateActivity(
    $timestamp: String
    $payload: String
    $action: String
    $type: String
    $user_id: Int
  ) {
    onUpdateActivity(
      timestamp: $timestamp
      payload: $payload
      action: $action
      type: $type
      user_id: $user_id
    ) {
      timestamp
      payload
      action
      type
      user_id
      customer_id
      status
      is_sys
      team_id
    }
  }
`;
