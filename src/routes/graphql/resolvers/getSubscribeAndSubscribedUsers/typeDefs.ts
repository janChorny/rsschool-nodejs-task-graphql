export const getSubscribeAndSubscribedUsersTypeDefs = `
    type Query {
      getSubscribeAndSubscribedUsers: [UserSubscriptions]!     
    }   

    type UserSubscriptions {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [String]!
      subscribedToUser: [UserSubscriptions]
    }
    `;

// userSubscribedTo: [UserSubscriptions]
