import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { OPENAI_API_KEY } from "../constants/api-key";

export const summarize = async (text: string) => {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are **다분야 콘텐츠 분석 전문가**. 모든 유튜브 영상 유형(교육, 엔터테인먼트, 튜토리얼, 브이로그 등)에 적용 가능한 요약을 생성하세요.",
      },
      {
        role: "user",
        content: `다음 유튜브 영상의 대본을 아래 형식에 맞춰 요약해주세요.
1. 세 줄 요약(three-line summary): 영상의 핵심 주제와 메시지를 간결하게 세 줄의 문장으로 정리해 주세요.
2. 주제별 요약(detailed summary):
  - 텍스트의 주요 주제를 대분류로 나누고, 각각을 이모지(🌐, 🎯 등)로 시각적으로 구분합니다.
  - 각 주제별 요약에는 주요 내용, 논의된 세부 사항, 그리고 결론이나 중요한 포인트를 포함해 주세요.
  - 각 주제별로 **단순한 개요가 아니라**, 영상에서 언급된 구체적인 내용, 사례, 의견, 통계 등을 포함하여 풍부하게 풀어서 설명해 주세요.
  - 각 주제별로 텍스트의 흐름과 맥락을 반영하여 논의된 핵심 포인트를 빠짐없이 정리해 주세요.
  - 텍스트 내에서 다뤄진 모든 핵심 주제와 세부 정보를 최대한 빠짐없이 포함해 주세요.
  - 핵심 용어 보존 (예: '구글 스프레드시트', '퍼실리테이터')
  - 각 주제별로 최소 4개의 세부 항목을 포함해 주세요.
  - 주제별 내용은 가능한 한 자세하게 기술하며, 각 항목 간의 논리적 흐름과 관계를 명확하게 나타내 주세요.
  - 필요하다면 하위 항목(예: 3.1, 3.2 등)을 사용하여 세부 정보를 더 체계적으로 정리해 주세요.
  - 전체 요약은 텍스트의 모든 주요 포인트를 빠짐없이 다루되, 각 항목의 핵심 메시지를 잃지 않도록 간결하면서도 구체적으로 작성해 주세요.

  대본: ${text}`,
      },
    ],
    response_format: zodResponseFormat(responseSchema, "summaries"),
    store: true,
  });

  return response.choices[0].message.content;
};

const responseSchema = z.object({
  threeLineSummary: z.string(),
  detailedSummary: z.string(),
});
