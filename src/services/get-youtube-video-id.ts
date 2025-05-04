export function getVideoIdFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);

    // 일반 URL: ?v=VIDEO_ID
    if (urlObj.searchParams.has("v")) {
      return urlObj.searchParams.get("v")!;
    }

    // 단축 URL (youtu.be)
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1);
    }

    throw new Error("유효하지 않은 유튜브 URL입니다.");
  } catch (error) {
    throw new Error("URL 파싱 중 오류 발생: " + error);
  }
}
