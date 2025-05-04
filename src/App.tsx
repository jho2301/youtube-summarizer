import { COLORS } from "@/constants/colors";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import title from "public/title.png";
import heroImage from "public/hero-image.png";
import titleDescription from "public/description-text.png";
import kidDahye from "public/kid-dahye.png";
import kidHwano from "public/kid-hwano.png";
import brideText from "public/text-bride.png";
import groomText from "public/text-groom.png";
import heartLine from "public/heart-line.png";
import invite from "public/invite.png";
import { useRef } from "react";

const App = () => {
  return (
    <div
      style={{
        backgroundColor: COLORS.outerBackground,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.background,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100%",
            flexDirection: "column",
            overflow: "visible",
          }}
        >
          <IntroSection />
          <BriefInfoSection />
          <PhotoGallerySection />
        </div>
      </div>
    </div>
  );
};

const IntroSection = () => {
  return (
    <section
      style={{
        position: "relative",
        backgroundImage: `url(${heroImage})`,
        width: "100%",
        height: 814,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <div
        style={{
          position: "absolute",
          top: 292,
          right: 80,
          zIndex: 1,
        }}
      >
        <img
          src={kidDahye}
          width={92}
          alt=""
          style={{ border: `1px solid ${COLORS.pink}`, marginBottom: 24 }}
        />
        <img src={brideText} width={62} alt="" style={{ marginLeft: 48 }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 540,
          left: 80,
          zIndex: 1,
        }}
      >
        <img
          src={kidHwano}
          width={92}
          alt=""
          style={{
            border: `1px solid ${COLORS.pink}`,
            marginBottom: 12,
            marginLeft: 36,
          }}
        />
        <img src={groomText} width={74} alt="" />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          height: 200,
          width: "100%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0), #010101)",
        }}
      />
    </section>
  );
};

const Header = () => {
  return (
    <header style={{ marginTop: 42 }}>
      <img
        role="heading"
        aria-level={1}
        src={title}
        alt="toast to love"
        style={{ width: "100%", padding: 8, top: 42, marginBottom: 24 }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={titleDescription}
          alt="2025년 05월 31일 5시, 미스터리 브루잉 컴퍼니"
          width={164}
          style={{}}
        />
      </div>
    </header>
  );
};

const BriefInfoSection = () => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={heartLine} width={258} alt="" style={{ marginBottom: 56 }} />
      <div
        style={{
          display: "flex",
          gap: 40,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>신랑</span>
          <span>전환오</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>신부</span>
          <span>장다혜</span>
        </div>
      </div>
      <img src={invite} width={342} alt="" />
    </section>
  );
};

const PhotoGallerySection = () => {
  const prevNavButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <section>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={"auto"}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        scrollbar={true}
        navigation={{}}

        // pagination={true}
      >
        <button type="button" ref={prevNavButtonRef} style={{ width: 100 }}>
          hi
        </button>
        {Array(23)
          .fill(null)
          .map((_, i) => i + 1)
          .map((v) => (
            <SwiperSlide
              key={v}
              style={{
                height: 540,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={`/gallery/gallery_${v}.png`}
                style={{ width: "100%" }}
                alt=""
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default App;
