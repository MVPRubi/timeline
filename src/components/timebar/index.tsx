import AirIcon from "@/assets/icon.svg";

interface IProps {
  className?: string;
  data: any[];
  currIndex: number;
}

interface IColor {
  hex: string;
  rgb: string;
}

const COLOR_MAP: Record<string, IColor> = {
  default: { hex: "#ffffff", rgb: "255,255,255" },
  like: { hex: "#FF69B4", rgb: "255,105,180" },
  normal: { hex: "#FFA500", rgb: "255,165,0" },
};
const getPointColor = (type: string, colorType: keyof IColor = "hex") => {
  const target = COLOR_MAP[type] || COLOR_MAP.default;
  return target[colorType];
};

const TimeBar = ({ className, currIndex, data = [] }: IProps) => {
  const renderTimePoint = (item: any, index: number) => {
    return (
      <div
        key={index}
        className={`origin-bottom transition-all bg-white bottom-[100%] opacity-[0.5] ${
          index === currIndex ? "scale-[1.5] opacity-[1] " : ""
        }`}
        style={{
          backgroundColor: getPointColor(item.importantType),
          height: index === currIndex ? 20 : 15,
          width: index === currIndex ? 10 : 8,
        }}
      />
    );
  };

  return (
    <div
      className={`w-full border-0 border-b-[1px] border-solid border-white flex justify-around items-end ${className}`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(${getPointColor(
          data[currIndex].importantType,
          "rgb"
        )},0.05) 60%, rgba(${getPointColor(
          data[currIndex].importantType,
          "rgb"
        )},0.15) 100%)`,
      }}
    >
      {data.map((item, index) => renderTimePoint(item, index))}
      {/* <img src={AirIcon} className="absolute left-0 top-[120%] w-[25px]" /> */}
    </div>
  );
};

export default TimeBar;
