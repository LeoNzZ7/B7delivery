import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';

export const Banner = () => {
  return(
    <Swiper
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      modules={[Autoplay]}
    >
      <SwiperSlide>
        <img src="/temp/banner001.png" alt="" className='w-full h-full rounded-lg drop-shadow-lg' />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/temp/banner002.png" alt="" className='w-full h-full rounded-lg drop-shadow-lg' />
      </SwiperSlide>
    </Swiper>
  );
}