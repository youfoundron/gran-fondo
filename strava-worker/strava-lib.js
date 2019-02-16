const strava = (STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET) => {
  return {
    authenticate: () => {
      console.log('we are authenticated')
    },
    getActivityStats: () => {
      console.log('pretended to get some activities')
    }
  }
}


module.exports = strava
