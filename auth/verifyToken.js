import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'

export const authentication = async( req, res, next) => {
    //get token
    const authToken = req.headers.authorization
    if(!authToken || !authToken.startsWith('Bearer ')){
        return res.status(401).json({
            success:false,
            message:'No Token authorization denied'
        })
    }

    try {
        const token = authToken.split(' ')[1]
        // verify token 
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.id
        req.role = decode.role

        next()
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({
                message:"Token is expired"
            })
        }
        return res.status(401).json({
            success:false,
            message:"Invalid Token"
        })
    }
}


export const restict = roles => async (req, res, next) => {
    const userId = req.userId
    
    let user;
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);
    
    if(patient){
        user = patient
    }
    if(doctor){
        user = doctor
    }
    
    if(!roles.includes(user.role)){
        return res.status(401).json({
            success:false,
            message: "You're not authorized"
        })
    }
    next();
}