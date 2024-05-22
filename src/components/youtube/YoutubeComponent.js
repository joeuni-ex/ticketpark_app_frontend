import React from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";

function YoutubeComponent({ videoId, dsc, src }) {
  const youtubeOption = {
    width: "384",
    height: "280",
    playerVars: {
      autoplay: 1, //자동재생 O
      rel: 0, //관련 동영상 표시하지 않음
      modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
    },
  };

  return (
    <div className="flex flex-col items-center border  w-96 overflow-hidden">
      <YouTube
        videoId={videoId}
        opts={youtubeOption}
        //이벤트 리스너
        onEnd={(e) => {
          e.target.stopVideo(0);
        }}
        onReady={(e) => {
          e.target.mute(); //음소거
        }}
      />
      <Link>
        <div className="flex items-center w-96 justify-around p-3">
          <div className="min-w-16 min-h-20 w-20 h-16 overflow-hidden">
            <img src={src} alt="youtube_image" />
          </div>
          <div className="font-bold text-stone-900">{dsc}</div>
        </div>
      </Link>
    </div>
  );
}

export default YoutubeComponent;
