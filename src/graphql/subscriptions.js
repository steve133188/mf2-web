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
    }
  }
`;
// global notification
export const subscribeToNewMessage = /* GraphQL */ `
  subscription SubscribeToNewMessage($recipient: String!) {
    subscribeToNewMessage(recipient: $recipient) {
      room_id
      timestamp
      sender
      recipient
      body
      is_media
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
    }
  }
`;
// livechat notification
export const subscribeToChatroomUpdate = /* GraphQL */ `
  subscription SubscribeToChatroomUpdate($user_id: Int!) {
    subscribeToChatroomUpdate(user_id: $user_id) {
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
