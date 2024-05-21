import {Pagination} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import {HiStar} from 'react-icons/hi'
import { BASE_URL} from '../../config'
import useFetchData from '../../hooks/useFetchData'
import Loader from '../../compontnts/Loader/Loading'
import Error from '../../compontnts/Error/Error'

const Testimonial = () => {
    const {data, loading, error} = useFetchData(`${BASE_URL}/reviews`)
  return (
    <div className='mt-[30px] lg:mt-[55px]'>
        {loading && !error && <Loader />}
        {error && !loading && <Error />}
        {!loading && !error && <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} pagination={{clickable:true}}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }}
        >
            {
                data && data?.map( (review, index)=> (
                    <SwiperSlide key={review._id}>
                        <div className='py-[30px] px-5 rounded-[13px]'>
                            <div className='flex items-center gap-[13px]'>
                                <img src={review?.user?.photo} alt='' />
                                <div>
                                    <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                                        {review?.user?.name}
                                    </h4>
                                    <div className="flex items-center gap-[2px]">
                                        <HiStar className={`${review?.rating >= 1 ? "text-yellowColor": "text-textColor"} w-[18px] h-5}`} />
                                        <HiStar className={`${review?.rating >= 2 ? "text-yellowColor": "text-textColor"} w-[18px] h-5}`} />
                                        <HiStar className={`${review?.rating >= 3 ? "text-yellowColor": "text-textColor"} w-[18px] h-5}`} />
                                        <HiStar className={`${review?.rating >= 4 ? "text-yellowColor": "text-textColor"} w-[18px] h-5}`} />
                                        <HiStar className={`${review?.rating >= 5 ? "text-yellowColor": "text-textColor"} w-[18px] h-5}`} />
                                    </div>
                                </div>
                            </div>
                            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                                "
                                {review?.reviewText}
                                "
                            </p>
                        </div>
                    </SwiperSlide>
                ))
            }

            
        </Swiper>}
    </div>
  )
}

export default Testimonial