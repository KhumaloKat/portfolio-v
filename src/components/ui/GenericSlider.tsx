'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { memo, useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import ServicesCard from './ServicesCard';
import PortfolioCard from './PortfolioCard';
import ReviewCard from './ReviewCard';
import Blog from './Blog';

import {
  CardData,
  PortfolioItem,
  Review,
  Blog as BlogItem,
} from '@/data/data';

type AllowedCard = CardData | PortfolioItem | Review | BlogItem;

interface GenericSliderProps<T extends AllowedCard> {
  data: T[];
  slidesPerView: number;
  heightClass?: string;
  cardType: 'hover' | 'portfolio' | 'review' | 'blog';
}

function GenericSliderComponent<T extends AllowedCard>({
  data,
  slidesPerView,
  heightClass,
  cardType,
}: GenericSliderProps<T>) {
  const [isClient, setIsClient] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const isReview = cardType === 'review';
  const isPortfolio = cardType === 'portfolio';
  const isBlog = cardType === 'blog';

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) {
      return;
    }

    if (isInView) {
      swiper.autoplay.start();
      return;
    }

    swiper.autoplay.stop();
  }, [isInView]);

  if (!isClient) {
    // Return a placeholder during SSR to prevent hydration mismatch
    return (
      <div className={`relative w-full flex flex-col justify-center items-center ${heightClass || ''}`}>
        <div className={`w-full px-4 sm:px-6 lg:px-0 ${!isReview ? 'max-w-[1440px]' : ''}`}>
          <div className="flex gap-4 overflow-x-auto">
            {data.slice(0, 3).map((item, index) => (
              <div key={index} className="flex-shrink-0 w-full max-w-sm">
                {cardType === 'hover' && 'title' in item && 'imageSrc' in item && (
                  <ServicesCard title={item.title} imageSrc={item.imageSrc} priority={index === 0} />
                )}
                {cardType === 'portfolio' && 'image' in item && 'href' in item && 'desc' in item && (
                  <PortfolioCard
                    {...item}
                    priority={index === 0}
                  />
                )}
                {cardType === 'review' && 'rating' in item && (
                  <ReviewCard
                    name={item.name}
                    role={item.role}
                    rating={item.rating}
                    text={item.text}
                  />
                )}
                {cardType === 'blog' && 'image' in item && 'button' in item && 'name' in item && 'date' in item && (
                  <Blog
                    image={item.image}
                    button={item.button}
                    name={item.name}
                    date={item.date}
                    title={item.title}
                    priority={index === 0}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`relative w-full flex flex-col justify-center items-center ${heightClass || ''}`}>
      <div className={`w-full px-4 sm:px-6 lg:px-0 ${!isReview ? 'max-w-[1440px]' : ''}`}>
        <Swiper
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          centeredSlides={isReview}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: isPortfolio ? 1 : 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: isPortfolio || isBlog || isReview ? 1 : 2,
              spaceBetween: 18,
            },
            850: {
              slidesPerView: isPortfolio || isBlog || isReview ? 1 : 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: isPortfolio ? 2 : Math.min(slidesPerView, 3),
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: isPortfolio ? 2 : slidesPerView,
              spaceBetween: 24,
            },
          }}
          className={isPortfolio ? "!pb-16 !overflow-visible" : "!pb-16"}
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              className={`${isReview ? '!w-full sm:!w-[90%] md:!w-[784px]' : '!flex justify-center'}`}
            >
              {cardType === 'hover' && 'title' in item && 'imageSrc' in item && (
                <ServicesCard title={item.title} imageSrc={item.imageSrc} priority={index === 0} />
              )}
              {cardType === 'portfolio' && 'image' in item && 'href' in item && 'desc' in item && (
                <PortfolioCard
                  {...item}
                  priority={index === 0}
                />
              )}
              {cardType === 'review' && 'rating' in item && (
                <ReviewCard
                  name={item.name}
                  role={item.role}
                  rating={item.rating}
                  text={item.text}
                />
              )}
              {cardType === 'blog' && 'image' in item && 'button' in item && 'name' in item && 'date' in item && (
                <Blog
                  image={item.image}
                  button={item.button}
                  name={item.name}
                  date={item.date}
                  title={item.title}
                  priority={index === 0}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export const GenericSlider = memo(GenericSliderComponent) as typeof GenericSliderComponent;