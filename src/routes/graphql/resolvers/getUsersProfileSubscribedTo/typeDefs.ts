export const getUsersProfileSubscribedToTypeDefs = `
    type Query {
      getUsersProfileSubscribedTo: [UsersWithSubscribedUsersProfile]     
    }   

    type UsersWithSubscribedUsersProfile {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [String]!
      subscribedProfile: [ProfileEntity]
    }
`;
