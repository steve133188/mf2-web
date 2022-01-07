/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const subscribeToChatroom = /* GraphQL */ `
  subscription SubscribeToChatroom($room_id: Int!) {
    subscribeToChatroom(room_id: $room_id) {
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
    }
  }
`;
export const subscribeToNewMessage = /* GraphQL */ `
  subscription SubscribeToNewMessage($recipient: String!) {
    subscribeToNewMessage(recipient: $recipient) {
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
    }
  }
`;
export const subscribeToChatroomUpdate = /* GraphQL */ `
  subscription SubscribeToChatroomUpdate($user_id: Int!, $is_pin: Boolean) {
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
export const onCreateMF2ChannelInfo = /* GraphQL */ `
  subscription OnCreateMF2ChannelInfo(
    $channel_id: ID
    $user_id: Int
    $status: Int
    $qr_data: String
    $channel_name: String
  ) {
    onCreateMF2ChannelInfo(
      channel_id: $channel_id
      user_id: $user_id
      status: $status
      qr_data: $qr_data
      channel_name: $channel_name
    ) {
      channel_id
      user_id
      status
      qr_data
      channel_name
      url
      token
    }
  }
`;
export const onUpdateMF2ChannelInfo = /* GraphQL */ `
  subscription OnUpdateMF2ChannelInfo(
    $channel_id: ID
    $user_id: Int
    $status: Int
    $qr_data: String
    $channel_name: String
  ) {
    onUpdateMF2ChannelInfo(
      channel_id: $channel_id
      user_id: $user_id
      status: $status
      qr_data: $qr_data
      channel_name: $channel_name
    ) {
      channel_id
      user_id
      status
      qr_data
      channel_name
      url
      token
    }
  }
`;
export const onDeleteMF2ChannelInfo = /* GraphQL */ `
  subscription OnDeleteMF2ChannelInfo(
    $channel_id: ID
    $user_id: Int
    $status: Int
    $qr_data: String
    $channel_name: String
  ) {
    onDeleteMF2ChannelInfo(
      channel_id: $channel_id
      user_id: $user_id
      status: $status
      qr_data: $qr_data
      channel_name: $channel_name
    ) {
      channel_id
      user_id
      status
      qr_data
      channel_name
      url
      token
    }
  }
`;
export const onCreateWhatsapp_node = /* GraphQL */ `
  subscription OnCreateWhatsapp_node(
    $node_index: Int
    $whatsapp_id: String
    $node_name: String
    $status: String
    $init: Boolean
  ) {
    onCreateWhatsapp_node(
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
export const onDeleteWhatsapp_node = /* GraphQL */ `
  subscription OnDeleteWhatsapp_node(
    $node_index: Int
    $whatsapp_id: String
    $node_name: String
    $status: String
    $init: Boolean
  ) {
    onDeleteWhatsapp_node(
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
export const onCreateMF2TCOUSER = /* GraphQL */ `
  subscription OnCreateMF2TCOUSER($user_id: Int, $email: String) {
    onCreateMF2TCOUSER(user_id: $user_id, email: $email) {
      user_id
      email
      username
      password
      phone
    }
  }
`;
export const onUpdateMF2TCOUSER = /* GraphQL */ `
  subscription OnUpdateMF2TCOUSER($user_id: Int, $email: String) {
    onUpdateMF2TCOUSER(user_id: $user_id, email: $email) {
      user_id
      email
      username
      password
      phone
    }
  }
`;
export const onDeleteMF2TCOUSER = /* GraphQL */ `
  subscription OnDeleteMF2TCOUSER($user_id: Int, $email: String) {
    onDeleteMF2TCOUSER(user_id: $user_id, email: $email) {
      user_id
      email
      username
      password
      phone
    }
  }
`;
export const onCreateMF2TCOCUSTOMER = /* GraphQL */ `
  subscription OnCreateMF2TCOCUSTOMER($customer_id: Int) {
    onCreateMF2TCOCUSTOMER(customer_id: $customer_id) {
      customer_id
      address
      agents_id
      birthday
      channels
      country
      country_code
      created_at
      customer_name
      email
      first_name
      gender
      last_name
      phone
      tags_id
      team_id
    }
  }
`;
export const onUpdateMF2TCOCUSTOMER = /* GraphQL */ `
  subscription OnUpdateMF2TCOCUSTOMER($customer_id: Int) {
    onUpdateMF2TCOCUSTOMER(customer_id: $customer_id) {
      customer_id
      address
      agents_id
      birthday
      channels
      country
      country_code
      created_at
      customer_name
      email
      first_name
      gender
      last_name
      phone
      tags_id
      team_id
    }
  }
`;
export const onDeleteMF2TCOCUSTOMER = /* GraphQL */ `
  subscription OnDeleteMF2TCOCUSTOMER($customer_id: Int) {
    onDeleteMF2TCOCUSTOMER(customer_id: $customer_id) {
      customer_id
      address
      agents_id
      birthday
      channels
      country
      country_code
      created_at
      customer_name
      email
      first_name
      gender
      last_name
      phone
      tags_id
      team_id
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
export const onDeleteNotesTable = /* GraphQL */ `
  subscription OnDeleteNotesTable(
    $customer_id: Int
    $timestamp: String
    $message: String
    $user_id: Int
    $signed_name: String
  ) {
    onDeleteNotesTable(
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
export const onCreateMF2TCOTAG = /* GraphQL */ `
  subscription OnCreateMF2TCOTAG(
    $tag_id: Int
    $tag_name: String
    $create_at: Int
    $update_at: Int
  ) {
    onCreateMF2TCOTAG(
      tag_id: $tag_id
      tag_name: $tag_name
      create_at: $create_at
      update_at: $update_at
    ) {
      tag_id
      tag_name
      create_at
      update_at
    }
  }
`;
export const onUpdateMF2TCOTAG = /* GraphQL */ `
  subscription OnUpdateMF2TCOTAG(
    $tag_id: Int
    $tag_name: String
    $create_at: Int
    $update_at: Int
  ) {
    onUpdateMF2TCOTAG(
      tag_id: $tag_id
      tag_name: $tag_name
      create_at: $create_at
      update_at: $update_at
    ) {
      tag_id
      tag_name
      create_at
      update_at
    }
  }
`;
export const onDeleteMF2TCOTAG = /* GraphQL */ `
  subscription OnDeleteMF2TCOTAG(
    $tag_id: Int
    $tag_name: String
    $create_at: Int
    $update_at: Int
  ) {
    onDeleteMF2TCOTAG(
      tag_id: $tag_id
      tag_name: $tag_name
      create_at: $create_at
      update_at: $update_at
    ) {
      tag_id
      tag_name
      create_at
      update_at
    }
  }
`;
