import Head from "next/head";
import { GetStaticProps,GetServerSideProps , GetStaticPaths,} from "next";
import {
  getAllPostsForHome,
  getAllHomeData,
  getAllSpeakerPosts,
  getAllPartnerPosts,
  getAllYtData,
} from "../lib/api";
import { useEffect, useState, createRef, useRef } from "react";

import OurPartners from "../components/our-partners";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

// Import Slick React components
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Grid, Pagination, Navigation } from "swiper";
import YouTubePlayer  from "../components/youtubePlayer";



interface MyComponentState {
  items: any[]; // Replace 'any[]' with the actual type of your items
}

export default function Index({
  allYtData,
  allHomeData,
  allSpeakerPosts,
}) {
  const swiperRef = useRef(null);
  const initialState: MyComponentState = {
    items: [], // Initialize with an empty array or the appropriate initial value
  };

  const [fetchedVideos, setFetchedVideos] =
    useState<MyComponentState>(initialState);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setFetchedVideos({ items: allYtData.items });
  }, []);

  return (
    <>
      <Head>
        <title>TEDxTrondheim</title>

        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </Head>

      <div className="flex h-screen flex-col">
        <div
          className="relative isolate flex flex-1 mt-20 bg-cover-image bg-cover"
          style={{
            backgroundImage: `url(${allHomeData.featuredImage.node.sourceUrl})`,
          }}
        >
          <div className="justify-center md:justify-start flex-1 flex items-center bg-gradient-to-r from-semi-black from-100%  ">
            <article className="px-20 md:px-40 lg:px-60 text-center leading-none   text-xl lg:text-2xl font-bold text-neutral-200 dark:text-neutral-200 ">
             {allHomeData.customHomeField.title }
            </article>
          </div>
        </div>
      </div>

      {/* --------------------- INFO BANNER---------------------  */}
      <div>
        <div className="w-full  bg-red-600 text-center py-4 text-white overflow-hidden">
          <div>
            <p className="text-2xl font-semibold">Since 2011 more than</p>
          </div>
          <div className="flex justify-evenly pt-5 ">
            <div className="px-5 font-semibold">
              <p>{allHomeData.customHomeField.attendees}</p>
              <p>Attendees</p>
            </div>
            <div className="px-5 font-semibold">
              <p>{allHomeData.customHomeField.speakers}</p>
              <p>Events</p>
            </div>
            <div className="px-5 font-semibold">
              <p>{allHomeData.customHomeField.users}</p>
              <p>Users reached</p>
            </div>
          </div>
        </div>

        {/* ---------------------RECENT SHOWS---------------------  */}

        {/* Slider for recent videos start*/}

        <div className="mt-20 px-8 md:px-14 ">
          <h1 className=" text-xl md:text-2xl  text-gray-900 dark:text-slate-100 ">
            Recent talks
          </h1>

          <div className="mt-10">
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

                  slidesPerView: 4,
                  grid: {
                    // rows: 2,
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
              // className="mySwiper "
            >
              {fetchedVideos &&
                fetchedVideos.items.map((video: any, index) => (
                  <SwiperSlide >
                    <div key={index}>
                      <YouTubePlayer videoId={video.id.videoId} width="100%" />
                      {/* <h2 className="text-lg font-medium py-5 bg-black ">
                      {video.snippet.title}
                    </h2> */}
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>

        {/* Slider for recent videos end*/}

        {/* Speakers swiper */}
        <div className="mt-20 px-8 md:px-14">
          <h1 className=" text-xl md:text-2xl  text-gray-900 dark:text-slate-100 ">
            Latest Speakers
          </h1>

          <div className="mt-10   ">

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

                  slidesPerView: 4,
                  grid: {
                    // rows: 2,
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
              className="mySwiper "
            >
              {allSpeakerPosts && allSpeakerPosts.edges.map((item: any, index) => (
                <SwiperSlide style={{ paddingBottom: 30 }}>
                  <img
                    src={
                      item.node.featuredImage != null
                        ? item.node.featuredImage.node.sourceUrl
                        : null
                    }
                    className={"bg-black dark:bg-white"}
                  />

                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <OurPartners />
        {/* <ContactBanner /> */}
      </div>
    </>
  );
}



export const getServerSideProps: GetServerSideProps = async ({ preview = false }) => {
  const allHomeData = await getAllHomeData(preview);
  const allSpeakerPosts = await getAllSpeakerPosts(preview);
  const allPartnerPosts = await getAllPartnerPosts(preview);
  const allYtData = await getAllYtData(
    apiKey,
    null,
    "2015-01-01T00:00:00Z",
    "2024-01-01T00:00:00Z"
  );

  return {
    props: { allSpeakerPosts, allPartnerPosts, allHomeData, allYtData },
    // revalidate: 10,
  };
};
