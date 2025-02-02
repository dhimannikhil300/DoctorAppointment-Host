import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Booking from '../models/BookingSchema.js'
import Stripe from 'stripe'


export const getCheckoutSession = async (req, res) => {
    try {
        const  doctor = await Doctor.findById(req.params.doctorId)
        const user = await User.findById(req.userId)
 
        const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

        //create stipe checkout session

        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'], 
            line_items: [
                {
                    price_data:{
                        currency: 'usd',
                        unit_amount:doctor.ticketPrice*100,
                        product_data:{
                            name: doctor.name,
                            description: doctor.bio,
                            images:[doctor.photo]
                        }
                    },
                    quantity:1
                }
            ],
            mode: 'payment',
            customer_email: user.email,
            billing_address_collection: 'required',
            success_url: `${process.env.CLIENT_SITE_URL}checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            submit_type: 'pay',
          });

        const booking = new Booking({
            doctor:doctor._id,
            user:user._id,
            ticketPrice: doctor.ticketPrice,
            session: session.id
        })

        await booking.save()
        res.status(200).json({success:true, message: 'Successfully paid', session})
    } catch (error) {
        console.log("Error is : ", error);
        res.status(500).json({
            success:false, message: 'Error creating checkout session'
        })
    }
}