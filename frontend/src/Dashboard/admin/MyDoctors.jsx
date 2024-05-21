import Loader from '../../compontnts/Loader/Loading'
import Error from '../../compontnts/Error/Error'
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import { useNavigate } from 'react-router-dom'
import UpdateMenu from './UpdateMenu'
import { useEffect, useState } from 'react'

const MyDoctors = () => {
    const [query, setQuery] = useState("")
  const [debounceQuery, setDebounceQuery] = useState("");
  
  const handleSearch = () => {
    setQuery(query.trim())
  }

  useEffect( ()=>{
    const timeout = setTimeout(()=>{
      setDebounceQuery(query)
    }, 700)

    return () => clearTimeout(timeout)
  },[query])


    const {data, loading, error} = useGetProfile(`${BASE_URL}/users/getAllDoctors?query=${debounceQuery}`)
    const navigate = useNavigate()
    
    const clickHandler = (id) => {
        navigate(`/doctors/${id}`)
    }

  return (
    <div>
        {loading && !error && <Loader />}
        {error && !loading && <Error />}
        {!loading && !error && 
        <div>
            <div className='mb-8 max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
                    <input
                    type='search'
                    className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor'
                    placeholder='Search doctor by name or specification'
                    value = {query}
                    onChange={e=>setQuery(e.target.value)}
                    />
                    <button className="btn mt-0 rounded-[0px] rounded-r-md" onClick={handleSearch}>
                        Search
                    </button>
                </div>
    
            <table className='w-full text-left text-sm text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            Photo
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Email
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data && data?.map(item => (
                            <tr key={item._id} className='cursor-pointer'>
                                <th  onClick={()=>clickHandler(item._id)} scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'>
                                    <img src={item.photo} alt="" className='w-10 h-10 rounded-full'/>
                                </th>
                                <th  onClick={()=>clickHandler(item._id)}>
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{item.name}</div>
                                    </div>
                                </th>
                                <td  onClick={()=>clickHandler(item._id)}>
                                    <div className="text-normal text-gray-500">{item.email}</div>
                                </td>
                                <div className='w-full'>
                                    <UpdateMenu approved={item.isApproved} id={item._id}/>
                                </div>
                            </tr>
                            
                            ))
                    }
                </tbody>
            </table>
        </div>
        }
    </div>
  )
}

export default MyDoctors