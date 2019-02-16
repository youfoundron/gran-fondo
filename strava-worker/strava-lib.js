
var strava = require('strava-v3');

const {STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_ACCESS_TOKEN} = process.env

const opts = Object.freeze({
  access_token: STRAVA_ACCESS_TOKEN,
  client_id: STRAVA_CLIENT_ID,
  client_secret: STRAVA_CLIENT_SECRET,
  redirect_uri: 'localhost:3000'
})

module.exports = {
  authenticate: () => {
    console.log('we are authenticated')
  },
  getAthlete: () => (new Promise((resolve, reject) => {
    strava.athlete.get(opts, (err,payload,limits) => {
      if(!err) {
        resolve(payload)
      }
      else {
        reject(err);
      }
    });
  })),
  getActivityStats: () => {
    console.log('pretended to get some activities')
  }
}
