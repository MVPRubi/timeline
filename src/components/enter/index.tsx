import { useEffect, useRef, useState } from "react";
import Preload from "preload-it";
import { getPreloadResource } from "@/utils";
import animMockData from "./animMockData";
import musicMockData from "./musicMockData";
import { useNavigate } from "react-router-dom";
import AnimDate from "../animdate";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";

import gsap from "gsap";

import AirIcon from "../../assets/icon.svg";
import { CalendarIcon } from "../../assets/svg";

import "./index.less";
import "swiper/css";

type Tween = gsap.core.Tween;

// function interpolateColor(color1, color2, factor) {
//   // 将颜色字符串转换为RGB数组 [R, G, B]
//   function colorToRGB(color) {
//     const rgb = color.match(/\d+/g);
//     return rgb ? rgb.map(Number) : null;
//   }

//   // 线性插值函数
//   function lerp(start, end, factor) {
//     return start + (end - start) * factor;
//   }

//   // 颜色格式化为CSS颜色字符串
//   function rgbToColor(rgb) {
//     return `rgb(${rgb.join(",")})`;
//   }

//   // 将两种颜色转换为RGB数组
//   const rgb1 = colorToRGB(color1);
//   const rgb2 = colorToRGB(color2);

//   if (!rgb1 || !rgb2) {
//     throw new Error("Invalid color format");
//   }

//   // 计算插值后的RGB分量
//   const r = Math.round(lerp(rgb1[0], rgb2[0], factor));
//   const g = Math.round(lerp(rgb1[1], rgb2[1], factor));
//   const b = Math.round(lerp(rgb1[2], rgb2[2], factor));

//   // 组合成新的颜色字符串并返回
//   return rgbToColor([r, g, b]);
// }

