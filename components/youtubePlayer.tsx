import YouTube, { YouTubeProps } from "react-youtube";

export default function YouTubePlayer  ({ videoId, width }) {
    const handleVideoReady = (event) => {
      // Video is ready to be played
    };
  
    const handleVideoPlay = (event) => {
      // Video has started playing
    };
  
    const playerOptions = {
      width: width,
      height: 220,
    };
  
    return (
      <div className="w-full h-56">
        <YouTube
          videoId={videoId}
          opts={playerOptions}
          onReady={handleVideoReady}
          onPlay={handleVideoPlay}
          // Add more event handlers here
        />
      </div>
    );
  };