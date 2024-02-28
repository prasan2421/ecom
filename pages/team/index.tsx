import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, GetStaticProps } from "next";
import {
  getAllTeamPosts,
  getAllAboutPosts,
  getAllStaffPosts,
} from "../../lib/api";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AboutCover from "../../public/images/about-cover.png";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Container from "../../components/container";
import Image from "next/image";

// import required modules

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
      <ChevronLeftIcon className="text-black dark:text-white h-5 lg:h-10 w-5 lg:w-10 bg-red-600 rounded-lg" />
    </div>
  );
};

function team({ allPosts: { edges }, allAbout, allStaffposts }) {
  const morePosts = edges;
  const router = useRouter();
  const [staffs, setStaffs] = useState([]);
  // const [allAboutData, setAllAboutData] = useState<any[]>(([]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    pagination: true,
    // autoplay: true,
    slidesToShow: 4,
    centerPadding: "60px",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    speed: 500,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  useEffect(() => {
    // Update the document title using the browser API
    console.log(allAbout);

    setStaffs(allStaffposts.edges.reverse());
  }, [allStaffposts]);

  return (
    <>
      <div>
        <div className="flex justify-center">
          <h1 className="team absolute z-10 mt-20 text-center leading-none font-bold text-2xl text-neutral-200 dark:text-neutral-200 uppercase team-headline">
            About us
          </h1>
          <Image
            src={AboutCover.src}
            width={1600}
            height={1000}
            alt="The team"
            className="bg-cover bg-center brightness-75 max-w-7xl mx-auto team-width mt-20"
          />
        </div>
      </div>
      <Container>
        <div className="mb-20 p-5">
          {allAbout.edges.map((item: any, index) => (
            <div
              className={
                index % 2 === 0
                  ? " md:flex gap-10 flex-row mt-20 xl:mt-40 items-center"
                  : "md:flex gap-10 flex-row-reverse mt-20 xl:mt-40 items-center"
              }
            >
              <div className="flex-1  text-black dark:text-white ">
                <h1 className="text-3xl mb-5">{item.node.title}</h1>
                <div className=" text-gray-400">
                  {/* We need to have the paragraphs come through here. */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.node.customAboutField.description,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4 md:mt-0 flex-1 h-full w-full">
                <img
                  key={index}
                  src={item.node.featuredImage.node.sourceUrl}
                  className={
                    item.node.featuredImagel
                      ? " bg-black h-full w-full md:h-full md:w-full lg:h-full  lg:w-full object-cover"
                      : " bg-black"
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="px-8 md:px-14 ">
          <h1 className="text-3xl py-10 text-center text-gray-900 dark:text-slate-100">
            Staff
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-10 sm:px-20  md:px:36  lg:px-40 py-10">
            {staffs.map((item: any, index) => (
              // Reverse array here
              <div>
                <div className="text-center pt-5">
                  <div className="font-bold text-stone-300">
                    {item.node.customStaffField.title}
                  </div>
                  <div className="text-stone-400">
                    {item.node.customStaffField.subheader}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      {/* <ContactBanner /> */}
    </>
  );
}

export default team;

export const getServerSideProps: GetServerSideProps = async ({ preview = false }) => {
  const allPosts = await getAllTeamPosts(preview);
  const allAbout = await getAllAboutPosts(preview);
  const allStaffposts = await getAllStaffPosts(preview);

  return {
    props: { allPosts, allAbout, allStaffposts },
    // revalidate: 10,
  };
};
