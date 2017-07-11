import app from './app'

import mongoose from 'mongoose'

const mongo_url = process.env.MONGO_URL || 'mongodb://localhost/scraaam'

const connectMongo = function(){
  if(process.env.DOCKER){

    app.get('/container/status', function(req, res, next){
      res.send('ok', 200)
    })

    console.log('mongoose wait on schema initialize')
    const timeout = process.env.APP_TIMEOUT || 10000
    const retryTime = process.env.APP_RETRY ||   500
    const now = function(){
      const hrTime=process.hrtime();
      return hrTime[0] * 1000 + hrTime[1] / 1000000;
    }
    const initilizeTime = now()
    return new Promise(function(resolve, reject){
      const tryConnection = function(){
        mongoose.connect(mongo_url)
        .then(resolve)
        .catch(function(error){
          console.log('mongoose connection fail')
          console.log('retry in ' + retryTime + ' milliseconds')
          let errorTime = now()
          if(errorTime - initilizeTime > timeout){
            reject('mongoose connection timeout')
          }
          return setTimeout(tryConnection, retryTime)
        })
      }
      tryConnection()
    })
  }
  else{
    return mongoose.connect(mongo_url)
    // mongoose.createConnection(mongo_url)
    // return Promise.resolve()
  }
}

const startServer = function(){
  const port = process.env.APP_PORT || 3001
  app.listen(port, () => console.log(`Server running on port ${port}`))
}

connectMongo().then(startServer)
