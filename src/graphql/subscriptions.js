/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const suballChatrooms = /* GraphQL */ `
  subscription SuballChatrooms {
    suballChatrooms {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      country_code
      unread
      user_id
      avatar
      last_msg_time
      bot_on
    }
  }
`;
export const subscribeChatroom = /* GraphQL */ `
  subscription SubscribeChatroom($room_id: String, $channel: String) {
    subscribeChatroom(room_id: $room_id, channel: $channel) {
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
      status
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
export const eventListenr = /* GraphQL */ `
  subscription EventListenr {
    eventListenr {
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
export const onCreateChatroom = /* GraphQL */ `
  subscription OnCreateChatroom(
    $channel: String
    $customer_id: Int
    $is_pin: Boolean
    $name: String
    $phone: String
  ) {
    onCreateChatroom(
      channel: $channel
      customer_id: $customer_id
      is_pin: $is_pin
      name: $name
      phone: $phone
    ) {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      country_code
      unread
      user_id
      avatar
      last_msg_time
      bot_on
    }
  }
`;
export const onUpdateChatroom = /* GraphQL */ `
  subscription OnUpdateChatroom(
    $channel: String
    $customer_id: Int
    $is_pin: Boolean
    $name: String
    $phone: String
  ) {
    onUpdateChatroom(
      channel: $channel
      customer_id: $customer_id
      is_pin: $is_pin
      name: $name
      phone: $phone
    ) {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      country_code
      unread
      user_id
      avatar
      last_msg_time
      bot_on
    }
  }
`;
export const onDeleteChatroom = /* GraphQL */ `
  subscription OnDeleteChatroom(
    $channel: String
    $customer_id: Int
    $is_pin: Boolean
    $name: String
    $phone: String
  ) {
    onDeleteChatroom(
      channel: $channel
      customer_id: $customer_id
      is_pin: $is_pin
      name: $name
      phone: $phone
    ) {
      channel
      customer_id
      is_pin
      name
      phone
      room_id
      country_code
      unread
      user_id
      avatar
      last_msg_time
      bot_on
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage(
    $room_id: String
    $timestamp: Int
    $sender: String
    $recipient: String
    $body: String
  ) {
    onCreateMessage(
      room_id: $room_id
      timestamp: $timestamp
      sender: $sender
      recipient: $recipient
      body: $body
    ) {
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
      status
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage(
    $room_id: String
    $timestamp: String
    $sender: String
    $recipient: String
    $body: String
  ) {
    onUpdateMessage(
      room_id: $room_id
      timestamp: $timestamp
      sender: $sender
      recipient: $recipient
      body: $body
    ) {
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
      status
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage(
    $room_id: String
    $timestamp: String
    $sender: String
    $recipient: String
    $body: String
  ) {
    onDeleteMessage(
      room_id: $room_id
      timestamp: $timestamp
      sender: $sender
      recipient: $recipient
      body: $body
    ) {
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
      status
    }
  }
`;
