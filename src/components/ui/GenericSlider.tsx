'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { memo, useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import ServicesCard from './ServicesCard';
import PortfolioCard from './PortfolioCard';

import {
  CardData,
  PortfolioItem,
} from '@/data/data';

type AllowedCard = CardData | PortfolioItem;

interface GenericSliderProps<T extends AllowedCard> {
  data: T[];
  slidesPerView: number;
  heightClass?: string;
  cardType: 'hover' | 'portfolio';
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
  const isPortfolio = cardType === 'portfolio';

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
    return (
      <div className={`relative w-full flex flex-col justify-center items-center ${heightClass || ''}`}>
        <div className={`w-full px-4 sm:px-6 lg:px-0 max-w-[1440px]`}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`relative w-full flex flex-col justify-center items-center ${heightClass || ''}`}>
      <div className="w-full px-4 sm:px-6 lg:px-0 max-w-[1440px]">
        <Swiper
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          loop={data.length > 2}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: isPortfolio ? 1 : 2,
              spaceBetween: 18,
            },
            850: {
              slidesPerView: isPortfolio ? 2 : 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: isPortfolio ? 3 : Math.min(slidesPerView, 3),
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: isPortfolio ? 3 : slidesPerView,
              spaceBetween: 20,
            },
          }}
          className={isPortfolio ? "!pb-16 !overflow-visible" : "!pb-16"}
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={'slug' in item ? item.slug : `${item.title}-${index}`}
              className="!flex justify-center"
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export const GenericSlider = memo(GenericSliderComponent) as typeof GenericSliderComponent;
