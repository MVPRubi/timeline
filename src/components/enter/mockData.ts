// import video1 from "../../assets/1.mp4";
import bgm1 from "../../assets/v1.mp3";
import bgm2 from "../../assets/v2.mp3";
import bgm0 from "../../assets/v0.mp3";
import bgm3 from "../../assets/v3.mp3";
import bgm4 from "../../assets/v4.mp3";
import bgm5 from "../../assets/v5.mp3";
import bg2 from "../../assets/bg2.png";
import bg1 from "../../assets/bg1.jpg";
import bg0 from "../../assets/bg0.png";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import bg5 from "../../assets/bg5.png";

const mockData = [
  {
    date: "2024-05-28",
    type: "movie",
    name: "微微一笑很倾城",
    bgm: bgm0,
    background: bg0,
    importantType: "like",
    comment:
      "多年后重温，发现剧情较原文改编的更丰富～ 失败点是演员…两位主演浪费了这一颜值巅峰期，贡献了全剧最做作的演技！端王身高和身材比例有点虐，油劲儿当年已初见端倪…女主那几场败笔吻戏，更是翻车得一塌糊涂！ 很喜欢顾漫这个故事，可惜剧版影版都拍得不咋地，而且现在都已经下架了…不知道有生之年还能不能看到更好的翻拍",
  },
  {
    date: "2024-05-29",
    type: "movie",
    name: "Titanic",
    bgm: bgm1,
    background: bg1,
    comment: `I figure life is a gift and I don't intend on wasting it.
    You never know what hand you're going to get dealt next.
    You learn to take life as it comes at you.`,
  },
  {
    date: "2024-05-30",
    type: "movie",
    name: "君の名は。",
    bgm: bgm2,
    background: bg2,
    comment:
      "黛玉心中想道：“好生奇怪，倒像在哪里见过一般，何等眼熟到如此!” 宝玉看罢，因笑道：“这个妹妹我曾见过的。” 贾母笑道：“可又是胡说，你又何曾见过他？” 宝玉笑道：“虽然未曾见过他，然我看着面善，心里就算是旧相识，今日只作远别重逢，未为不可。”",
  },
  {
    date: "2024-06-11",
    type: "movie",
    name: "度华年",
    bgm: bgm3,
    background: bg3,
    comment: "老夫老妻过家家 WHEAT×Niu Niu",
  },
  {
    date: "2024-06-13",
    type: "movie",
    name: "三十而“你”",
    bgm: bgm5,
    background: bg5,
    important: true,
    importantType: "normal",
    comment: "zz zzZ ZZZ",
  },
  {
    date: "2024-06-14",
    type: "movie",
    name: "霸王别姬",
    bgm: bgm4,
    background: bg4,
    comment:
      "最懂蝶衣的大概是菊仙了吧。两个深爱段小楼的人，只能把一切不幸和错误归咎于对方，舍不得怪那段小楼一分一毫……",
  },
];

interface IDayData {
  date: string;
  urls: string[];
}

export const getPreloadResource = (): IDayData[] => {
  const res: IDayData[] = [];
  for (const data of mockData) {
    const dayData: IDayData = {
      date: data.date,
      urls: [],
    };

    if (data.bgm) {
      dayData.urls.push(data.bgm);
    }
    if (data.background) {
      dayData.urls.push(data.background);
    }
    res.push(dayData);
  }

  return res;
};

export default mockData;
