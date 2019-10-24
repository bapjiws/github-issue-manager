A minimalist dashboard to show GitHub issues assigned to you (right now the author of this repo and the repo itself are hardcoded) and features the following:
- was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- uses [Socket.IO](https://github.com/socketio/socket.io) and [GitHub actions](https://github.com/features/actions) for live updates (opening/reopening an issue fires a GitHub action that hits an endpoint and the server pushes and update to the client)
- [Apollo Client](https://www.apollographql.com/docs/react/) and [GitHub GraphQL API](https://developer.github.com/v4/) to fetch teh data
- [Material-UI](https://material-ui.com/) for visual presentation 
- Deployed to Heroku
