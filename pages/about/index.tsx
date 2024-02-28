import { useEffect, useState, useRef } from 'react';
import YouTube, { YouTubeProps }  from 'react-youtube';
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export default function VideosPage(videos:any) {

  return (

    <div className="py-20" >
     
      <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10">
      </div>
      </div>
    </div>
  );
}


export async function getStaticProps() {
  const response = await fetch (`https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=UCnXXusQQ65Q6vPRe0ve26cA&part=snippet&type=video`)
  const videos = await response.json();

  return {
    props: {
      // response.data.items
      videos
    },
  };
}