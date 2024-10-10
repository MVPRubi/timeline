import i00 from "@/assets/anim/img/00.jpg";
import i01 from "@/assets/anim/img/01.jpg";
import i02 from "@/assets/anim/img/02.jpg";
import i03 from "@/assets/anim/img/03.jpg";
import i04 from "@/assets/anim/img/04.jpg";
import i05 from "@/assets/anim/img/05.jpg";
import i06 from "@/assets/anim/img/06.jpg";
import i07 from "@/assets/anim/img/07.jpg";
import i08 from "@/assets/anim/img/08.jpg";
import i09 from "@/assets/anim/img/09.jpg";
import i10 from "@/assets/anim/img/10.jpg";
import i11 from "@/assets/anim/img/11.jpg";
import i12 from "@/assets/anim/img/12.jpg";
import i13 from "@/assets/anim/img/13.jpg";
import i14 from "@/assets/anim/img/14.jpg";
import i15 from "@/assets/anim/img/15.jpg";
import i16 from "@/assets/anim/img/16.jpg";
import i17 from "@/assets/anim/img/17.jpg";
import i18 from "@/assets/anim/img/18.jpg";
import i19 from "@/assets/anim/img/19.jpg";

import m00 from "@/assets/anim/bgm/00.mp3";
import m01 from "@/assets/anim/bgm/01.m4a";
import m02 from "@/assets/anim/bgm/02.mp3";
import m03 from "@/assets/anim/bgm/03.m4a";
import m04 from "@/assets/anim/bgm/04.mp3";
import m05 from "@/assets/anim/bgm/05.mp3";
import m06 from "@/assets/anim/bgm/06.m4a";
import m07 from "@/assets/anim/bgm/07.m4a";
import m08 from "@/assets/anim/bgm/08.mp3";
import m09 from "@/assets/anim/bgm/09.mp3";
import m10 from "@/assets/anim/bgm/10.m4a";
import m11 from "@/assets/anim/bgm/11.mp3";
import m12 from "@/assets/anim/bgm/12.m4a";
import m13 from "@/assets/anim/bgm/13.mp3";
import m14 from "@/assets/anim/bgm/14.m4a";
import m15 from "@/assets/anim/bgm/15.m4a";
import m16 from "@/assets/anim/bgm/16.m4a";
import m17 from "@/assets/anim/bgm/17.m4a";
import m18 from "@/assets/anim/bgm/18.m4a";
import m19 from "@/assets/anim/bgm/19.m4a";

