import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { BASE_URL, token } from "../../config";
import {toast} from 'react-toastify'

const UpdateMenu = ({id, approved}) => {
    const [isApproved, setIsApproved] = useState(approved)
    const [loading, setLoading] = useState(false)

    const changeHandler = async () => {
        setLoading(true)
        try {
            const data = {id, isApproved}
            const res = await fetch(`${BASE_URL}/users/updateDoctor`, {
                method: 'post',
                headers:{
                  'content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
              })
              
            const result = await res.json()
            if(!res.ok){
                throw new Error(result.message)
            }

            setLoading(false)
            toast.success(result.message)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }

    }
  return (
    <form className="flex justify-between items-center">
        <td>
            <select className="form__input py-3.5" value={isApproved} onChange={(e)=>setIsApproved(e.target.value)}>
                <option>Select</option>
                <option value='pending'>Pending</option>
                <option value='approved'>Approved</option>
                <option value='cancelled'>Cancelled</option>
            </select>
        </td>
        <td>
            <div  
                onClick={changeHandler}   
                className='w-[44px] h-[44px] rounded-full border border-solid border-[#181a1e] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'
            >
                <BsArrowRight class='group-hover:text-white w-6 h-5'/>
            </div>
        </td>
    </form>
  )
}

export default UpdateMenu