import { COLORS } from "@/constants/colors";
import {} from "date-fns";
import { ReactNode, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/bundle";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Marquee } from "./components/Marquee";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

import closing from "public/closing.png";
import dDayBackground from "public/d-day-background.png";
import 지인titleDescription from "public/description-text.png";
import 가족titleDescription from "public/title-description-family.png";
import heartLine from "public/heart-line.png";
import heroImage from "public/hero-image.avif";
import copyIcon from "public/icon/fi_copy.svg";
import invite from "public/invite.png";
import kidDahye from "public/kid-dahye.png";
import kidHwano from "public/kid-hwano.png";
import kidDahyeGIF from "public/dahye-kid.webp";
import kidHwanoGIF from "public/hwano-kid.webp";
import letter from "public/letter.png";
import luckyDrawItems from "public/lucky-draw-items.png";
import noScriptJustCheers from "public/noscript-justcheers.png";
import intersectionPic from "public/intersection-pic.png";
import paperBackground from "public/paper-background.png";
import brideText from "public/text-bride.png";
import groomText from "public/text-groom.png";
import timeTable from "public/time-table.png";
import title from "public/title.webp";
import youAreInvited from "public/you-are-invited.png";
import welcomeToOurForever from "public/welcome-to-our-forever.png";
import naverMapIcon from "public/naver-map-icon.png";
import kakaoMapIcon from "public/kakao-map-icon.png";
import AnimateInView from "./components/AnimateOnIntersection";
import ATFImageLoader from "./components/ImageLoader";

enum WeddingCardType {
  지인 = "acquaintance",
  가족 = "family",
}

const parseWeddingCardType = (type: string | null): WeddingCardType => {
  if (type === "family") {
    return WeddingCardType.가족;
  }

  return WeddingCardType.지인;
};

const App = () => {
  const type = parseWeddingCardType(
    new URL(window.location.href).searchParams.get("type")
  );

  return (
    <Layout>
      <ATFImageLoader>
        <IntroSection type={type} />
      </ATFImageLoader>
      <DDaySection type={type} />
      <BriefInfoSection type={type} />
      <PhotoGallerySection type={type} />
      <InfoSection type={type} />
      {type === WeddingCardType.지인 ? (
        <LuckyDrawSection />
      ) : (
        <img src={intersectionPic} alt="No script just cheers" />
      )}
      <LetterSection />
      <AccountSection type={type} />
      <LetUsKnowSection type={type} />
    </Layout>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
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
          {children}
        </div>
      </div>
    </div>
  );
};

const IntroSection = ({ type }: { type: WeddingCardType }) => {
  return (
    <section
      className="atf-critical-image"
      style={{
        position: "relative",
        backgroundImage: `url(${heroImage})`,
        width: "100%",
        height: 814,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ height: 12 }} />
      <header>
        <img
          className="atf-critical-image"
          role="heading"
          aria-level={1}
          src={title}
          alt="toast to love"
          style={{ width: "100%", padding: 8, top: 42, marginBottom: 16 }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={
              type === WeddingCardType.지인
                ? 지인titleDescription
                : 가족titleDescription
            }
            alt={
              type === WeddingCardType.지인
                ? "2025년 05월 31일 5시, 미스터리 브루잉 컴퍼니"
                : "2025년 05월 25일 12시, 롯데시티호텔 구로 3층 씨카페"
            }
            style={{
              height: 36,
            }}
          />
        </div>
      </header>
      <div
        style={{
          position: "absolute",
          top: 292,
          right: 80,
          zIndex: 1,
        }}
      >
        <img
          src={kidDahyeGIF + `?v=' + ${Date.now()}`}
          width={92}
          alt=""
          style={{ marginBottom: 10 }}
          className="atf-critical-image"
        />
        <motion.img
          src={brideText}
          className="atf-critical-image"
          width={62}
          alt=""
          style={{ marginLeft: 48 }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 1.9,
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
        />
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
          src={kidHwanoGIF + `?v=' + ${Date.now()}`}
          width={92}
          alt=""
          className="atf-critical-image"
          style={{
            marginBottom: 12,
            marginLeft: 36,
          }}
        />
        <motion.img
          src={groomText}
          width={74}
          alt=""
          initial={{ opacity: 0 }}
          className="atf-critical-image"
          animate={{
            opacity: 1,
            transition: {
              delay: 1.9,
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
        />
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

const DDaySection = ({ type }: { type: WeddingCardType }) => {
  const [dDayText, setDDayText] = useState<string>("");
  const weddingDate = new Date(
    type === WeddingCardType.지인
      ? "2025-05-31T17:00:00+09:00"
      : "2025-05-25T12:00:00+09:00"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = weddingDate.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(2, "0");
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");

      setDDayText(`D-${days} ${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <AnimateInView>
      <section style={{ width: "100%", padding: 16 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: 212,
            justifyContent: "center",
            borderRadius: 20,
            position: "relative",
            overflow: "hidden",
            marginTop: 72,
          }}
        >
          <div
            style={{
              backgroundImage: `url(${dDayBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.4)",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          ></div>
          <div
            style={{
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>♥ 환오와 다혜의 결혼식까지 ♥</span>
            <span
              style={{
                color: COLORS.pink,
                fontSize: 28,
                fontWeight: 800,
                lineHeight: "normal",
                marginTop: 8,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {dDayText}
            </span>
          </div>
        </div>
      </section>
    </AnimateInView>
  );
};

const BriefInfoSection = ({ type }: { type: WeddingCardType }) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {type === WeddingCardType.지인 ? (
        <>
          <AnimateInView
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <신랑신부소개지인식 />
          </AnimateInView>

          <AnimateInView
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={heartLine}
              width={258}
              style={{ marginBottom: 80 }}
              alt=""
            />
          </AnimateInView>
          <AnimateInView
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img src={invite} width={342} alt="" />
          </AnimateInView>
          <div style={{ height: 80 }} />
          <AnimateInView
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img src={youAreInvited} width={342} alt="" />
          </AnimateInView>
          <div style={{ height: 28 }} />
        </>
      ) : (
        <>
          <AnimateInView
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <신랑신부소개가족식 />
          </AnimateInView>
          <AnimateInView
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={heartLine}
              width={258}
              style={{ marginBottom: 80 }}
              alt=""
            />
          </AnimateInView>
          <AnimateInView
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <초대메시지가족식 />
          </AnimateInView>
          <div style={{ height: 80 }} />
          <AnimateInView
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img src={youAreInvited} width={342} alt="" />
          </AnimateInView>
          <div style={{ height: 28 }} />
        </>
      )}
    </section>
  );
};

const 신랑신부소개지인식 = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 40,
        marginTop: 100,
        marginBottom: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 16 }}>GROOM</span>
        <span style={{ fontSize: 24, fontWeight: 700 }}>전환오</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 16 }}>BRIDE</span>
        <span style={{ fontSize: 24, fontWeight: 700 }}>장다혜</span>
      </div>
    </div>
  );
};

const 신랑신부소개가족식 = () => {
  return (
    <div
      style={{
        gap: 40,
        marginTop: 100,
        marginBottom: 100,
        width: "100%",
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 16 }}>전대수 민서현의 아들</span>
        <span style={{ fontSize: 20, fontWeight: 700 }}>전환오</span>
      </div>
      <div
        style={{
          height: 12,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 16 }}>장외용 김임숙의 딸</span>
        <span style={{ fontSize: 20, fontWeight: 700 }}>장다혜</span>
      </div>
    </div>
  );
};

const 초대메시지가족식 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <span
        style={{
          color: "#F9F9F9",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        소중한 분들을 초대합니다.
      </span>
      <div style={{ height: 16 }} />
      <span
        style={{
          fontSize: 16,
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "141%",
          marginBottom: 24,
          whiteSpace: "pre-line",
          textAlign: "center",
        }}
      >
        {`일상의 소중함을 함께 나누며\n작은 사랑이 큰 의미가 되었습니다.\n그 마음으로 시작하는 이 날,\n함께해 주신다면 더없이 감사하겠습니다.`}
      </span>
    </div>
  );
};

const LuckyDrawSection = () => {
  return (
    <AnimateInView style={{}}>
      <section>
        <img src={luckyDrawItems} alt="" width="100%" />
      </section>
    </AnimateInView>
  );
};

const PhotoGallerySection = ({ type }: { type: WeddingCardType }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [index, setIndex] = useState(0);

  return (
    <AnimateInView style={{}}>
      <section style={{ position: "relative", width: "100%" }}>
        <Swiper
          style={{ width: "100%" }}
          modules={[Navigation, Thumbs]}
          slidesPerView={"auto"}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={(swiper) => {
            thumbsSwiper?.slideTo(swiper.activeIndex);
            setIndex(swiper.activeIndex);
          }}
        >
          {Array(18)
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
                  src={`/gallery/${v}.png`}
                  style={{ width: "100%" }}
                  alt=""
                />
              </SwiperSlide>
            ))}
        </Swiper>

        <Swiper
          modules={[Thumbs, Navigation, FreeMode]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          slidesPerView={"auto"}
          spaceBetween={8}
          freeMode={true}
          loop={true}
          style={{
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Array(18)
            .fill(null)
            .map((_, i) => i + 1)
            .map((v) => (
              <SwiperSlide
                key={v}
                style={{
                  width: 64,
                  height: 68,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={`/gallery/${v}.png`}
                  style={{
                    width: 64,
                    minWidth: 64,
                    height: 64,
                    objectFit: "cover",
                    cursor: "pointer",
                    border:
                      index === v - 1 ? `2px solid ${COLORS.pink}` : "none",
                    boxSizing: "content-box",
                    borderRadius: 8,
                  }}
                  alt=""
                />
              </SwiperSlide>
            ))}
        </Swiper>

        <div style={{ marginTop: 24, marginBottom: 24 }}>
          <Marquee duration={20}>
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <img
                  key={i}
                  src={
                    type === WeddingCardType.지인
                      ? noScriptJustCheers
                      : welcomeToOurForever
                  }
                  alt=""
                  width={375}
                />
              ))}
          </Marquee>
        </div>
      </section>
    </AnimateInView>
  );
};

const InfoSection = ({ type }: { type: WeddingCardType }) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${paperBackground})`,
        backgroundSize: "cover",
        padding: 16,
        width: "100%",
        paddingBottom: 60,
      }}
    >
      <div
        style={{
          color: COLORS.black,
          fontSize: 16,
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          marginBottom: 28,
          marginTop: 24,
        }}
      >
        ♥ ︎INFORMATION ♥
      </div>
      <div style={{ width: "100%" }}>
        {type === WeddingCardType.지인 ? (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginBottom: 12,
                gap: 8,
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: COLORS.black, fontWeight: 500 }}>장소</span>
              <span
                role="button"
                style={{
                  color: COLORS.black,
                  fontWeight: 700,
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: 20,
                }}
                onClick={() =>
                  window.open("https://naver.me/5YwcldJd", "_blank")
                }
              >
                공덕 미스터리브루잉컴퍼니
              </span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: 8,
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span style={{ color: COLORS.black, fontWeight: 500 }}>시간</span>
              <span
                style={{ color: COLORS.black, fontWeight: 700, fontSize: 20 }}
              >
                5월 31일 오후 5:00
              </span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: 8,
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: COLORS.black, fontWeight: 500 }}>주차</span>
              <span
                style={{
                  color: COLORS.black,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 20,
                }}
              >
                건물 지하 주차장 이용 가능
              </span>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginBottom: 12,
                gap: 8,
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: COLORS.black, fontWeight: 500 }}>주소</span>
              <span
                style={{ color: COLORS.black, fontWeight: 700, fontSize: 19 }}
              >
                서울 구로구 디지털로 300
              </span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginBottom: 12,
                gap: 8,
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: COLORS.black, fontWeight: 500 }}>장소</span>
              <span
                style={{ color: COLORS.black, fontWeight: 700, fontSize: 19 }}
              >
                롯데시티호텔 구로 3층 Pearl Room
              </span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: 8,
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span style={{ color: COLORS.black, fontWeight: 500 }}>시간</span>
              <span
                style={{ color: COLORS.black, fontWeight: 700, fontSize: 19 }}
              >
                5월 25일 오후 12:00
              </span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                gap: 8,
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: COLORS.black, fontWeight: 500 }}>주차</span>
              <span
                style={{
                  color: COLORS.black,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 19,
                }}
              >
                건물 지하 주차장 이용 가능
              </span>
            </div>
          </>
        )}
      </div>
      <div style={{ height: 72 }} />
      {type === WeddingCardType.지인 ? (
        <img src={timeTable} alt="" width="100%" style={{ marginBottom: 40 }} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginTop: -48,
            gap: 8,
          }}
        >
          <img
            role="button"
            src={naverMapIcon}
            alt=""
            width={36}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              window.open("https://naver.me/xMjKRu2x", "_blank");
            }}
          />
          <img
            role="button"
            src={kakaoMapIcon}
            alt=""
            width={36}
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.open("https://place.map.kakao.com/27235482", "_blank");
            }}
          />
        </div>
      )}
    </section>
  );
};

const AccountSection = ({ type }: { type: WeddingCardType }) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 24,
        width: "100%",
        padding: 16,
      }}
    >
      <AnimateInView
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <span style={{ marginTop: 44, marginBottom: 20, fontWeight: 600 }}>
          ♥ ACCOUNT ♥
        </span>
        <span
          style={{
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "141%",
            marginBottom: 40,
            whiteSpace: "pre-line",
            textAlign: "center",
          }}
        >
          {`멀리서 마음 전해주고 싶으신 분들을 위해\n조심스럽게 계좌번호를 함께 안내드립니다.\n보내주신 따뜻한 축하에 진심으로 감사드립니다.`}
        </span>
      </AnimateInView>
      {type === WeddingCardType.지인 ? (
        <>
          <AnimateInView>
            <AccountCardItem
              title="신랑 전환오"
              bankName="토스뱅크"
              accountNumber="1000-1122-1854"
              cta="토스로 바로 송금"
              iconImgSrc={kidHwano}
              ctaColor={COLORS.black}
              onCTAClick={() => {
                window.open(
                  `https://ul.toss.im?scheme=${"supertoss://send?accountNo=100011221854&bankCode=92"}`,
                  "_blank"
                );
              }}
            />
          </AnimateInView>
          <div style={{ height: 16 }} />
          <AnimateInView>
            <AccountCardItem
              title="신부 장다혜"
              bankName="카카오뱅크"
              accountNumber="3333-02-0203265"
              cta="카톡으로 바로 송금"
              iconImgSrc={kidDahye}
              ctaColor={COLORS.lightPink}
              onCTAClick={() => {
                window.open("https://qr.kakaopay.com/Ej8JvVJLp", "_blank");
              }}
            />
          </AnimateInView>
        </>
      ) : (
        <>
          <AnimateInView>
            <AccountListItem
              headerTitle="신랑측"
              iconImgSrc={kidHwano}
              accounts={[
                {
                  nickname: "신랑",
                  ownerName: "전환오",
                  bankName: "토스뱅크",
                  accountNumber: "1000-1122-1854",
                  url: `https://qr.kakaopay.com/Ej7tCTAV2`,
                },
                {
                  nickname: "신랑 아버지",
                  ownerName: "전대수",
                  bankName: "우리은행",
                  accountNumber: "1002-630-793576",
                  url: `https://qr.kakaopay.com/FWFUB3Fx4`,
                },
                {
                  nickname: "신랑 어머니",
                  ownerName: "민서현",
                  bankName: "우리은행",
                  accountNumber: "554-07-173988",
                  url: `https://qr.kakaopay.com/Ej9K5nlG4`,
                },
              ]}
            />
          </AnimateInView>
          <div
            style={{
              height: 24,
            }}
          />
          <AnimateInView>
            <AccountListItem
              headerTitle="신부측"
              iconImgSrc={kidDahye}
              ctaColor={COLORS.lightPink}
              accounts={[
                {
                  accountNumber: "1000-1122-1854",
                  bankName: "토스뱅크",
                  nickname: "신부",
                  ownerName: "장다혜",
                  url: `https://ul.toss.im?scheme=${"supertoss://send?accountNo=100011221854&bankCode=92"}`,
                },
                {
                  nickname: "신부 아버지",
                  ownerName: "장외용",
                  bankName: "카카오뱅크",
                  accountNumber: "3333-31-7962766",
                  url: `https://qr.kakaopay.com/Ej89udmsH`,
                },
                {
                  nickname: "신부 어머니",
                  ownerName: "김임숙",
                  bankName: "카카오뱅크",
                  accountNumber: "3333-05-3067569",
                  url: `https://qr.kakaopay.com/Ej7q57Rfq`,
                },
              ]}
            />
          </AnimateInView>
        </>
      )}
    </section>
  );
};

