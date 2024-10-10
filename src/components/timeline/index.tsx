import { useEffect, useRef, useState } from "react";
import slidePage from "slidePage";
import mockData from "../enter/mockData";
import gsap from "gsap";
import AnimDate from "../animdate";

import "slidePage/slidePage.css";
import "./index.less";
import { MusicIcon } from "../../assets/svg";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let currentSource = null; // 当前播放的音频源

// 淡出当前音频
function fadeOut(source, duration) {
  const gainNode = audioCtx.createGain();
  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
  return new Promise((resolve) => {
    gainNode.onended = () => {
      source.stop(); // 停止当前音频
      resolve();
    };
  });
}

// 淡入下一首音频
function fadeIn(audioBuffer) {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  const gainNode = audioCtx.createGain();
  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.5); // 淡入时间0.5秒
  source.start(0);
  return source;
}

// 加载音频并播放
function loadAndPlayAudio(url) {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((data) => audioCtx.decodeAudioData(data))
    .then((audioBuffer) => {
      if (currentSource) {
        // 如果当前有音频正在播放，先淡出
        fadeOut(currentSource, 0.5).then(() => {
          alert("fade in");
          // 淡出完成后，开始播放新的音频
          currentSource = fadeIn(audioBuffer);
        });
      } else {
        // 如果没有音频正在播放，直接淡入
        currentSource = fadeIn(audioBuffer);
      }
    })
    .catch((error) => console.error("Error loading audio file:", error));
}

// // 示例：加载并播放音频
// loadAndPlayAudio("path/to/your/audio/file.mp3");

function Timeline() {
  const [nextActiveIndex, setNextActiveIndex] = useState(0);
  const [currActiveIndex, setCurrActiveIndex] = useState(0);
  const slidepageRef = useRef(null);

  const imgListRef = useRef<React.LegacyRef<HTMLImageElement>[]>([]);
  const audioRef = useRef();
  const nameRef = useRef();
  const prevTimeLineRef = useRef();
  const rootRef = useRef();
  const animDateRef = useRef();
  const specialEffectRef = useRef();
  const musicIconRef = useRef();

  useEffect(() => {
    if (slidepageRef.current) {
      return;
    }

    slidepageRef.current = new slidePage({
      slideContainer: "#slide-container",
      slidePages: ".slide-page",
      page: 1,
      refresh: true,
      dragMode: false,
      useWheel: true,
      useSwipe: true,
      useAnimation: true,

      // Events
      before: function (origin, direction, target) {
        gsap.to(nameRef.current, {
          duration: 0,
          opacity: 0,
        });
        setNextActiveIndex(target - 1);
        gsap.to(specialEffectRef.current, {
          duration: 0.15,
          opacity: 0,
        });
      },
      after: function (origin, direction, target) {
        setCurrActiveIndex(target - 1);
        gsap.to(nameRef.current, {
          duration: 0.5,
          opacity: 1,
        });
        animDateRef.current.animationManager.current.animToNext(
          mockData[target - 1].date.split("-"),
          Boolean(direction === "prev")
        );
        if (mockData[target - 1].important) {
          gsap.to(specialEffectRef.current, {
            duration: 0.15,
            opacity: 0.7,
          });
        }
      },
    });

    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    const currImgRef = imgListRef.current[nextActiveIndex];
    if (!currImgRef) {
      return;
    }

    if (prevTimeLineRef.current) {
      prevTimeLineRef.current.kill();
      prevTimeLineRef.current = null;
    }

    const duration = 4;

    const animImage = (offsetWidth) => {
      const moveDirection = (offsetWidth - document.body.clientWidth) / 2;
      const tl = gsap.timeline({
        repeat: Infinity,
        ease: "none",
        repeatDelay: 0,
      });
      tl.to(currImgRef, {
        x: -moveDirection,
        ease: "none",
        delay: 0.5,
        duration: duration / 2,
      });
      tl.to(currImgRef, {
        x: moveDirection,
        ease: "none",
        duration: duration,
        delay: 0.5,
      });
      tl.to(currImgRef, {
        x: 0,
        ease: "none",
        delay: 0.5,
        duration: duration / 2,
      });
      prevTimeLineRef.current = tl;
    };

    const handleImageLoad = () => {
      animImage(currImgRef.offsetWidth);
    };

    const offsetWidth = currImgRef.offsetWidth;

    if (!offsetWidth) {
      currImgRef.addEventListener("load", handleImageLoad);

      return () => {
        currImgRef.removeEventListener("load", handleImageLoad);
      };
    } else {
      animImage(offsetWidth);
    }
  }, [nextActiveIndex]);

  // useEffect(() => {
  //   // 加载音频文件
  //   loadAndPlayAudio(mockData[nextActiveIndex].bgm);
  // }, [nextActiveIndex]);

  useEffect(() => {
    gsap.to(rootRef.current, {
      duration: 0.8,
      opacity: 1,
      scale: 1,
    });
    animDateRef.current.animationManager.current.animToNext(
      mockData[0].date.split("-")
    );

    gsap.to(specialEffectRef.current, {
      yoyo: true,
      repeat: Infinity,
      duration: 1.8,
      ease: "none",
      // opacity: 1,
      "--effect-brightness": 1.2,
    });

    gsap.to(musicIconRef.current, {
      repeat: Infinity,
      rotate: 360,
      duration: 4.5,
      ease: "none",
    });
  }, []);

  return (
    <div
      className="relative timeline w-[100%] h-[100%] opacity-0 relative"
      ref={rootRef}
    >
      <div className="slide-container" id="slide-container">
        <audio
          src={mockData[nextActiveIndex].bgm}
          autoPlay
          loop
          ref={audioRef}
        ></audio>
        {mockData.map(({ background, name }) => {
          return (
            <div className="slide-page" key={name}>
              {/* <div className="w-[100%] h-[100%]"> */}
              <div className="w-[100%] h-[100%] flex justify-center">
                <img
                  ref={(ref) => imgListRef.current.push(ref)}
                  className="h-[100%] max-w-[unset]"
                  src={background}
                />
              </div>
              {/* </div> */}
            </div>
          );
        })}
      </div>
      <div
        className="specail-effect w-full h-full absolute top-0 left-0 pointer-events-none opacity-0"
        ref={specialEffectRef}
      />
      <div
        ref={musicIconRef}
        className=" absolute top-[30px] right-[30px] z-10"
      >
        <MusicIcon />
      </div>
      <AnimDate
        ref={animDateRef}
        className="title absolute bottom-[136px] left-[25px] text-white z-10"
        fontSize={20}
      />
      <div
        className="title absolute bottom-[80px] left-[30px] text-white font-bold text-[36px] z-10"
        ref={nameRef}
      >
        {mockData[nextActiveIndex].name}
        <div className="bg-white h-[2px] w-[50%] absolute bottom-[-8px] transition-all shadow" />
      </div>
    </div>
  );
}

export default Timeline;
