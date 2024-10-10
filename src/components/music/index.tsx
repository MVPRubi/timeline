import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { Button, Popup } from "@nutui/nutui-react";
import classNames from "classnames";

import mockData from "../enter/musicMockData";
import {
  RandomIcon,
  LoopIcon,
  SkipBackIcon,
  PlayMusicIcon,
  PauseMusicIcon,
  MusicLibIcon,
  Music2Icon,
} from "@/assets/svg";

import "./index.less";

enum PlayMode {
  Normal,
  Loop,
  SingleLoop,
  Random,
}

function getRandomIndex(excludeIndex: number, length: number) {
  if (length <= 1) {
    throw new Error("Array must contain at least two elements.");
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * length);
  } while (randomIndex === excludeIndex);

  return randomIndex;
}

const Music = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [musicList, setMusicList] = useState(mockData);
  const [currentPlayMode, setCurrentPlayMode] = useState(PlayMode.Loop);

  // 使用 useRef 来存储 Howl 对象
  const sound = useRef<Howl>();

  const togglePlay = () => {
    if (!sound.current) {
      return;
    }
    if (isPlaying) {
      sound.current.pause();
    } else {
      sound.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleChangeMode = () => {
    if (currentPlayMode === PlayMode.Loop) {
      setCurrentPlayMode(PlayMode.Random);
    } else {
      setCurrentPlayMode(PlayMode.Loop);
    }
  };

  const stop = () => {
    if (!sound.current) {
      return;
    }
    sound.current.stop();
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentPlayMode === PlayMode.Random) {
      setCurrentMusicIndex(getRandomIndex(currentMusicIndex, musicList.length));
      return;
    }
    let next = currentMusicIndex + 1;
    if (next >= musicList.length) {
      next = 0;
    }

    setCurrentMusicIndex(next);
  };

  const handlePrev = () => {
    if (currentPlayMode === PlayMode.Random) {
      setCurrentMusicIndex(getRandomIndex(currentMusicIndex, musicList.length));
      return;
    }
    let next = currentMusicIndex - 1;
    if (next < 0) {
      next = musicList.length - 1;
    }
    setCurrentMusicIndex(next);
  };

  const renderMusicList = () => {
    return (
      <div className={"flex text-white flex-col mt-2"}>
        {musicList.map((music, index) => {
          const isActive = index === currentMusicIndex;
          return (
            <div
              onClick={() => setCurrentMusicIndex(index)}
              className={classNames("h-[50px] flex items-center pl-5", {
                ["bg-[#ffffff0c] text-[#7B57E4]"]: isActive,
              })}
            >
              {music.bgmName}
              {isActive && (
                <Music2Icon className="text-[#7B57E4] w-6 h-6 ml-2" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    // 创建 Howl 对象
    sound.current = new Howl({
      src: [musicList[currentMusicIndex].bgm],
      html5: true,
      autoplay: true,
      onplay: () => setIsPlaying(true),
      onend: () => handleNext(),
      onpause: () => setIsPlaying(false),
      // onvolume: () => setVolume(sound.current?._volume),
      // ontimeupdate: () => setCurrentTime(sound.current?.seek()),
    });

    // 组件卸载时释放资源
    return () => sound.current?.unload();
  }, [currentMusicIndex]);

  return (
    <div className="music w-full h-full bg-white overflow-hidden relative">
      <div className="bg-dot top-[-50px] right-[-50px]"></div>
      <div className="bg-dot left-[-50px] bottom-[-50px]"></div>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center">
          <img
            className="img bg-[#7B57E4] w-[300px] h-[300px] mt-[50px] rounded-[20px] object-cover z-10"
            src={musicList[currentMusicIndex]?.background}
          />
        </div>
        <div className="font-bold text-2xl mt-[50px] text-[#333] mx-7">
          {musicList[currentMusicIndex]?.bgmName}
        </div>
        <div className="font-normal text-base mt-2 text-[#666] mx-7">
          {musicList[currentMusicIndex]?.comment}
        </div>
      </div>
      <div className="flex absolute bottom-[40px] items-center justify-around w-full">
        <div className="text-[#7B57E4]" onClick={handleChangeMode}>
          {currentPlayMode === PlayMode.Loop ? <LoopIcon /> : <RandomIcon />}
        </div>
        <SkipBackIcon className="text-[#7B57E4]" onClick={handlePrev} />
        <div className="playbtn" onClick={togglePlay}>
          {isPlaying ? <PauseMusicIcon /> : <PlayMusicIcon />}
        </div>
        <SkipBackIcon
          className="text-[#7B57E4] rotate-180"
          onClick={handleNext}
        />
        <MusicLibIcon
          className="text-[#7B57E4]"
          onClick={() => setMenuOpen(true)}
        />
      </div>
      <Popup
        className="bg-[#1d2220]"
        visible={menuOpen}
        position="bottom"
        onClose={() => {
          setMenuOpen(false);
        }}
      >
        {renderMusicList()}
      </Popup>
    </div>
  );
};

export default Music;
