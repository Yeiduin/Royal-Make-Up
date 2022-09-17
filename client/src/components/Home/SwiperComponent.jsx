import React from 'react';
import { Link } from 'react-router-dom';
import { GalleryCard } from '../ListProducts/GalleryCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import styles from '../../assets/css/Home.module.css'




export const SwiperComponent = ({ array }) => {
 

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
  
  <Swiper
  className={styles.swiper}
  style={{
    "--swiper-pagination-color": "#FBA744",
    "--swiper-pagination-bullet-inactive-color": "#556353",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-size": "16px",
    "--swiper-pagination-bullet-horizontal-gap": "6px"}}
      loop={true}
      loopFillGroupWithBlank={true}
      centeredSlides={true}
      breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 2
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
            slidesPerGroup: 4

          },
        }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
    >
      {array?.map((p, index) => {
        return (
          <SwiperSlide className={styles.swiperslide} key={index}><Link to={`/details/${p.id}`}>
              <GalleryCard
                name={p.name}
                price={p.price}
                image_link={p.api_featured_image}
                rating={p.rating}
                discounted={p.discounted}
              />
            </Link></SwiperSlide>
        );
      })}
    </Swiper>
  </div>
  );


}
