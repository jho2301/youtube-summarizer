import { motion } from "framer-motion";
import {
  Children,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  duration?: number;
  containerClassName?: string;
};

const Marquee = ({ children, duration, containerClassName }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [multiplier, setMultiplier] = useState(1);

  const calculateWidth = useCallback(() => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const marqueeRect = marqueeRef.current?.getBoundingClientRect();
    const containerWidth = containerRect?.width;
    const marqueeWidth = marqueeRect?.width;

    if (containerWidth && marqueeWidth) {
      setMultiplier(
        marqueeWidth < containerWidth
          ? Math.ceil(containerWidth / marqueeWidth)
          : 1
      );
    }
  }, [containerRef]);

  useEffect(() => {
    if (!isMounted) return;
    calculateWidth();
    if (marqueeRef.current && containerRef.current) {
      const resizeObserver = new ResizeObserver(() => calculateWidth());
      resizeObserver.observe(marqueeRef.current);
      resizeObserver.observe(containerRef.current);
      return () => {
        if (!resizeObserver) return;
        resizeObserver.disconnect();
      };
    }
  }, [calculateWidth, containerRef, isMounted]);

  useEffect(() => {
    calculateWidth();
  }, [children, calculateWidth]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const multiplyChildren = useCallback(
    (multiplier: number) => {
      const arraySize = multiplier >= 0 ? multiplier : 0;
      return [...Array(arraySize)].map((_, i) => (
        <Fragment key={i}>
          {Children.map(children, (child) => (
            <div>{child}</div>
          ))}
        </Fragment>
      ));
    },
    [children]
  );

  const scroll = {
    x: ["0%", "-100%"],
    transition: {
      duration: duration || 10,
      ease: "linear",
      repeat: Infinity,
    },
  };

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "overflow-x-hidden flex flex-row relative w-full",
        containerClassName
      )}
    >
      <motion.div
        animate={scroll}
        className="flex-shrink-0 flex-grow-0 basis-auto min-w-full flex flex-row items-center"
      >
        <div
          ref={marqueeRef}
          className="flex-shrink-0 flex-grow-0 basis-auto flex min-w-fit flex-row items-center"
        >
          {Children.map(children, (child) => (
            <div>{child}</div>
          ))}
        </div>
        {multiplyChildren(multiplier - 1)}
      </motion.div>
      <motion.div
        animate={scroll}
        className="flex-shrink-0 flex-grow-0 basis-auto min-w-full flex flex-row items-center"
      >
        {multiplyChildren(multiplier)}
      </motion.div>
    </div>
  );
};

export { Marquee };
