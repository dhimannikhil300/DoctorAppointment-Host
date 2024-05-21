import convertTime from "../../utils/convertTime"
import {BASE_URL, token} from '../../config'
import {toast} from 'react-toastify'
import { useState } from "react"
import Loading from "../../compontnts/Loader/Loading"

const SidePanel = ({id, doctorId, ticketPrice, timeSlots, isApproved}) => {
    const role = localStorage.getItem('role')
    const [approved, setApproved] = useState(isApproved)
    const [loading, setLoading] = useState(false)

    const bookingHandler = async () => {
        try {
            setLoading(true)
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method:'post',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message + 'Please Try agian')
            }

            if(data.session.url){
                {
                    console.log(data.session.url);
                }
                window.location.href = data.session.url
            }
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    const changeHandler = async () => {
        setLoading(true)
        try {
            const data = {id, isApproved: approved}
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
    <div className="shasow-panelShadow p-3 lg:p-5 rounded-md">
        <div className="flex items-center justify-between">
            <p className="text__para mt-0 font-semibold">
                Ticket Price
            </p>
            <span className="text-[16px] leading-7 lg:text-[27px] lg:leading-8 text-headingColor font-bold">
                ${ticketPrice} 
            </span>
        </div>

        <div className="mt-[30px]">
            <p className="text__para mt-0 font-semibold text-headingColor">
                Available Time Slots:
            </p>

            <ul className="mt-3">
                {
                    timeSlots && timeSlots?.map( (item, index) => (
                        <li key={index} className="flex items-center justify-between mb-2">
                            <p className="text-[15px] leading-6 text-textColor font-semibold">
                                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                            </p>
                            <p className="text-[15px] leading-6 text-textColor font-semibold">
                                {convertTime(item.startingTime)} - {convertTime(item.endingTime) }
                            </p>
                        </li>
                    ))
                }
            </ul>
        </div>
        {
            role === 'admin' && <div>
                    <form>
                    <select className="form__input py-3.5" value={approved} onChange={(e)=>setApproved(e.target.value)}>
                        <option>Select</option>
                        <option value='pending'>Pending</option>
                        <option value='approved'>Approved</option>
                        <option value='cancelled'>Cancelled</option>
                    </select>
                    </form>
                    <button className="btn px-2 w-full rounded-md" onClick={changeHandler}>
                        {loading && <Loading color="#ffffff" />} 
                        {!loading && "Change Status"}
                    </button>
                </div>
        }
        {role !== 'admin' && <button className="btn px-2 w-full rounded-md" onClick={bookingHandler}>
            Book Appointment
        </button>}
    </div>
  )
}

export default SidePanel