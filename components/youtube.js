import { google } from 'googleapis';
import { GetStaticProps } from 'next'

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const getChannelVideos=async ()=> {
  try {
    const response = await 'https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyD7A1fIVaRcqwK6l187-BB52JiEqr7Lmdc&channelId=UCnXXusQQ65Q6vPRe0ve26cA&part=snippet&type=video'

    return response.data.items;
  } catch (error) {
    console.error('Error listing videos:', error);
    return [];
  }
}

export default async (req, res) => {
  const videos = await getChannelVideos();
  res.json(videos);
};
  
