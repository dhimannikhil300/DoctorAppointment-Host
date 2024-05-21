import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from 'react-toastify'
import HashLoader from "react-spinners/HashLoader";


const FeedbackForm = () => {
    const [rating , setRating] = useState(0);
    const [hover , setHover] = useState(0);
    const [reviewText , setReviewText] = useState('');
    const [loading, setLoading] = useState(false)

    const {id} = useParams()

    const handelSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if(!rating || !reviewText){
                setLoading(false);
                return toast.error('Rating & ReviewText Fields are required')
            }

            const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
                method:"post",
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({rating, reviewText})
            })

            const result = await res.json()
            
            if(!res.ok){
                throw new Error(result.message)
            }

            setLoading(false)
            toast.success(result.message)
        } catch (error) {
            setLoading(false);
            toast.error(error.message)
        }

    }

  return (
    <form action="">
        <div>
            <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
                How would you rate the overall experinece?*
            </h3>

            <div>
                {
                    [...Array(5).keys()].map( (_, index) => {
                        index += 1;

                        return (
                            <button 
                                key={index} 
                                type="button" 
                                onClick={()=>setRating(index)} 
                                onMouseEnter={()=>setHover(index)}
                                onMouseLeave={()=>setHover(rating)}
                                onDoubleClick={()=>{
                                    setHover(0);
                                    setRating(0);
                                }}
                                className={`${index <= ((rating && hover) || hover )
                                    ? "text-yellowColor"
                                    : "text-gray-400"}
                                    bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                            >
                                <span>
                                    <AiFillStar />
                                </span>
                            </button>
                        )
                    })
                }
            </div>
        </div>


        <div className="mt-[30px]">
            <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
                Share your feedback or suggestions*
            </h3>

            <textarea 
                rows="5" 
                className="border border-solid border-[#0066f34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                placeholder="Write your message"
                onChange={(e) => setReviewText(e.target.value)}
                value={reviewText}
            />

            <button className="btn" type="submit" onClick={handelSubmitReview}>
                {
                    loading ? <HashLoader size={25} color="#ffffff" /> : 'Submit Feedback'
                }
            </button>
        </div>
    </form>
  )
}

export default FeedbackForm