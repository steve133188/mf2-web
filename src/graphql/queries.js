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
export const getMF2TCOMESSAGGE = /* GraphQL */ `
  query GetMF2TCOMESSAGGE($room_id: Int!, $timestamp: String!) {
    getMF2TCOMESSAGGE(room_id: $room_id, timestamp: $timestamp) {
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
export const listMF2TCOMESSAGGES = /* GraphQL */ `
  query ListMF2TCOMESSAGGES(
    $filter: TableMF2TCOMESSAGGEFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMF2TCOMESSAGGES(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        room_id
        timestamp
        sender
        receiver
        body
        is_media
        media_url
        from_me
      }
      nextToken
    }
  }
`;
