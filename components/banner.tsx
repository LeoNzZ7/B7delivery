import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';
import { Banners } from '../types/banners';

type Props = {
  banners: Banners[];
}

export const Banner = ({ banners }: Props) => {
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
      {banners.map((item, index) => (
        <SwiperSlide key={index} >
          <img src={item.image} alt="" className='w-full h-full rounded-lg drop-shadow-lg' />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};