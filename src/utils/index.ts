interface IDayData {
  date: string;
  urls: string[];
}

export const getPreloadResource = (dataList: any[]): IDayData[] => {
  const res: IDayData[] = [];
  let index = 0;
  for (const data of dataList) {
    const dayData: IDayData = {
      date: data.date,
      urls: [],
    };

    // if (data.bgm && index < 1) {
    //   dayData.urls.push(data.bgm);
    // }

    if (data.background) {
      dayData.urls.push(data.background);
    }

    res.push(dayData);
  }
  index += 1;
  return res;
};
