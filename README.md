## Entry Relationship Diagram (ERD)

User -|-< Posts

| Posts        |             |
| ------------ | ----------- |
| id           | primary key |
| user_id      | foreign key |
| title        | string      |
| content      | string      |
| date         | date        |
| time         | time        |

## User Stories

-   As a user, I want to be able to sign in.
-   As a user, I want to be able to sign up.
-   As a user, I want to be able to sign out.
-   As a user, I want to be able to change my password.

-   As a user, I want to be able to create a post.
-   As a user, I want to be able to view posts.
-   As a user, I want to be able to delete a post.
-   As a user, I want to be able to update a post.

## Learning goals
- Experience with complex relationship between friends, posts, comments and likes
- Dynamically updating, if one user posts and another is signed in, they should be able to view their post in "real time"

## Stretch goals
- Add username to posts
- Add ability to like posts
- Add ability to comment on posts
- Add ability to friend users and only see those people's posts

## Additional stretch goals
- Ability to chat to users
- Ability to view location information such as weather on homepage