const rangeRandom = (strat: number, end: number) => {
  return Math.floor(Math.random() * (end - strat + 1) + strat);
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

enum CollectionType {
  Music,
  Animation,
  Game,
}

const Enter = () => {
  const clock1 = useRef(null);
  const clock2 = useRef(null);
  const clock3 = useRef(null);
  const pointer1 = useRef(null);
  const pointer2 = useRef(null);
  const pointer3 = useRef(null);
  const iconRef = useRef(null);
  const progressRef = useRef(null);
  const rootRef = useRef(null);
  const animDateRef = useRef();

  const iconAnim1Ref = useRef<Tween>();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentType, setCurrentType] = useState(CollectionType.Music);

  const handleClockUpdate = (params) => {
    console.log(params, this);
  };

  const handleEnter = () => {
    if (loading) {
      return;
    }

    if (currentType === CollectionType.Game) {
      alert("还在施工中，敬请期待");
      return;
    }

    const commonEffect: gsap.TweenVars = {
      duration: 0.6,
      borderWidth: 4,
      borderColor: "#ffffff",
      "--tw-blur": 0,
      "--bg-light": "#a390cb",
      backgroundColor: "transparent",
      opacity: 0.5,
      paused: true,
    };
    const t0 = gsap.to(rootRef.current, {
      "--bg-light": "#a390cb",
      duration: 0.6,
      paused: true,
    });

    const t1 = gsap.to(clock1.current, {
      ...commonEffect,
      y: "-52vh",
      x: "58vw",
      width: "130",
      height: "130",
      borderWidth: 3,
    });
    const t2 = gsap.to(clock2.current, {
      ...commonEffect,
      y: "-95vh",
      x: "-10vw",
      width: "300",
      height: "300",
      borderWidth: 4,
    });
    const t3 = gsap.to(clock3.current, {
      ...commonEffect,
      y: "-5vh",
      x: "-10vw",
      width: "420",
      height: "420",
      borderWidth: 6,
    });

    gsap.to(pointer2.current, {
      duration: 0,
      height: 120,
      top: -120,
      width: 6,
    });

    gsap.to(pointer3.current, {
      duration: 0,
      height: 150,
      top: -150,
      width: 6,
    });

    const tList: gsap.core.Tween[] = [];
    const ponterList = [pointer1.current, pointer2.current, pointer3.current];
    for (let i = 0; i < ponterList.length; i++) {
      const pointer = ponterList[i];
      tList.push(
        gsap.to(pointer, {
          rotate: 360,
          delay: 0.6,
          repeat: 100,
          // duration: 2 + 1.2 * i,
          duration: 5,
          ease: "none",
        })
      );
    }

    // const t4 = gsap.to([pointer1.current, pointer2.current, pointer3.current], {
    //   rotate: 360,
    //   delay: 0.6,
    //   repeat: 100,
    //   duration: 3,
    //   ease: "none",
    // });

    const tl = gsap.timeline();
    tl.to(iconRef.current, {
      x: 80,
      y: 130,
      rotateZ: "95deg",
      duration: 0.15,
      ease: "none",
    });
    tl.to(iconRef.current, {
      x: 30,
      y: 400,
      duration: 0.75,
      rotateY: "85deg",
      rotateZ: "150deg",
      rotateX: 0,
    });
    const tl2 = gsap.timeline({
      // onComplete: () => {
      //   iconRef.current.remove();
      // },
    });
    tl2.to(iconRef.current, {
      duration: 0.4,
      scale: 4,
      ease: "none",
      // ease: "",
    });
    tl2.to(iconRef.current, {
      duration: 0.7,
      scale: 35,
      opacity: 0,
      onComplete: async () => {
        for (const tween of [t0, t1, t2, t3, ...tList]) {
          tween.play();
        }

        const preload = Preload();
        const resources = getPreloadResource(
          currentType === CollectionType.Music ? musicMockData : animMockData
        );

        const complateCount = {
          value: 0,
        };

        preload.onprogress = (event) => {
          const per = 1 / resources.length;
          const progress =
            (complateCount.value * per + (event.progress / 100) * per) * 100;
          progressRef.current.style.width = progress + "%";
          // console.log(event.progress);
          // progressRef.current.style.width =
          //   (Math.max(complateCount.value + 1, resources.length - 1) /
          //     resources.length) *
          //     (event.progress / 100) *
          //     100 +
          //   "%";
        };

        let timer = Date.now();
        for (const { date, urls } of resources) {
          animDateRef.current.animationManager.current.animToNext(
            date.split("-")
          );

          if (Date.now() - timer < 600) {
            await wait(600);
          }
          timer = Date.now();
          await preload.fetch(urls);

          complateCount.value = complateCount.value + 1;
        }

        progressRef.current.style.width = "100%";

        nav(currentType === CollectionType.Music ? "./music" : "/timeline2");

        // preload.fetch(getPreloadResource()).then((items) => {
        //   // use either a promise or 'oncomplete'
        //   console.log("!!! oncomplete:", items);
        //   progressRef.current.style.width = "100%";

        //   nav("/timeline");
        // });

        // preload.onprogress = (event) => {
        //   console.log(event);

        //   progressRef.current.style.width = (event.progress || 0) + "%";
        // };
      },
      ["--airicon-blur"]: "5px",
    });

    // tl2.add([t1, t2, t3, t4]);
    // tl2.resume();
    // if (iconAnim1Ref.current) {
    // console.log("pause!!!");
    // // iconAnim1Ref.current.repeat(0);
    // // iconAnim1Ref.current.pause();
    // // iconAnim1Ref.current.kill();

    // /* transform: translate(30px, 400px) rotate3d(0, 1, 1, 130deg) scale(5);*/

    // // const tl = gsap.timeline({ repeat: 1 });
    // // tl.to(iconRef.current, { x: 100, duration: 1 });
    // // tl.to(iconRef.current, { y: 50, duration: 1 });
    // }
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  const handleCollectionTypeChange = (swiper) => {
    const nextIndex = swiper.activeIndex;
    if (nextIndex === 0) {
      setCurrentType(CollectionType.Music);
    } else if (nextIndex === 1) {
      setCurrentType(CollectionType.Animation);
    } else if (nextIndex === 2) {
      setCurrentType(CollectionType.Game);
    }
  };

  useEffect(() => {
    iconAnim1Ref.current = gsap.to(iconRef.current, {
      x: 35,
      yoyoEase: true,
      repeat: Infinity,
      duration: 1.6,
    });
  }, []);

  useEffect(() => {
    gsap.to(rootRef.current, {
      duration: 0.5,
      opacity: 1,
      scale: 1,
    });
  }, []);

  return (
    <div
      className="w-[100%] h-[100%] overflow-hidden relative enter opacity-0"
      style={{
        transform: "scale(1.5)",
      }}
      ref={rootRef}
    >
      <div
        className="w-[70vw] h-[70vw] bg-[#dfdfdf] rounded-[60vw] absolute left-[-24vw] blur-[15px]"
        style={{
          bottom: "calc(-65vw + 50px)",
        }}
        ref={clock3}
      >
        <div
          className="w-[4px] h-[10vw] bg-white absolute mx-auto my-auto top-[-10vw]"
          style={{
            inset: 0,
            transformOrigin: "bottom",
            top: "-10vw",
          }}
          ref={pointer3}
        ></div>
      </div>
      <div
        className="w-[70vw] h-[70vw] bg-[#dfdfdf] rounded-[60vw] absolute left-[54vw] blur-[15px]"
        style={{
          bottom: "calc(-65vw + 50px)",
        }}
        ref={clock2}
      >
        <div
          className="w-[4px] h-[10vw] bg-white absolute mx-auto my-auto top-[-10vw]"
          style={{
            inset: 0,
            transformOrigin: "bottom",
            top: "-10vw",
          }}
          ref={pointer2}
        ></div>
      </div>
      <div
        className="w-[70vw] h-[70vw] bg-white rounded-[60vw] absolute left-[15vw] blur-[15px]"
        style={{
          bottom: "calc(-65vw + 50px)",
        }}
        ref={clock1}
      >
        <div
          className="w-[4px] h-[10vw] bg-white absolute mx-auto my-auto top-[-10vw]"
          style={{
            inset: 0,
            transformOrigin: "bottom",
            top: "-10vw",
            // transform: "translateY(-50%)",
          }}
          ref={pointer1}
        ></div>
      </div>
      <div
        className="mx-auto my-auto absolute flex justify-center h-fit"
        style={{
          inset: 0,
        }}
      >
        {loading ? (
          <div className="relative">
            <CalendarIcon className="absolute left-[-24px] w-[18px] top-[-6px]" />
            <AnimDate ref={animDateRef} fontSize={20} className="text-white" />
            <div
              ref={progressRef}
              className="bg-white h-[1px] absolute bottom-[-6px] transition-all"
            />
            <div className="text-white text-xs top-[40px] right-0 absolute opacity-70">
              加载中 ...
            </div>
          </div>
        ) : (
          <div className="relative" onClick={handleEnter}>
            <div className="text-[22px] text-white">Time Line 2.</div>
          </div>
        )}
        <img
          src={AirIcon}
          className="inline-block airicon ml-[180px] absolute w-[36px]"
          ref={iconRef}
          onClick={handleEnter}
        />
        <Swiper
          className="absolute top-[60px] w-[180px] h-[50px] left-0 right-0 mx-auto"
          slidesPerView={3}
          spaceBetween={10}
          centeredSlides
          onActiveIndexChange={handleCollectionTypeChange}
          // loop
        >
          <SwiperSlide className="bg-transparent">音乐</SwiperSlide>
          <SwiperSlide className="bg-transparent">动漫</SwiperSlide>
          <SwiperSlide className="bg-transparent">游戏</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Enter;
