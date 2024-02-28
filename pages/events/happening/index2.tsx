import React from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'
import { getAllTeamPosts, getAllEventsPosts, getAllHappeningData } from '../../../lib/api'
import YouTube, { YouTubeProps }  from 'react-youtube';
import { useEffect, useState, createRef,useRef } from 'react'
import ContactBanner from '../../../components/contact-banner'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
// import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useRouter } from 'next/router';
// Import Slick React components
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link'
import Slider from "react-slick";
// Import Swiper React components
import { Swiper, SwiperSlide,useSwiper } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from './styles.module.css';
// import required modules
import  { Grid, Pagination, FreeMode, Navigation, Thumbs } from "swiper";
import Container from '../../../components/container';


function happening( { allHappeningData}) {
  const router = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

 

  return (
    
    <div className=" mt-20">
   <Container>
   {/* <div className='pt-10 '>
            {morePosts && (
      <Slider {...settingsTop}>
    {morePosts.map((slideContent, index) => (
        <div className='p-3'>
           <Link
              href={`/posts/${slideContent.node.slug}`}
              className="flex flex-col items-center"
             
            >
         
          <div className='h-96 w-4/5 bg-black dark:bg-white'>
                  <div className=' bg-white'/>
                </div>
          </Link>
        </div>
      ))}
    </Slider>
    )}
            </div> */}

            <div  className='flex flex-col  text-black dark:text-white items-center '>
                {/* <h1 className='text-3xl mb-5'>PAST CONFERENCE</h1> */}
                <div className='w-full h-auto bg-white mt-10'>
                <img className='w-full max-h-72 bg-white object-cover'  src={allHappeningData.featuredImage.node.sourceUrl} />
                </div>

                <div  className='flex-1  text-black dark:text-white'>
 <h1 className='text-3xl my-5'>{allHappeningData.customHappeningField.title}</h1>
 {/* <p className='text-justify text-gray-400'>
 {allHappeningData.customHappeningField.description} </p> */}

 <p className='text-justify text-gray-400' dangerouslySetInnerHTML={{ __html: allHappeningData.content }} />
 </div>
               

                <div>
                <div className=" flex flex-1 justify-center md:justify-end items-center mt-10 md:mt-0 ">
            <button className="bg-white my-10 px-10 py-3 text-red-500 font-bold rounded-sm " onClick={()=> router.push('https://tedxtrondheim.hoopla.no/sales/event/3184811531')}>Buy tickets</button>
            {/* <button className="border-solid border-2 border-red-500   px-10 py-3 text-red-500 rounded-lg" onClick={()=> router.push('/contact') }>Contact us</button> */}
            </div>
                </div>
          
              </div>

            
      
             </Container>
             
    </div>
   
  )
}

export default happening

export const getServerSideProps: GetServerSideProps = async ({ preview = false }) => {
  // const allPosts = await getAllTeamPosts(preview)
  const allHappeningData = await getAllHappeningData(preview)
  // const allEventsPosts = await getAllEventsPosts(preview)


  return {
    props: { allHappeningData },
    // revalidate: 10,
  }

}