export const getPostsUsersSubscribedToByIdTypeDefs = `
    type Query {
      getPostsUsersSubscribedToById(id: ID!): UserWithUsersSubscribedPosts    
    }   

    type UserWithUsersSubscribedPosts {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [String]!
      subscriberPosts: [PostEntity]
    }
`;
