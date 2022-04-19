const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {

  const promise = db.collection('data').aggregate().sample({size: 10}).sort({movie_rating:-1}).end()
  return promise

}