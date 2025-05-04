export const getURLWithCORS = (url: string) =>
  `https://corsproxy.io/?url=${encodeURIComponent(url)}`;
