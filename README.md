# Social Media App

Social Media platform where users can create posts. These posts have comments and likes. The user is also able to add friends that they would like to follow.

## Instructions

To try the live version click this link:
[Social Media App](https://radenar.github.io/social-client/)

The back end can be found at the following link:
[Back End](https://mysterious-tor-94072.herokuapp.com/)

Front end repository:
[GitHub](https://github.com/RadenAR/social-client)

To run locally, run the following in terminal from the project directory:
```sh
npm run server
```

## Entry Relationship Diagram (ERD)

User -|-< Posts

| Posts        |             |
| ------------ | ----------- |
| id           | primary key |
| user_id      | foreign key |
| title        | string      |
| content      | string      |
| comments     | foreign key |
| date         | date        |
| time         | time        |

User -|-< Comments >-|- Posts

| Comments     |             |
| ------------ | ----------- |
| id           | primary key |
| user_id      | foreign key |
| title        | string      |
| content      | string      |
| date         | date        |
| time         | time        |

User -|-< Likes >-|-Posts

| Likes        |             |
| ------------ | ----------- |
| id           | primary key |
| user_id      | foreign key |
| post_id      | foreign key |
| date         | date        |
| time         | time        |

Friend Relationship:
User -|-< Users

| Users        |             |
| ------------ | ----------- |
| id           | primary key |
| username     | string      |
| email        | string      |
| password     | string      |
| friends      | foreign key |
| date         | date        |
| time         | time        |

## Built With

Front-end:

* [React](https://reactjs.org/) - Front end framework
* [socket.io](https://socket.io/) - Websocket package
* [axios](https://www.npmjs.com/package/axios) - axios used for API calls
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Language for site functionality
* [Bootstrap](https://getbootstrap.com/) - Used for more advanced styling
* [CSS3](http://www.css3.info/) - Used in conjunction with bootstrap for styling
* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - Used for general structure of webpage

Back-end:

* [Express](https://expressjs.com/) - Back end framework
* [socket.io](https://socket.io/) - Websocket package
* [node](https://nodejs.org/en/) - Runtime environment for javascript
* [mongoDB](https://www.mongodb.com/) - NoSQL database
* [mongoose](https://mongoosejs.com/) - Object modeling for node.js and mongodb

## User Stories

* As a user, I want to be able to sign in.
* As a user, I want to be able to sign up.
* As a user, I want to be able to sign out.
* As a user, I want to be able to change my password.

* As a user, I want to be able to create a post.
* As a user, I want to be able to view posts.
* As a user, I want to be able to delete a post.
* As a user, I want to be able to update a post.

* As a user, I want to be able to create a comment.
* As a user, I want to be able to view comments.
* As a user, I want to be able to delete a comment.
* As a user, I want to be able to update a comment.

* As a user, I want to be able to like a post.
* As a user, I want to be able to unlike a post.
* As a user, I want to be able to view all posts.
* As a user, I want to be able to view my friends posts.
* As a user, I want to be able to view my own posts.
* As a user, I want to be able to add a friend.
* As a user, I want to be able to remove a friend.
* As a user, I want to be able to view my profile.

## Routes

| Comment Routes           |             |        |
| ------------------------ | ----------- | ------ |
| /posts/comments/:id      | GET         | INDEX  |
| /posts/comments/:id/:num | GET         | SHOW   |
| /posts/comments/:id      | POST        | CREATE |
| /posts/comments/:id/:num | PATCH       | UPDATE |
| /posts/comments/:id/:num | DELETE      | DELETE |

| Friend Routes            |             |        |
| ------------------------ | ----------- | ------ |
| /friends/:username       | GET         | INDEX  |
| /friends/:username       | POST        | CREATE |
| /friends/:username       | DELETE      | DELETE |

| Like Routes       |             |        |
| ----------------- | ----------- | ------ |
| /likes/:id        | GET         | INDEX  |
| /likes/number/:id | GET         | SHOW   |
| /likes/:id        | POST        | CREATE |
| /likes/:id        | DELETE      | DELETE |

| Post Routes    |        |        |
| -------------- | ------ | ------ |
| /posts         | GET    | INDEX  |
| /friends/posts | GET    | INDEX  |
| /myPosts       | GET    | INDEX  |
| /posts/:id     | GET    | SHOW   |
| /posts         | POST   | CREATE |
| /posts/:id     | PATCH  | UPDATE |
| /posts/:id     | DELETE | DELETE |

| Authentication Routes |        |        |
| --------------------- | ------ | ------ |
| /sign-up              | POST   | CREATE |
| /sign-in              | POST   | CREATE |
| /change-password      | PATCH  | UPDATE |
| /sign-out             | DELETE | DELETE |

## Planning and Execution

* Created user stories and entity relationship diagrams
* Set up github and local repositories
* Create initial model
* Create routes
* Link to server
* Upon new functionality did the previous steps again

## Problem solving strategy

* What is the error?
* What function is causing the error?
* What is that function returning?
* What is the function being passed?
* If the problem is what it is being passed work back to the function before, if it is returning correctly more the other way down the chain.
* If unsure of the above process, look through old issues and google relevant keywords.
* If there is still an issue, open an issue on the issue que.

## Potential Additions/ Unsolved Issues

* Currently able to add self as a friend
* Addition of requests for friendships
* Addition of bi-directional friendship
* Pictures for profile and on posts (small image of profile picture)
* Chat integration
* Notification indicator
* Add media to posts
* Better styling
* Ability to filter posts, by most likes, comments or search for a specific user's posts/comments

## Screenshot

![alt text](https://i.imgur.com/dCjzRPv.png "Social Media")
