export {};

declare global {
  interface Window {
    java?: any;
    webkit?: any;
    ClassicEditor?: any;
    Kakao?: any;
    __BACK_HISTORY__?: {
      [key: string]: BackHistoryType | undefined;
    };
  }
}
