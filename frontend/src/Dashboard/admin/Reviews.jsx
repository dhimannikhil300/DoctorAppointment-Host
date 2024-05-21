import Loader from '../../compontnts/Loader/Loading'
import Error from '../../compontnts/Error/Error'
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL, token } from '../../config'
import { useNavigate } from 'react-router-dom'
import {AiOutlineDelete} from 'react-icons/ai'
import {toast} from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import ReviewText from './ReviewText'

const Reviews = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(false)
    const [error, setError] = useState(false)
    const [count, setCount] = useState(0)

    const deleteHandler = useCallback(async (id)=>{
        try {
            const res = await fetch(`${BASE_URL}/reviews/${id}`, {
                method: 'delete',
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
            toast.success(result.message)
        } catch (error) {
            toast.error(error.message)
        }
    },[data])
    
    // let {data, loading, error} = useGetProfile(`${BASE_URL}/reviews`)
    useEffect( () => {
        const fetchData = async () => {
        //   setLoading(true)
  
          try{
              const res = await fetch(`${BASE_URL}/reviews`, {
                  headers:{Authorization:`Bearer ${token}`}
              })
              const result = await res.json()
  
              if(!res.ok){
                throw new Error(result.message)
              }
              console.log("resutl : ", result);
              setData(result.data)
              setLoading(false)
          }catch(error){
            setLoading(false)
            setError(error.message)
          }
        }
  
        fetchData()
      }, [count, setCount, deleteHandler])
    
    
    
  return (
    <div>
        {loading && !error && <Loader />}
        {error && !loading && <Error />}
        {!loading && !error && <table className='w-full text-left text-sm text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
                <th scope='col' className='px-6 py-3'>
                    Photo
                </th>
                <th scope='col' className='px-6 py-3'>
                    Name
                </th>
                <th scope='col' className='px-6 py-3'>
                    Rating
                </th>
                <th scope='col' className='px-6 py-3'>
                    Review
                </th>
                <th scope='col' className='px-6 py-3'>
                    Doctor
                </th>
            </tr>
        </thead>

        <tbody>
            {
                data && data?.map(item => (
                    <tr key={item._id} className='cursor-pointer items-start'>
                        <th scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'>
                            <img src={item?.user?.photo} alt="" className='w-10 h-10 rounded-full'/>
                        </th>
                        <th>
                            <div className="pl-3">
                                <div className="text-base font-semibold">{item?.user?.name}</div>
                            </div>
                        </th>
                        <td className='text-center'>
                            <div className="text-normal text-gray-500">{item?.rating}</div>
                        </td>
                        <td className='max-w-[180px]'>
                            <ReviewText text={item.reviewText} />
                        </td>

                        <td>
                            <div className="text-normal text-gray-500">{item?.doctor?.name}</div>
                        </td>
                        <td onClick={()=>setCount(count+1)}>
                            <button onClick={()=>(deleteHandler(item._id))} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]">
                                {
                                    <AiOutlineDelete />
                                }
                            </button>
                        </td>
                        
                    </tr>
                    
                    ))
            }
        </tbody>
    </table>}
    </div>
  )
}

export default Reviews