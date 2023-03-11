# RSSchool NodeJS GraphQL task
> actual description of the task is [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/assignment.md)

## To begin with:
1. Clone this repository - git clone https://github.com/janChorny/rsschool-nodejs-task-graphql
2. Go to downloaded folder 
```
cd rsschool-nodejs-task-graphql
```
3. Move to 'development' branch 
```
git checkout development
```
4. Install dependencies 
```
npm install
```

## To test endpoins:

1. To start the server at http://127.0.0.1:3000 use:
```
npm run start
```
2. Than run tests:
```
npm run test
```

## Usage:

1. Use `npm run start` to start the server at http://127.0.0.1:3000
2. Than you can run POSTMAN with a new POST request at http://127.0.0.1:3000/graphql and input Body&#8594;GraphQL&#8594;Query with the samples below:

---

1. Get gql requests:

- Get users, profiles, posts, memberTypes - 4 operations in one query.

```
query GetAll {
  users {  
   id    
   firstName
   lastName
   email
   subscribedToUserIds
  }
  posts {
   id
   title
   content
   userId
  }
  profiles {
   id
   avatar
   sex
   birthday
   country
   street
   city
   memberTypeId
  }
  memberTypes {
   id
   discount
   monthPostsLimit
  }
}
```
- Get user, profile, post, memberType by id - 4 operations in one query.

```
query GetAllByIds($userId: String!, $profileId: String!, $postId: String!, $memberTypeId: String!) {
    user(id: $userId) {id}
    profile(id: $profileId) {id}
    post(id: $postId) {id}
    memberType(id: $memberTypeId) {id}
}
```
variables
```
{
    "userId": " "(UUID string),
    "profileId": " "(UUID string),
    "postId": " "(UUID string),
    "memberTypeId": "basic"
}
```
- Get users with their posts, profiles, memberTypes.
```
query GetAllUsersWithData {
    users {
        id
        posts {
            id
        }
        profile {
            id
        }
        memberType {
            id
        }
    }
}
```
- Get user by id with his posts, profile, memberType.

```
query GetUserByIdWithData($id: String!) {
    user(id: $id) {
        id
        posts {
            id
        }
        profile {
            id
        }
        memberType {
            id
        }
    }
}
```
variables:

```
{"id": " " (UUID string)}
```
- Get users with their userSubscribedTo, profile.

```
query GetUsersWithSubscribers {
    users {
        id
        userSubscribedTo {
            id
        }
        profile {
            id
        }
    }
}
```
- Get user by id with his subscribedToUser, posts.
```
query GetUserWithSubscribersPosts($id: String!) {
    user(id: $id) {
        id
        subscribedToUser {id}
        posts {id}
    }
}
```
variables:

```
{"id": " " (UUID string)}
```
- Get users with their userSubscribedTo, subscribedToUser (additionally for each user in userSubscribedTo, subscribedToUser add their userSubscribedTo, subscribedToUser).
```
query GetUsersWithSubscribtions {
    users {
        id
        userSubscribedTo {
            id
            userSubscribedTo {id}
            subscribedToUser {id}
        }
        subscribedToUser  {
            id
            userSubscribedTo {id}
            subscribedToUser {id}
        }
    }
}
```
2. Post gql requests:
- Create user.
```
mutation CreateUser($user: userCreateType!) {
    createUser(user: $user) {
        id
        firstName
        lastName
        email
        subscribedToUserIds
    }
}
```
variables:
```
{
    "user": {
        "firstName": "Alex",
        "lastName": "Black",
        "email": "alex.black@mail.com"
    }
}
```
- Create profile.
```
mutation CreateProfile($profile: createProfileType!) {
    createProfile(profile: $profile) {
        id
        avatar
        sex
        birthday
        country
        city
        street
        memberTypeId
        userId
    }
}
```
variables:
```
{
    "profile": {
        "avatar": "avatar",
        "sex": "male",
        "birthday": 26557833,
        "country": "Germany",
        "city": "Berlin",
        "street": "Central",
        "memberTypeId": "basic",
        "userId": "6bf10709-fb99-43fc-aa30-2d41f7b0049d"
    }
}
```
- Create post
```
mutation CreatePost($post: postCreateType) {
    createPost(post: $post) {
        id
        title
        content
        userId
    }
}
```
variables:
```
{
    "post": {
        "title": "title",
        "content": "content",
        "userId": "6bf10709-fb99-43fc-aa30-2d41f7b0049d"
    }
}
```
3. Put gql requests:
- Update user.
```
mutation UpdateUser($user: userUpdateType!, $userId: String!) {
    updateUser(userId: $userId, user: $user) {
        id
        firstName
        lastName
        email
        subscribedToUserIds
    }
}
```
variables:
```
{
    "userId": "6bf10709-fb99-43fc-aa30-2d41f7b0049d",
    "user": {
        "firstName": "Jack",
        "lastName": "Black"
    }
}
```
- Update profile.
```
mutation UpdateProfile($profile: updateProfileType!, $profileId: String!) {
    updateProfile(profileId: $profileId, profile: $profile) {
        id
        country
    }
}
```
variables: 
```
{
    "profileId": "6bf10709-fb99-43fc-aa30-2d41f7b0049c",
    "profile": {
        "country": "USA"
    }
}
```
- Update post.
```
mutation UpdatePost($post: postUpdateType!, $postId: String!) {
    updatePost(postId: $postId, post: $post) {
        id
        title
        content
        userId
    }
}
```
variables:
```
{
    "postId": "6bf10709-fb99-43fc-aa30-2d41f7b0049f",
    "post": {
        "title": "new title",
        "content": "new content"
    }
}
```
- Update memberType.
```
mutation UpdateMemberType($memberType: updateMemberType!, $memberTypeId: String!) {
    updateMemberType(memberTypeId: $memberTypeId, memberType: $memberType) {
        id
        discount
        monthPostsLimit
    }
}
```
variables: 
```
{
    "memberTypeId": "business",
    "memberType": {
        "discount": 30
    }
}
```
- Subscribe to
```
mutation UserSubscribeTo($payload: userSubscribeToInput!) {
    subscribeUserTo(payload: $payload) {
        id
        firstName
        lastName
        email
        subscribedToUserIds
        userSubscribedTo {id}
    }
}
```
variables:
```
{
    "payload": {
        "currentUserId": "6bf10709-fb99-43fc-aa30-2d41f7b0049l",
        "subscribeToUserId": "6bf10709-fb99-43fc-aa30-2d41f7b0049m"
    }
}
```
- Unsubscribe from
```
mutation UnsubscribeUserFrom($payload: userUnsubscribeFromInput!) {
    unsubscribeUserFrom(payload: $payload) {
        id
        firstName
        lastName
        email
        subscribedToUserIds
        userSubscribedTo {id}
    }
}
```
variables:
```
{
    "payload": {
        "currentUserId": "6bf10709-fb99-43fc-aa30-2d41f7b0049l",
        "unsubscribeFromUserId": "6bf10709-fb99-43fc-aa30-2d41f7b0049n"
    }
}
```
