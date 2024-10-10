import React, { useRef, useEffect, useImperativeHandle } from "react";
import classnames from "classnames";

import styles from "./index.module.less";

function getTextDimensions(
  text: string,
  fontSize = 24,
  fontFamily = '"Courier New", Courier, monospace'
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return {
      width: 0,
      height: 0,
    };
  }

  context.font = `${fontSize}px ${fontFamily}`;

  // 使用measureText方法测量文本宽度
  const metrics = context.measureText(text);
  const textWidth = metrics.width;

  // 文本高度可以近似为字体大小，因为不涉及多行文本
  const textHeight = parseInt(String(fontSize), 10);

  return {
    width: textWidth + 10,
    height: textHeight,
  };
}

const defaultOutAnimDuration = 0.32;
const defaultInAnimDuration = 0.38;

class AnimationManager {
  yearSlot: HTMLDivElement;
  monthSlot: HTMLDivElement;
  daySlot: HTMLDivElement;
  prevAnimNode = {
    y: { node: null, spanList: [] },
    m: { node: null, spanList: [] },
    d: { node: null, spanList: [] },
  };
  animSpeed = 1;
  fontSize = 24;

  displayDateObj = {
    y: "",
    m: "",
    d: "",
  };

  constructor({
    yearSlot,
    monthSlot,
    daySlot,
    fontSize = 24,
  }: {
    yearSlot: HTMLDivElement;
    monthSlot: HTMLDivElement;
    daySlot: HTMLDivElement;
    fontSize?: number;
  }) {
    this.fontSize = fontSize;
    this.yearSlot = yearSlot;
    this.monthSlot = monthSlot;
    this.daySlot = daySlot;
    const { width: w, height: h } = getTextDimensions("0000", this.fontSize);
    console.log(w, h);
    this.yearSlot.style.width = `${w}px`;
    this.yearSlot.style.height = `${h}px`;

    const { width: w2, height: h2 } = getTextDimensions("00", this.fontSize);
    this.monthSlot.style.setProperty("width", `${w2}px`);
    this.monthSlot.style.setProperty("height", `${h2}px`);
    this.daySlot.style.setProperty("width", `${w2}px`);
    this.daySlot.style.setProperty("height", `${h2}px`);
  }

  async animToNext(dateArr, isReverse = false, duration = 1000) {
    const dateObj = {
      y: dateArr[0] || "",
      m: dateArr[1] || "",
      d: dateArr[2] || "",
    };
    const displayDateObj = this.displayDateObj;
    const genSpanNode = (value) => {
      const node = document.createElement("div");
      node.classList.add("word");
      const spanList = [];
      for (const char of value) {
        const span = document.createElement("span");
        span.className = "letter behind";
        span.textContent = char;
        node.appendChild(span);
        spanList.push(span);
      }
      return { node, spanList };
    };

    const anim = (value, slot, dateType) => {
      const { node: spanNode, spanList } = genSpanNode(value);
      spanNode.style.opacity = 1;
      slot.appendChild(spanNode);

      const isEqualWithPrev = (index, prevValue) => {
        if (prevValue !== undefined) {
          return String(value)[index] === prevValue;
        }
        const prevSpan = this.prevAnimNode[dateType].spanList[index];
        const isEqual =
          prevSpan &&
          String(value)[index] === (prevSpan ? prevSpan.textContent : "");
        return isEqual;
      };

      // console.log("remove", this.prevAnimNode[dateType].spanList);
      if (this.prevAnimNode[dateType].spanList.length) {
        for (let i = 0; i < this.prevAnimNode[dateType].spanList.length; i++) {
          const prevSpan = this.prevAnimNode[dateType].spanList[i];
          if (!isEqualWithPrev(i)) {
            setTimeout(() => {
              prevSpan.style.transitionDuration =
                defaultOutAnimDuration / this.animSpeed + "s";
              prevSpan.className = `letter out${isReverse ? "-reverse" : ""}`;
            }, 10 * (i + 1) * 2);
          } else {
            prevSpan.className = "letter";
          }
        }
      }

      for (let i = 0; i < spanList.length; i++) {
        const span = spanList[i];
        const isEqual = isEqualWithPrev(i);
        if (!isEqual) {
          setTimeout(() => {
            span.style.transitionDuration =
              defaultInAnimDuration / this.animSpeed + "s";
            span.className = `letter in${isReverse ? "-reverse" : ""}`;
          }, 10 * (i + 1) * 5);
        } else {
          span.className = "letter";
        }
      }

      if (this.prevAnimNode[dateType].node) {
        let removeNode = this.prevAnimNode[dateType].node;
        setTimeout(() => {
          removeNode.remove();
          if (removeNode) {
            removeNode = null;
          }
        }, 1000);
      }

      this.prevAnimNode[dateType] = {
        node: spanNode,
        spanList: spanList,
      };
    };

    if (dateObj.y !== displayDateObj.y) {
      anim(dateObj.y, this.yearSlot, "y");
      displayDateObj.y = dateObj.y;
    }
    if (dateObj.m !== displayDateObj.m) {
      anim(dateObj.m, this.monthSlot, "m");
      displayDateObj.m = dateObj.m;
    }
    if (dateObj.d !== displayDateObj.d) {
      anim(dateObj.d, this.daySlot, "d");
      displayDateObj.d = dateObj.d;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, duration);
    });
  }
}

interface IProps {
  className?: string;
  fontSize?: number;
}

const AnimDate = React.forwardRef((props: IProps, ref) => {
  const { className, fontSize = 24 } = props;

  const yearSlotRef = useRef<HTMLDivElement>(null);
  const monthSlotRef = useRef<HTMLDivElement>(null);
  const daySlotRef = useRef<HTMLDivElement>(null);

  const animationManagerRef = useRef<AnimationManager>(null);
  // if(!animationManagerRef.current) {
  //   animationManagerRef
  // }

  useEffect(() => {
    if (
      !animationManagerRef.current &&
      yearSlotRef.current &&
      monthSlotRef.current &&
      daySlotRef.current
    ) {
      const animationManager = new AnimationManager({
        yearSlot: yearSlotRef.current,
        monthSlot: monthSlotRef.current,
        daySlot: daySlotRef.current,
        fontSize,
      });
      console.log(123, animationManager);
      animationManagerRef.current = animationManager;

      // animationManager.animToNext("2024-06-24".split("-"));
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      animationManager: animationManagerRef,
    };
  });

  return (
    <div
      className={classnames(styles["root"], className)}
      style={{
        fontSize,
      }}
    >
      <div className="slot" ref={yearSlotRef}></div>
      <span className="divide">-</span>
      <div className="slot" ref={monthSlotRef}></div>
      <div className="divide">-</div>
      <div className="slot" ref={daySlotRef}></div>
    </div>
  );
});

export default AnimDate;
