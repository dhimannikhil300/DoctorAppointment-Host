import Doctor from '../models/DoctorSchema.js'
import Booking from '../models/BookingSchema.js'
import User from '../models/UserSchema.js'
import bcrypt, { hash } from 'bcrypt'


export const updateUser = async (req, res) => {
    const id = req.params.id
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashPassword
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body},{new:true})
        res.status(200).json({success:true, message: 'Successfully updated', data: updatedUser})
    } catch (error) {
        res.status(500).json({success:false, message: 'Failed to update'})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({success:true, message: 'Successfully delete'})
    } catch (error) {
        res.status(500).json({success:false, message: 'Failed to delete'})
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id).select('-password')
        res.status(200).json({success:true, message: 'User Found', data: user})
    } catch (error) {
        res.status(404).json({success:false, message: 'No user Found'})
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json({success:true, message: 'User Found', data: users})
    } catch (error) {
        res.status(404).json({success:false, message: 'No user Found'})
    }
}

export const getUserProfile = async (req, res) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId).select('-password')

        if(!user){
            return res.status(404).json({success:false, message: "User not found"})
        }
        
        res.status(200).json({success:true, message:"Profile info is getting", data:user})
    } catch (error) {
        res.status(500).json({success: false, message:"Something went wrong, cannot get", error: error.message})
    }
}

export const getMyAppointments = async(req, res) => {
    try {
        const booking = await Booking.find({user:req.userId})
        const doctorIds = booking.map( el=> el.doctor)

        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password')
        res.status(200).json({success:true, message:'Appointments are getting', data:doctors})
    } catch (error) {
        res.status(500).json({success: false, message:"Something went wrong, cannot get"})
    }
}

export const getAllDoctor = async (req, res) =>{
    try {
        const {query} = req.query
        let doctors;
        if(query){
            doctors = await Doctor.find({
                $or:[
                    {name:{$regex:query, $options:'i'}},
                    {specialization:{$regex:query, $options:'i'}},
            ],
        }).select('-password')
        }else{
             doctors = await Doctor.find().select('-password')
        }
        if(!doctors){
            return res.status(404).json({success:true, message:"No Doctor found"})
        }
        res.status(200).json({
            success:true,
            message:"Successfully fetch all doctors",
            data: doctors
        })
    } catch (error) {
        res.status(500).json({success:false, message:"Something went wrong, cannot get"})
    }
}

export const updateDoctor = async (req, res) => {
    try {
        const {id, isApproved} = req.body
        const updateDoctor = await Doctor.findByIdAndUpdate(id, {isApproved}, {new:true})
        res.status(200).json({success:true, message:"Successfully Update", data: updateDoctor})
    } catch (error) {
        res.status(500).json({success:false, message:"Something went wrong, cannot update"})
    }
}