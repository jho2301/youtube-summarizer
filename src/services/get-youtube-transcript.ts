import axios from "axios";
import { USER_AGENT } from "../constants/user-agent";
import { getURLWithCORS } from "../utils/getUrlWithCors";

// YouTube 자막(XML)을 파싱하여 텍스트를 반환하는 함수
export async function getYouTubeTranscript(videoId: string): Promise<string> {
  const response = await axios.get(
    getURLWithCORS(`https://www.youtube.com/watch?v=${videoId}`),
    {
      headers: {
        "Accept-Language": "ko",
        "User-Agent": USER_AGENT,
      },
    }
  );

  const videoPageBody = response.data;

  const splittedHTML = videoPageBody.split('"captions":');

  if (splittedHTML.length <= 1) {
    if (videoPageBody.includes('class="g-recaptcha"')) {
      throw new Error(
        "YouTube is receiving too many requests from this IP and now requires solving a captcha to continue"
      );
    }

    if (!videoPageBody.includes('"playabilityStatus":')) {
      throw new Error(`The video is no longer available (${videoId})`);
    }

    throw new Error(`Transcript is disabled on this video (${videoId})`);
  }

  const captions = (() => {
    try {
      return JSON.parse(
        splittedHTML[1].split(',"videoDetails')[0].replace("\n", "")
      );
    } catch (e) {
      return undefined;
    }
  })()?.["playerCaptionsTracklistRenderer"];

  if (!captions) {
    throw new Error("Could not parse captions");
  }

  if (!("captionTracks" in captions)) {
    throw new Error("Could not find caption tracks");
  }
  const captionTracks = captions.captionTracks as any;

  if (
    captionTracks.some((track: any) => track.languageCode === "ko") === false
  ) {
    throw new Error("Could not find Korean caption track");
  }

  const transcriptURL = captions.captionTracks.find(
    (track: any) => track.languageCode === "ko"
  ).baseUrl;

  const transcriptResponse = await axios.get(getURLWithCORS(transcriptURL), {
    headers: {
      "Accept-Language": "ko",
      "User-Agent": USER_AGENT,
    },
  });

  if (transcriptResponse.status !== 200) {
    throw new Error("Could not fetch transcript");
  }

  const transcriptBody = await transcriptResponse.data;
  const results = [...transcriptBody.matchAll(RE_XML_TRANSCRIPT)];

  return results
    .map((result) => ({
      text: result[3],
      duration: parseFloat(result[2]),
      offset: parseFloat(result[1]),
      lang: "ko",
    }))
    .map((result) => result.text)
    .join("\n");
}

const RE_XML_TRANSCRIPT =
  /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g;
