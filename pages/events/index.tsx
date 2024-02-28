import React from "react";
import { GetStaticProps } from "next";
import {
  getAllGalleryData,
  getAllYtData,
} from "../../lib/api";
import YouTube, { YouTubeProps } from "react-youtube";
import { useEffect, useState, createRef, useRef } from "react";
import ContactBanner from "../../components/contact-banner";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import TheGallerySlider from "../../components/gallery";

// Import Slick React components
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./styles.module.css";
// import required modules
import { Grid, Pagination, FreeMode, Navigation, Thumbs } from "swiper";
import Container from "../../components/container";
import YouTubePlayer from "../../components/youtubePlayer";

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const allYears = [
  { id: 1, title: 2015, afterDate:'2015-01-01T00:00:00Z' , beforeDate:'2016-01-01T00:00:00Z' },
  { id: 2, title: 2016, afterDate:'2016-01-01T00:00:00Z' , beforeDate:'2017-01-01T00:00:00Z' },
  { id: 3, title: 2017, afterDate:'2017-01-01T00:00:00Z' , beforeDate:'2018-01-01T00:00:00Z' },
  { id: 4, title: 2018, afterDate:'2018-01-01T00:00:00Z' , beforeDate:'2019-01-01T00:00:00Z' },
  { id: 5, title: 2019, afterDate:'2019-01-01T00:00:00Z' , beforeDate:'2020-01-01T00:00:00Z' },
  { id: 6, title: 2020, afterDate:'2020-01-01T00:00:00Z' , beforeDate:'2021-01-01T00:00:00Z' },
  { id: 7, title: 2021, afterDate:'2021-01-01T00:00:00Z' , beforeDate:'2022-01-01T00:00:00Z' },
  { id: 8, title: 2022, afterDate:'2022-01-01T00:00:00Z' , beforeDate:'2023-01-01T00:00:00Z' },
  { id: 9, title: 2023, afterDate:'2023-01-01T00:00:00Z' , beforeDate:'2024-01-01T00:00:00Z' },
];

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ChevronRightIcon className="text-black dark:text-white h-5 lg:h-10 w-5 lg:w-10 bg-red-600 rounded-lg" />
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <div className={`${className}`} onClick={onClick}>
      <ChevronLeftIcon className="text-white dark:text-white h-5 lg:h-10 w-5 lg:w-10 bg-red-600 rounded-lg" />
    </div>
  );
};

interface MyComponentState {
  items: any[]; // Replace 'any[]' with the actual type of your items
}

function events({ allYtData, allGalleryData }) {
  const initialState: MyComponentState = {
    items: [], // Initialize with an empty array or the appropriate initial value
  };

  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedYearId, setSelectedYearId] = useState(1);
  const [swiper, setSwiper] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [fetchedVideos, setFetchedVideos] =
    useState<MyComponentState>(initialState);

  // const morePosts = edges;
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    console.log("Watch videos again" + JSON.stringify(allYtData));
    // console.log('New token again :'+allYtData.nextPageToken)
   
    if(allYtData.items && allYtData.items.length>0){
      if(allYtData.nextPageToken){
        setToken(allYtData.nextPageToken)
      }else{
        setToken(null)
      }
     
      setFetchedVideos({ items: allYtData.items });
      setSelectedVideoId( allYtData.items[0].id.videoId);
    }
  }, []);

  const onYearSelect= async(item,index)=>{
    setToken(null);
    setSelectedYearId(item.id);
    setFetchedVideos( {items: []});
    const allYtDataNew = await getAllYtData( apiKey, null,allYears[index].afterDate,allYears[index].beforeDate)
    // console.log('Watch videos fetched second'+data1.length)
    if(allYtDataNew.items && allYtDataNew.items.length>0){
    
      if(allYtDataNew.nextPageToken){
setToken(allYtDataNew.nextPageToken)
      }

      setSelectedVideoId( allYtDataNew.items[0].id.videoId);
      console.log("Watch videos year" + JSON.stringify(allYtDataNew.items.length));
    setFetchedVideos({items:allYtDataNew.items})
    }
  }

  const settings = {
    className: "items-center sliderYearContainer",
    centerMode: true,
    infinite: true,
    pauseOnHover: true,
    speed: 500,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };


  return (
    <div className="">
      <Container>

        <div className="flex mt-20 flex-col pt-10 text-black dark:text-white items-center ">
        
          <div className="w-full h-auto bg-white">
            <YouTubePlayer videoId={selectedVideoId} width="100%" />
          </div>
        </div>
        <div className="bg-black p-5 my-10 justify-center">
          <Swiper
         
            navigation={true}
            slidesPerView={1}
            breakpoints={{
              0: {
                // width: 576,

                slidesPerView: 2,
                grid: {
                  // rows: 2,
                  fill: "row",
                },
              },
              576: {
                // width: 576,

                slidesPerView: 2,
                grid: {
                  // rows: 2,
                  fill: "row",
                },
              },
              768: {
                // width: 768,

                slidesPerView: 2,
                grid: {
                  // rows: 2,
                  fill: "row",
                },
              },
              992: {
                // width: 768,

                slidesPerView: 3,
                grid: {
                  // rows: 2,
                  fill: "row",
                },
              },
              1200: {
                // width: 768,

                slidesPerView: 6,
                grid: {
                  // rows: 2,
                  fill: "row",
                },
              },
            }}
            ref={swiperRef}
            spaceBetween={20}
            {...settings}
            modules={[Grid, Pagination, Navigation]}
          >
            {allYears.map((item: any, index) => (
              <SwiperSlide >
                <div onClick={()=>onYearSelect(item,index)} className={`text-sm  text-white p-2 bg-red-600 ${item.id == selectedYearId?'p-4': 'p-2'} transition-all `}>
                  {item.title} 
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-black dark:text-white  relative text-center pb-20">
          
          <Swiper
             navigation={true}
            onSwiper={(swiper) => setSwiper(swiper)}
            breakpoints={{
              576: {
                // width: 576,

                slidesPerView: 2,
                grid: {
                  rows: 1,
                  fill: "row",
                },
              },
              768: {
                // width: 768,

                slidesPerView: 2,
                grid: {
                  rows: 1,
                  fill: "row",
                },
              },
              992: {
                // width: 768,

                slidesPerView: 3,
                grid: {
                  rows: 2,
                  fill: "row",
                },
              },
              1200: {
                // width: 768,

                slidesPerView: 3,
                grid: {
                  rows: 2,
                  fill: "row",
                },
              },
            }}
            ref={swiperRef}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Grid, Pagination, Navigation]}
            className="h-full"
          >

            {fetchedVideos.items.length > 0 ?
              fetchedVideos.items.map((video: any,index) => (
                <SwiperSlide>
                  <div
                  className={styles.imageContainer}
                    onClick={() => setSelectedVideoId(video.id.videoId)}
                    key={video.id.videoId}
                  >
                 
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt="TedXTrondheim event video."
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                    <h2 className="oneLine text-sm md:text-lg font-medium  ">
                      {video.snippet.title}
                      {/* {index} */}
                    </h2>
                  </div>
                </SwiperSlide>
              ))
           :
           <div> <h4 className="text-xl py-10 text-center">No videos found for this date.</h4></div>
            }
          </Swiper>
        </div>
        <TheGallerySlider />
      </Container>
      <ContactBanner />
    </div>
  );
}

export default events;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allGalleryData = await getAllGalleryData(preview);
  const allYtData = await getAllYtData(apiKey, null,allYears[0].afterDate,allYears[0].beforeDate);
  return {
    props: { allYtData, allGalleryData },
    revalidate: 10,
  };
};
