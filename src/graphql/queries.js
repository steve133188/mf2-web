/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMF2TCOCHATROOM = /* GraphQL */ `
  query GetMF2TCOCHATROOM($room_id: Int!, $user_id: Int!) {
    getMF2TCOCHATROOM(room_id: $room_id, user_id: $user_id) {
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
export const listMF2TCOCHATROOMS = /* GraphQL */ `
  query ListMF2TCOCHATROOMS(
    $filter: TableMF2TCOCHATROOMFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMF2TCOCHATROOMS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        room_id
        user_id
        phone
        unread
        is_pin
        customer_id
        name
        channel
      }
      nextToken
    }
  }
`;
