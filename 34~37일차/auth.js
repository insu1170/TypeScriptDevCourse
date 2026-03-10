const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()


const ensureAuthorization =(req, res)=> {
    try {
        let receivedJwt = req.headers["authorization"];
        console.log(receivedJwt);
        if(receivedJwt){
            let decodedjwt = jwt.verify(receivedJwt,process.env.PRIVATE_KEY || 'hello')
            return decodedjwt
        }else{
            throw new ReferenceError("jwt 없음");
            
        }

    } catch (err) {
        console.log(err)
        return err;

    }
}

module.exports = ensureAuthorization