import React, { useState, useEffect, useRef } from "react";
// import './styles/ATFImageLoader.css'; // CSS 파일을 임포트 (CSS Module 등을 사용해도 됩니다)

interface ATFImageLoaderProps {
  /**
   * 로딩 완료를 기다릴 ATF 이미지에 부여할 클래스 이름.
   * 이 클래스를 가진 이미지만 로딩 감지 대상이 됩니다.
   * @default 'atf-critical-image'
   */
  imageClass?: string;
  /**
   * 로딩 중 보여줄 스피너 등의 React 요소 (선택 사항)
   */
  loadingIndicator?: React.ReactNode;
  /**
   * 이미지 로딩 감지 타임아웃 (ms).
   * 지정된 시간 내에 로딩이 완료되지 않으면 강제로 콘텐츠를 표시합니다.
   * 0으로 설정하면 타임아웃이 없습니다.
   * @default 0
   */
  timeout?: number;
  /**
   * ATF 영역에 표시될 콘텐츠
   */
  children: React.ReactNode;
}

const ATFImageLoader: React.FC<ATFImageLoaderProps> = ({
  children,
  imageClass = "atf-critical-image",
  loadingIndicator = null, // 기본값으로 스피너 없음
  timeout = 0,
}) => {
  // 로딩 상태를 관리하는 state
  const [isLoaded, setIsLoaded] = useState(false);
  // 타임아웃 ID를 저장하기 위한 ref
  const timeoutId = useRef<number | null>(null);

  // 로딩 감지 및 상태 변경 로직
  useEffect(() => {
    // 컴포넌트가 렌더링된 후 DOM에서 이미지 요소를 찾습니다.
    // querySelectorAll은 이 컴포넌트 내의 이미지만 찾는 것이 아니라 전체 DOM에서 찾습니다.
    // 만약 이 컴포넌트 내의 이미지만 찾고 싶다면 ref를 사용하여 해당 컨테이너를 먼저 선택해야 합니다.
    // 여기서는 편의상 전체 DOM에서 해당 클래스로 찾지만, 더 정확하게는 ref를 사용 추천
    const container = document.querySelector(".atf-container"); // CSS 클래스와 일치해야 함
    if (!container) {
      console.error(
        "ATF container element not found. Make sure your component is wrapped correctly."
      );
      setIsLoaded(true); // 컨테이너 없으면 바로 표시
      return;
    }

    const images = container.querySelectorAll(
      `img.${imageClass}`
    ) as NodeListOf<HTMLImageElement>;
    const totalImages = images.length;
    let loadedCount = 0;

    // 대기할 이미지가 없으면 바로 로딩 완료 처리
    if (totalImages === 0) {
      setIsLoaded(true);
      return;
    }

    // 이미지 하나 로딩 완료 또는 에러 발생 시 호출될 핸들러
    const handleImageLoad = () => {
      loadedCount++;
      // console.log(`이미지 로드됨: ${loadedCount}/${totalImages}`); // 디버깅용
      if (loadedCount === totalImages) {
        // 모든 이미지가 로딩 완료 또는 에러 발생함
        if (timeoutId.current) {
          clearTimeout(timeoutId.current); // 타임아웃이 설정되어 있다면 취소
        }
        setIsLoaded(true); // 로딩 완료 상태로 변경
      }
    };

    // 각 이미지에 이벤트 리스너 등록 및 이미 로드된 이미지 확인
    images.forEach((img) => {
      // img.complete: 이미지가 로딩 완료되었거나, 로딩 중 에러가 발생했거나, <img> 태그의 src 속성이 없거나 비어있으면 true
      // 여기서 우리가 원하는 건 "성공적으로 로드되어 표시 가능한 상태"에 가까우므로,
      // .complete를 사용하여 이미 로드되었는지 확인하고, 아니면 load/error 리스너를 붙입니다.
      if (img.complete) {
        handleImageLoad(); // 이미 로드된 이미지로 간주하고 카운트 증가
      } else {
        // 로딩 중인 이미지에 대해 이벤트 리스너 등록
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageLoad); // 에러 발생 시에도 다음 단계로 진행
      }
    });

    // **선택 사항: 타임아웃 설정**
    // 지정된 시간 내에 로딩이 완료되지 않으면 강제로 콘텐츠를 표시합니다.
    if (timeout > 0) {
      timeoutId.current = setTimeout(() => {
        console.warn(
          `이미지 로딩 타임아웃 (${timeout}ms). 강제로 콘텐츠 표시.`
        );
        setIsLoaded(true); // 타임아웃 시 강제 로딩 완료
      }, timeout);
    }

    // **클린업 함수:** 컴포넌트 언마운트 시 이벤트 리스너 제거 및 타임아웃 취소
    return () => {
      images.forEach((img) => {
        // 로딩 중이었던 이미지에 붙였던 리스너 제거
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [imageClass, timeout]); // 의존성 배열: imageClass나 timeout이 변경될 때만 효과 재실행

  return (
    <div className={`atf-container ${isLoaded ? "is-loaded" : ""}`}>
      {children}
    </div>
  );
};

export default ATFImageLoader;
