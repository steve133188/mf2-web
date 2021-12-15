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