const mockData = [
  {
    date: "2013-04-07",
    type: "movie",
    name: "进击的巨人",
    bgm: m00,
    bgmName: "紅蓮の弓矢",
    background: i00,
    comment: "最绝望的第一集，剧情，分镜，音乐全满分，爆火不是没有原因的。",
  },
  {
    date: "2014-04-06",
    type: "movie",
    name: "排球少年",
    bgm: m01,
    bgmName: "マシ・マシ",
    background: i01,
    importantType: "normal",
    comment:
      "一个无聊的周末偶然刷的一部番，结果成为了最喜欢的运动番，张力十足的运动分镜，各种细节作画，完美表达了青春期对排球的纯粹喜爱。更棒的是配角的刻画，大王，牛若甚至一场选拔赛的路人，每个人都异常丰满，每个人都和排球有不同的故事，不同的情感，有的是把排球作为校园社团爱好快乐排球，有的把排球作为一生的极致追求。—— 每个人都可以赢，但为什么不能是我呢",
  },
  {
    date: "2016-01-08",
    type: "movie",
    name: "只有我不在的街道",
    bgm: m02,
    bgmName: "Re:Re:",
    background: i02,
    comment:
      "起先只是为了弥补遗憾，但后来逐渐变成为了守护身边重要的人和事的无与伦比的勇气。冷酷现实中的热血和奇迹，关于亲情，友情和“想要去信任”的决心",
  },
  {
    date: "2016-04-04",
    type: "movie",
    name: "Re：从零开始的异世界生活",
    bgm: m03,
    bgmName: "STYX HELIX",
    background: i03,
    comment:
      "设定和剧情并不算新颖，很详细描写了男主死亡过程，压迫感和代入感很足，魂玩家狂喜，WHITE FOX 作画也加大分。为了写评论又看了一遍 18 集，486 你做个人吧",
  },
  {
    date: "2016-08-26",
    type: "movie",
    name: "你的名字",
    bgm: m04,
    bgmName: "夢灯籠",
    background: i04,
    importantType: "like",
    comment: "《斌の敏子》\n 主演：韦一敏 / 王子斌 \n 导演：新海诚",
  },
  {
    date: "2018-10-03",
    type: "movie",
    name: "强风吹拂",
    bgm: m05,
    bgmName: "リセット",
    background: i05,
    comment: "“你喜欢跑步吗”,看画风就知道是 Production I.G",
  },
  {
    date: "2018-01-10",
    type: "movie",
    name: "紫罗兰永恒花园",
    bgm: m06,
    bgmName: "みちしるべ",
    background: i06,
    comment:
      "“啊这光，啊这水” ，抛开玩梗京阿尼真的把作画做到极致，可惜故事受篇幅影响有点短了，不能像 CLANNAD 慢慢铺垫，最后感情再集中爆发。",
  },
  {
    date: "2019-01-12",
    type: "movie",
    name: "辉夜大小姐想让我告白",
    bgm: m07,
    bgmName: "DADDY! DADDY! DO!",
    background: i07,
    importantType: "normal",
    comment: "辉夜和白银互相走位，可能因为我也是这种拧巴的性格，特别喜欢",
  },
  {
    date: "2019-03-15",
    type: "movie",
    name: "爱，死亡和机器人",
    bgm: m08,
    bgmName: "Living in the Shadows",
    background: i08,
    comment:
      "也许这才是动画本该有的样子，充满想象力，迥异画风，带有作者强烈的个人色彩",
  },
  {
    date: "2019-04-19",
    type: "movie",
    name: "鬼灭之刃",
    bgm: m09,
    bgmName: "竈門炭治郎のうた",
    background: i09,
    comment:
      "在“水调歌头”前，只觉得是飞碟社稳定发挥，之后一刀封神，续集更是把华丽做到极致。",
  },
  {
    date: "2019-07-13",
    type: "movie",
    name: "灵笼",
    bgm: m10,
    bgmName: "Incarnation",
    background: i10,
    importantType: "normal",
    comment:
      "慢热的末日科幻番，目前看来剧里谈恋爱都没有好结局，极其适合单身朋友观看。莫名有点喜欢反派小黄毛，虽然不干人事，但很清楚自己在做什么。作画细节很多，剧情再看全是伏笔，完成度非常高。",
  },
  {
    date: "2019-10-23",
    type: "movie",
    name: "伍六七",
    bgm: m11,
    bgmName: "阿珍爱上了阿强",
    background: i11,
    comment: "好多致敬星爷",
  },
  {
    date: "2020-07-25",
    type: "movie",
    name: "凡人修仙传",
    bgm: m12,
    bgmName: "凡人",
    background: i12,
    importantType: "normal",
    comment:
      "国产第一修仙动漫不接受反驳，真正的凡人小心谨慎步步为营在修仙，韩立修仙之路，道阻且长。坚守道心，往事不悔，未来绚烂",
  },
  {
    date: "2020-07-26",
    type: "movie",
    name: "雾山五行",
    bgm: m13,
    bgmName: "渊海无畏",
    background: i13,
    comment: "三集封神，水墨风吹爆",
  },
  {
    date: "2020-10-02",
    type: "movie",
    name: "咒术回战",
    bgm: m14,
    bgmName: "逆夢",
    background: i14,
    comment:
      "又一部将反派刻画的很好的番，看完只想问反派什么时候死， OP 和 ED 都是很喜欢的歌手唱的",
  },
  {
    date: "2021-04-30",
    type: "movie",
    name: "时光代理人",
    bgm: m15,
    bgmName: "VORTEX",
    background: i15,
    comment: "经历过 5.12 的看真的特别感动，第一部、二部的 OP 设计都非常惊艳",
  },
  {
    date: "2021-01-08",
    type: "movie",
    name: "约定的梦幻岛",
    bgm: m16,
    bgmName: "Touch off",
    background: i16,
    comment: "第一季看的像恐怖片，氛围压迫感都是顶级",
  },
  {
    date: "2021-11-06",
    type: "movie",
    name: "英雄联盟：双城之战",
    bgm: m17,
    bgmName: "Enemy",
    background: i17,
    importantType: "normal",
    comment:
      "疯批属性的 JinX 太喜欢了和她的父女情深，蔚和女警反而太像好莱坞电影里的大女主。补齐英雄联盟世界观，并且还在不断扩大，期待一波快乐风男登场",
  },
  {
    date: "2022-09-13",
    type: "movie",
    name: "赛博朋克：边缘行者",
    bgm: m18,
    bgmName: "I Really Want to Stay At Your House",
    background: i18,
    importantType: "normal",
    comment:
      "当我以为大卫强无敌的时候，结果就被亚当重锤爆杀了，可能就像现实里穷人拥有的东西都很容易失去，只剩下无法实现的最初愿望",
  },
  // {
  //   date: "2022-11-11",
  //   type: "movie",
  //   name: "铃芽之旅",
  //   bgm: m19,
  //   bgmName: "すずめ feat.十明",
  //   background: i19,
  //   comment: "前任一起看的，没啥感觉",
  // },
];

export default mockData;
