import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import bannerLists from "./bannerLists";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <div className="py-6">
      <Swiper
        grabCursor
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        effect="fade"
        slidesPerView={1}
        className="rounded-xl overflow-hidden shadow-2xl"
      >
        {bannerLists.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className={`relative flex flex-col lg:flex-row items-center justify-between sm:h-[500px] h-96 bg-gradient-to-r from-indigo-900/90 to-indigo-700/70 backdrop-blur-md`}
            >
              {/* Text Content */}
              <div className="lg:w-1/2 w-full px-8 py-6 text-center lg:text-left z-10 lg:pl-16">
                <h3 className="text-white text-2xl sm:text-3xl font-semibold mb-2 tracking-wide">
                  {item.title}
                </h3>
                <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4 leading-snug drop-shadow">
                  {item.subtitle}
                </h1>
                <p className="text-white text-base sm:text-lg font-medium mb-6">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link
                    to="/products"
                    className="inline-block bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-transparent transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Shop Now
                  </Link>
                  <Link
                    to="/about"
                    className="inline-block bg-transparent hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-lg border border-white transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Image Content */}
              <div className="lg:w-1/2 w-full flex justify-center p-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item?.image}
                    alt={item.title}
                    className="w-full h-full max-h-[400px] object-contain drop-shadow-xl transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Decorative element matching About page's design */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-300 via-indigo-500 to-indigo-300"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroBanner;
