# Description

This NHL profile dashboard application allows users to view information related to all 32 NHL teams, as well as the NHL players currently on the teams' rosters.

### Routes:

`/teams`
- Lists all NHL teams.

`/teams/{teamId}`
- Displays information for a specific team.

`/teams/{teamId}/players`
- Lists all players on the roster for a specific team.

`/teams/{teamId}/players/{playerId}`
- Displays information for a specific player. 

# Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

#### Visit [nhl-team-dashboard.vercel.app/](https://nhl-team-dashboard.vercel.app/) to view deployed app.

#### To run the development server locally:

```bash
npm run dev
# or
yarn dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Testing 
- Cypress
    - With the Next.js server running, start Cypress with the following command:

  ```bash
  npm run cypress
  ```

# Technologies Used
- Next.js
- React
- TypeScript
- Cypress
- Jest

# Notes
1. Searching through the list of Teams and Players is implemented on the client side with component state and the useState hook.
   - There is no need for a state management library for such a small application, but as the amount of component-level state grows a library like Redux could be introduced.
2. Utilizing the API endpoint modifiers could be a good way to pull in more information and build out additional features.
   - The `?expand=team.stats` and `?stats=statsSingleSeason&season={playerId}` endpoint modifiers would be a good way to add additional information for users who are mostly interested in NHL team and player stats.


