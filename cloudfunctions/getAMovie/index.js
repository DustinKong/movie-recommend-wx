const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {

  const promise = await db.collection('data').where({movie_id:event.movie_id}).get()
  return promise

}