import { useState } from "react"


const ReviewText = ({text}) => {
    const [show, setShow] = useState(false)
  return (
    <div onClick={()=> setShow(!show)} className="text-normal text-gray-500">
        {
            show ? text : text.length > 25 ? text.substring(0, 25)+'...' :text
        }
    </div>
  )
}

export default ReviewText