const AccountListItem = ({
  headerTitle,
  accounts,
  ctaColor = COLORS.black,
  iconImgSrc,
}: {
  headerTitle: string;
  iconImgSrc: string;
  accounts: Account[];
  ctaColor?: string;
}) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 16,
        paddingTop: 24,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            color: COLORS.gray,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {headerTitle}
        </span>

        <img
          src={iconImgSrc}
          alt=""
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
          marginBottom: 24,
          flexDirection: "column",
        }}
      >
        {accounts.map((account) => {
          return (
            <div style={{ width: "100%" }}>
              <span
                style={{
                  color: COLORS.gray,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {account.nickname}
              </span>
              <div
                style={{
                  marginTop: 8,
                  width: "100%",
                  display: "flex",
                }}
              >
                <div style={{ width: "100%" }}>
                  <span
                    style={{
                      display: "block",
                      color: COLORS.lightGray,
                      fontSize: 14,
                      fontWeight: 400,
                      marginBottom: 2,
                    }}
                  >
                    {`${account.bankName} ${account.ownerName}`}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#383838",
                        fontSize: 16,
                        lineHeight: "normal",
                        fontWeight: 600,
                      }}
                    >
                      {account.accountNumber}
                    </span>
                    <img
                      src={copyIcon}
                      alt="복사하기"
                      role="button"
                      width={16}
                      height={16}
                      style={{
                        cursor: "pointer",
                        height: 16,
                      }}
                      onClick={() => {
                        alert("계좌번호를 복사했어요!");
                        navigator.clipboard.writeText(
                          `${
                            account.bankName
                          } ${account.accountNumber.replaceAll("-", "")}`
                        );
                      }}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => {
                    window.open(account.url, "_blank");
                  }}
                  style={{
                    backgroundColor: ctaColor,
                    color: COLORS.white,
                  }}
                >
                  카톡으로 송금
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AccountCardItem = ({
  title,
  bankName,
  accountNumber,
  cta,
  iconImgSrc,
  ctaColor = COLORS.black,
  onCTAClick,
}: {
  title: string;
  bankName: string;
  accountNumber: string;
  iconImgSrc: string;
  cta: string;
  ctaColor?: string;
  onCTAClick?: () => void;
}) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 16,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "100%",
      }}
    >
      <span
        style={{
          color: COLORS.gray,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {title}
      </span>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 16,
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <img
          src={iconImgSrc}
          alt=""
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        />
        <div>
          <span
            style={{
              color: COLORS.lightGray,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {bankName}
          </span>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#383838",
                fontSize: 24,
                fontWeight: 700,
                lineHeight: "normal",
              }}
            >
              {accountNumber}
            </span>
            <img
              src={copyIcon}
              alt="복사하기"
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => {
                alert("계좌번호를 복사했어요!");
                navigator.clipboard.writeText(
                  `${bankName} ${accountNumber.replaceAll("-", "")}`
                );
              }}
            />
          </div>
        </div>
      </div>
      <Button
        size="lg"
        style={{
          width: "100%",
          backgroundColor: ctaColor,
          cursor: "pointer",
          color: COLORS.white,
        }}
        onClick={onCTAClick}
      >
        {cta}
      </Button>
    </div>
  );
};

const LetterSection = () => {
  return <img src={letter} alt="" width="100%" />;
};

const LetUsKnowSection = ({ type }: { type: WeddingCardType }) => {
  return (
    <AnimateInView>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <span style={{ marginTop: 90, marginBottom: 16, fontWeight: 600 }}>
          ♥ LET US KNOW ♥
        </span>
        <span
          style={{
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "141%",
            marginBottom: 124,
            whiteSpace: "pre-line",
            textAlign: "center",
          }}
        >
          {type === WeddingCardType.지인
            ? `참석 의사를 전해주신 소중한 마음 감사드립니다.\n부득이하게 참석이 어려우신 상황이 생기신다면,\n부담 갖지 마시고 편히 말씀 부탁드립니다 :)`
            : `자리가 넉넉하지 않아 미리 양해 말씀 드립니다.\n참석 여부를 회신 주시면 준비에 참고하여\n감사히 맞이하겠습니다.`}
        </span>
        <img src={closing} alt="" width="100%" />
      </section>
    </AnimateInView>
  );
};

type Account = {
  bankName: string;
  accountNumber: string;
  ownerName: string;
  nickname: string;
  url: string;
};

export default App;
