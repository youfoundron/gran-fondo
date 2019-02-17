
var strava = require('strava-v3');

const {STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_ACCESS_TOKEN} = process.env

const opts = Object.freeze({
  access_token: STRAVA_ACCESS_TOKEN,
  client_id: STRAVA_CLIENT_ID,
  client_secret: STRAVA_CLIENT_SECRET,
  redirect_uri: 'localhost:3000',
  per_page: 10000
})

const CHALLENGE_TYPES = {
  SEGMENT: 0,
  DISTANCE: 1
}

const getAthlete = () => (new Promise((resolve, reject) => {
  strava.athlete.get(opts, (err,payload,limits) => {
    if(!err) {
      resolve(payload)
    }
    else {
      reject(err);
    }
  });
}))

const getSegmentEfforts = (segmentId) => (
  new Promise((resolve, reject) => {
    strava.segmentEfforts.get(Object.assign({}, opts, {
      id: segmentId
    }), (error, payload, limits) => {
      if (error) {
        reject(error)
      } else {
        // normalize to array
        resolve(typeof payload === 'Array' ? payload: [payload])
      }
    })
  })
)

// const getSegmentEffortById = (segmentEffortId) => (
//   new Promise((resolve, reject) => {
//     strava.segment.get(Object.assign({}, opts, {
//       id: segmentEffortId
//     }), (error, payload, limits) => {
//       if (error) {
//         reject(error)
//       } else {
//         resolve(payload)
//       }
//     })
//   })
// )

const checkAthleteSuccess = async ({challenge, athleteId}) => {
  try {
    console.log('***', { challenge, athleteId })
    if (challenge.type !== CHALLENGE_TYPES.SEGMENT) {
      throw new Error('This challenge type was not implemented')
    }

    if (!challenge.segmentId) {
      throw new Error('Challenge segment id is required')
    }

    if (!challenge.timeToBeat) {
      throw new Error('timeToBeat is required')
    } 

    if (!challenge.expireTime) {
      throw new Error('expireTime is required')
    } 

    const segmentEfforts = await getSegmentEfforts(challenge.segmentId)

    console.log('***', { segmentEfforts, length: segmentEfforts.length })

    for (let i = 0; i < segmentEfforts.length; i++) {
      // const segment = await getSegmentEffortById(segmentEfforts[i].id)
      const segmentEffort = segmentEfforts[i]
      console.log('***', { segmentEffort })

      const startTimeMilliseconds = new Date(segmentEffort.start_date).getTime()

      console.log('***', { elapsed: segmentEffort.elapsed_time, ttb: challenge.timeToBeat, startTimeMilliseconds, expt: challenge.expireTime })
      if (segmentEffort.elapsed_time < challenge.timeToBeat && startTimeMilliseconds < challenge.expireTime) {
        console.log('*** ATHLETE SUCCEEDED CHALLENGE ***')
        return true
      }
    }

    console.log('*** ATHLETE FAILED CHALLENGE ***')
    return false
  } catch (e) {
    console.error(e)
    return false
  }
}

module.exports = {
  authenticate: () => {
    console.log('we are authenticated')
  },
  getAthlete,
  getSegmentEfforts,
  checkAthleteSuccess,
}
