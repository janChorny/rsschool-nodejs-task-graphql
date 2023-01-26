export const getSubscribedUsersProfileTypeDefs = `
    type Query {
      getSubscribedUsersProfile: [UsersWithSubscribedUsersProfile]     
    }   

    type UsersWithSubscribedUsersProfile {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [ProfileEntity]!
    }
`;
