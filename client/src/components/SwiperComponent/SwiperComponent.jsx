import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { ProductCard } from "../ProductCard/ProductCard"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export const SwiperComponent = ({ array }) => {
  return (
    <div>
      <Swiper
      className="pb-24"
        style={{
          "--swiper-pagination-color": "#FBA744",
          "--swiper-pagination-bullet-inactive-color": "#556353",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 50,
            slidesPerGroup: 2,
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter:true
        }}
        modules={[Pagination, Autoplay]}
      >
        {array?.map((p, index) => {
          return (
            <SwiperSlide key={index} className="pb-20">
              <Link to={`/detail/${p.id}`}>
                <ProductCard
                  {... p}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
