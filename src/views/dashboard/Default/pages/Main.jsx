import React from "react";
import "../App.scss";

import Chat from "../components/chat";
import VideoChat from "../components/chat/video";
// import InternetChat from "../components/chat/internet";
import LectureVideo from "../components/watch/lecture";
// import TutorialVideo from "../components/watch/tutorial";

function Main({ mode }) {
  return (
    <>
      <div style={{height: "100%", maxHeight: "calc(100% - 70px)", display: mode !== 0 ? "none" : undefined}}>
        <Chat />
      </div>

      <div style={{height: "100%", maxHeight: "calc(100% - 70px)", display: mode !== 1 ? "none" : undefined}}>
        <VideoChat />
      </div>

      <div style={{position: "relative", height: "100%", maxHeight: "calc(100% - 70px)", flexDirection: "column",
                    justifyContent: "center", display: mode !== 2 ? "none" : "flex"}}>
        <LectureVideo />
      </div>

      {/* <div style={{position: "relative", height: "100%", maxHeight: "calc(100% - 70px)", flexDirection: "column",
                    justifyContent: "center", display: mode !== 3 ? "none" : "flex"}}>
        <InternetChat />
      </div> */}
    </>
  );
}

export default Main;
