import { useRef, useState, useEffect } from "react";
import { MusicIcon } from "@/assets/svg";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Virtual, Controller } from "swiper/modules";
import gsap from "gsap";
import AnimDate from "../animdate";
import TimeBar from "../timebar";
import { playMusic, unloadMusic } from "@/manager/MusicManager";

import { EffectCards } from "swiper/modules";
import mockData from "../enter/animMockData";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/virtual";
import "./index.less";

const genImageAnimTimeline = (imageNode, offset, duration = 5) => {
  if (!imageNode) {
    return null;
  }
  const tl = gsap.timeline({
    repeat: Infinity,
    ease: "none",
    repeatDelay: 3,
    onRepeat: () => {
      imageNode.style.transform = "none";
    },
  });
  tl.to(imageNode, {
    x: -offset,
    ease: "none",
    delay: 0.5,
    duration: duration / 2,
  });
  tl.to(imageNode, {
    x: offset,
    ease: "none",
    duration: duration,
    delay: 0.5,
  });
  tl.to(imageNode, {
    x: 0,
    ease: "none",
    delay: 0.5,
    duration: duration / 2,
    onComplete: () => {
      imageNode.style.transform = "none";
    },
  });

  return tl;
};

const TimelineV2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const animDateRef = useRef();
  const nameRef = useRef();
  const commentRef = useRef();
  const musicIconRef = useRef();
  const activeImgRef = useRef();
  const activeAnimTLRef = useRef();
  const prevAnimTLRef = useRef();
  const specialEffectRef = useRef();
  const progressTimerRef = useRef();
  const swiperRef = useRef<SwiperClass>();
  const [musicProgress, setMusicProgress] = useState(0);

  const startPlayMusic = (index: number, swiper: SwiperClass, progressRef) => {
    const howler = playMusic(mockData[index].bgm, {
      onend: () => {
        swiper?.slideNext();
      },
      onplay: () => {
        progressRef.current = setInterval(() => {
          setMusicProgress(howler.seek() / howler.duration());
        }, 1000);
      },
    });
  };

  const handleSwiperChange = (swiper: SwiperClass) => {
    const nextIndex = swiper.activeIndex;
    const isNext = activeIndex < nextIndex;

    animDateRef.current?.animationManager.current.animToNext(
      mockData[nextIndex].date.split("-"),
      !isNext
    );

    setActiveIndex(nextIndex);

    gsap.to([nameRef.current, commentRef.current], {
      duration: 0.5,
      opacity: 1,
    });

    //找到类名为 bg-image 元素
    setTimeout(() => {
      activeImgRef.current =
        swiper.visibleSlides[0]?.querySelector(".bg-image");
      specialEffectRef.current =
        swiper.visibleSlides[0]?.querySelector(".special-effect");

      const offset = (activeImgRef.current.clientWidth - swiper.width) / 2 - 30;
      if (activeAnimTLRef.current) {
        activeAnimTLRef.current.revert();
        activeAnimTLRef.current = null;
      }
      activeAnimTLRef.current = genImageAnimTimeline(
        activeImgRef.current,
        offset
      );

      if (specialEffectRef.current) {
        gsap.to(specialEffectRef.current, {
          yoyo: true,
          repeat: Infinity,
          duration: 1.8,
          ease: "none",
          "--effect-brightness": 1.2,
        });
      }
    }, 500);

    setMusicProgress(0);
    clearInterval(progressTimerRef.current);
    startPlayMusic(nextIndex, controlledSwiper, progressTimerRef);
    // const howler = playMusic(mockData[nextIndex].bgm, {
    //   onend: () => {
    //     controlledSwiper?.slideNext();
    //   },
    //   onplay: () => {
    //     progressTimerRef.current = setInterval(() => {
    //       setMusicProgress(howler.seek() / howler.duration());
    //       console.log("howler.seek()", howler.seek() / howler.duration());
    //     }, 1000);
    //   },
    // });
  };

  const handleSliderTransitionEnd = (swiper) => {
    // activeImgRef.current = swiper.visibleSlides[0]?.querySelector(".bg-image");
    // console.log(
    //   "activeImgRef.current",
    //   activeImgRef.current,
    //   swiper.activeIndex,
    //   swiper
    // );
    // setTimeout(() => {
    //   const offset = (activeImgRef.current.clientWidth - swiper.width) / 2 - 30;
    //   if (activeAnimTLRef.current) {
    //     activeAnimTLRef.current.kill();
    //     activeAnimTLRef.current = null;
    //   }
    //   activeAnimTLRef.current = genImageAnimTimeline(
    //     activeImgRef.current,
    //     offset
    //   );
    // });
  };

  const handleBeforeSlideChangeStart = () => {
    gsap.to([nameRef.current!, commentRef.current], {
      duration: 0,
      opacity: 0,
    });

    if (prevAnimTLRef.current) {
      prevAnimTLRef.current.kill();

      prevAnimTLRef.current = activeAnimTLRef.current;
    }

    // if (activeImgRef.current) {
    //   activeImgRef.current.style.transform = "none";
    // }
    // unloadMusic();
  };

  useEffect(() => {
    const init = async () => {
      animDateRef.current?.animationManager.current.animToNext(
        mockData[activeIndex].date.split("-")
      );

      setTimeout(() => {
        const swiper = swiperRef.current.swiper;
        activeImgRef.current =
          swiper.visibleSlides[0]?.querySelector(".bg-image");

        const offset = -(
          (activeImgRef.current.clientWidth - swiper.width) / 2 -
          30
        );
        activeAnimTLRef.current = genImageAnimTimeline(
          activeImgRef.current,
          offset
        );

        setMusicProgress(0);
        startPlayMusic(0, swiper, progressTimerRef);
      }, 16);
      // playMusic(mockData[0].bgm, {
      //   onend: () => {
      //     controlledSwiper?.slideNext();
      //   },
      // });

      gsap.to(musicIconRef.current, {
        repeat: Infinity,
        rotate: 360,
        duration: 4.5,
        ease: "none",
      });
    };

    init();

    return () => {
      unloadMusic();
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#2B2B2B] overflow-hidden ">
      <div className="justify-center flex p-4 text-[24px]"></div>
      <div className="px-12">
        <Swiper
          ref={swiperRef}
          className="mt-6"
          virtual={{
            addSlidesBefore: 1,
            addSlidesAfter: 1,
          }}
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Virtual, Controller]}
          onActiveIndexChange={handleSwiperChange}
          onSlideChangeTransitionStart={handleBeforeSlideChangeStart}
          onSlideChangeTransitionEnd={handleSliderTransitionEnd}
          onSwiper={setControlledSwiper}
        >
          {mockData.map((data) => (
            <SwiperSlide key={data.name}>
              <img
                className="bg-image h-[101%] object-cover max-w-none"
                src={data.background}
              />
              {data.importantType && (
                <div
                  className={`special-effect special-effect-${data.importantType} w-full h-full absolute top-0 left-0`}
                />
              )}
            </SwiperSlide>
          ))}
          <div
            className="title absolute bottom-[30px] left-[20px] text-white font-bold text-[30px] z-10 inline-block whitespace-nowrap overflow-hidden  pointer-events-none text-ellipsis"
            ref={nameRef}
          >
            {mockData[activeIndex].name}
          </div>
          <AnimDate
            ref={animDateRef}
            className="title absolute bottom-[76px] left-[16px] text-white z-10 drop-shadow pointer-events-none"
            fontSize={16}
          />
        </Swiper>
      </div>
      <div className="flex flex-col relative h-[200px]">
        <div className="info h-full mb-[50px] mt-[20px] text-white text-sm overflow-y-auto px-[30px] mx-4">
          <div className="bg" />
          <div className="content" ref={commentRef}>
            {mockData[activeIndex].comment}
          </div>
        </div>
        <TimeBar
          currIndex={activeIndex}
          data={mockData}
          className="absolute bottom-0 h-[100px]"
        />
      </div>
      <div className="flex justify-center flex-col items-center">
        <div
          className="h-[0.5px] w-full bg-white mt-1"
          style={{
            width: musicProgress * 100 + "%",
            transition: "all 0.5s",
          }}
        />
        <div className="text-xs m-2">{mockData[activeIndex].bgmName}</div>
      </div>
      <div
        ref={musicIconRef}
        className="absolute top-[20px] right-[20px] z-10"
        onClick={() => console.log("sss", controlledSwiper.slideNext())}
      >
        <MusicIcon />
      </div>
    </div>
  );
};

export default TimelineV2;
