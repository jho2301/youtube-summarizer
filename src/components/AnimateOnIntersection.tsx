import { motion } from "framer-motion";
import { ComponentProps, HTMLAttributes, ReactNode } from "react";
import "./animate.css"; // 필요한 스타일 임포트

// 간단한 스크롤 진입 시 애니메이션 컴포넌트
const AnimateInView = ({
  children,
  delay = 0,
  ...props
}: ComponentProps<(typeof motion)["div"]> & {
  children: ReactNode;
  delay?: number;
}) => {
  // variants를 사용하여 initial과 visible 상태 정의
  const variants = {
    hidden: { opacity: 0, y: 50 }, // 초기 상태 (숨겨져 있고 아래에 위치)
    visible: { opacity: 1, y: 0 }, // 보이는 상태 (완전히 나타나고 원래 위치)
  };

  return (
    <motion.div
      variants={variants} // 정의한 variants 연결
      initial="hidden" // 시작 상태는 hidden
      whileInView="visible" // 뷰포트에 들어오면 visible 상태로 애니메이션
      viewport={{
        once: true, // 애니메이션을 한 번만 실행 (스크롤 내릴 때만)
        amount: 0.3, // 요소의 30%가 뷰포트에 보일 때 애니메이션 트리거
        // root: ...   // 특정 스크롤 컨테이너 지정 가능 (기본값: 뷰포트)
        // rootMargin: ... // root 주변 마진 지정 가능
      }}
      transition={{
        duration: 0.6, // 애니메이션 지속 시간
        delay: delay, // 애니메이션 시작 딜레이
      }}
      className="animate-in-view-item" // 추가적인 스타일을 위한 클래스
      {...props} // 다른 prop들을 motion.div에 전달 가능 (e.g., style, onClick)
      style={{
        backgroundColor: "transparent",
        width: "100%",
        ...props.style,
      }}
    >
      {children} {/* 감싸진 내용 */}
    </motion.div>
  );
};

export default AnimateInView;
