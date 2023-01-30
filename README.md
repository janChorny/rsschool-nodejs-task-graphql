# RSSchool NodeJS GraphQL task
> actual description of the task is [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/assignment.md)

## To begin with:
1. Clone this repository - git clone https://github.com/janChorny/rsschool-nodejs-task-graphql
2. Go to downloaded folder - `cd rsschool-nodejs-task-graphql`
3. Move to 'development' branch - `git checkout development`
4. Install dependencies - `npm install`

## To test endpoins:

- `npm run test`

## Usage:

1. Use `npm run start` to start the server at http://127.0.0.1:3000
2. Than you can run POSTMAN with a new POST request at http://127.0.0.1:3000/graphql and input Body&#8594;GraphQL&#8594;Query with the samples below:

---

1. Get gql requests:

- Get users, profiles, posts, memberTypes - 4 operations in one query.

```
query {
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
query {
    user (id: "") {
        firstName
        lastName
        email
    }
    post (id: "") {
        title
        content
    }
    profile (id: "") {
        avatar
        sex
        birthday
        country
        street
        city
    }
    memberType (id: "basic") {
        discount
        monthPostsLimit
    }
}
```
