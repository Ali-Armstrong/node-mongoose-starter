const db = require('./utils/db');
const logger = require('./utils/logger');

exports.start = (app) => {
    try{
        logger.info("Initializing app...")
        //connect to DB
        db.connectToDB(()=>{
            app.emit('ready');
        })
    }catch(err){
        logger.error(err)
    }
}