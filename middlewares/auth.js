import jwt from 'jsonwebtoken'
import UserModal from '../models/user.js'
 
const secret = 'test'

const auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,secret)
            req.userId = decodedData?.id
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth;