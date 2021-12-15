/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMF2TCOCHATROOM = /* GraphQL */ `
  subscription OnCreateMF2TCOCHATROOM(
    $room_id: Int
    $user_id: Int
    $phone: String
    $unread: Int
    $is_pin: Boolean
  ) {
    onCreateMF2TCOCHATROOM(
      room_id: $room_id
      user_id: $user_id
      phone: $phone
      unread: $unread
      is_pin: $is_pin
    ) {
      room_id
      user_id
      phone
      unread
      is_pin
      customer_id
      name
      channel
    }
  }
`;
export const onUpdateMF2TCOCHATROOM = /* GraphQL */ `
  subscription OnUpdateMF2TCOCHATROOM(
    $room_id: Int
    $user_id: Int
    $phone: String
    $unread: Int
    $is_pin: Boolean
  ) {
    onUpdateMF2TCOCHATROOM(
      room_id: $room_id
      user_id: $user_id
      phone: $phone
      unread: $unread
      is_pin: $is_pin
    ) {
      room_id
      user_id
      phone
      unread
      is_pin
      customer_id
      name
      channel
    }
  }
`;
export const onDeleteMF2TCOCHATROOM = /* GraphQL */ `
  subscription OnDeleteMF2TCOCHATROOM(
    $room_id: Int
    $user_id: Int
    $phone: String
    $unread: Int
    $is_pin: Boolean
  ) {
    onDeleteMF2TCOCHATROOM(
      room_id: $room_id
      user_id: $user_id
      phone: $phone
      unread: $unread
      is_pin: $is_pin
    ) {
      room_id
      user_id
      phone
      unread
      is_pin
      customer_id
      name
      channel
    }
  }
`;
export const onCreateMF2TCOMESSAGGE = /* GraphQL */ `
  subscription OnCreateMF2TCOMESSAGGE($room_id: Int, $timestamp: String) {
    onCreateMF2TCOMESSAGGE(room_id: $room_id, timestamp: $timestamp) {
      room_id
      timestamp
      sender
      receiver
      body
      is_media
      media_url
      from_me
    }
  }
`;
export const onUpdateMF2TCOMESSAGGE = /* GraphQL */ `
  subscription OnUpdateMF2TCOMESSAGGE($room_id: Int, $timestamp: String) {
    onUpdateMF2TCOMESSAGGE(room_id: $room_id, timestamp: $timestamp) {
      room_id
      timestamp
      sender
      receiver
      body
      is_media
      media_url
      from_me
    }
  }
`;
export const onDeleteMF2TCOMESSAGGE = /* GraphQL */ `
  subscription OnDeleteMF2TCOMESSAGGE($room_id: Int, $timestamp: String) {
    onDeleteMF2TCOMESSAGGE(room_id: $room_id, timestamp: $timestamp) {
      room_id
      timestamp
      sender
      receiver
      body
      is_media
      media_url
      from_me
    }
  }
`;
