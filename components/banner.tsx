import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const Banner = () => {
  return(
    <Swiper
      slidesPerView={1}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
    </Swiper>
  );
}