import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { reset } from 'styled-reset';
import '@/assets/fonts/Digital7/style.css';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
// import 'tui-color-picker/dist/tui-color-picker.css';
// import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

// noinspection LessResolvedByNameOnly
const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}
  
  html, body {  margin:0; line-height: 1; }

  body { overflow-x: hidden; overflow-y: scroll; }

  * {
    box-sizing: border-box;
    word-break: keep-all;
    &::-webkit-scrollbar { width: 0; }
    &::-webkit-scrollbar-track { background-color: transparent; }
    &::-webkit-scrollbar-thumb { background-color: #fff; border-radius: 3px; }
    &::-webkit-scrollbar-thumb:hover { background-color: #4f4f67; }
  }

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, menu, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    -webkit-tap-highlight-color: transparent;
  }

  button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 16px;
    line-height: 1;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6{ .m(0); .p(0); }

  //svg, img, span{ display: inline-block; vertical-align: middle;}
  svg, img, span{ display: inline-block; vertical-align: middle; }
  
  img { user-drag: none; }
  
  button { border: none; background-color: transparent; padding: 0; cursor: pointer; }
  
  a{ text-decoration: none; }

  .toastui-editor-contents p { font-size: 14px; line-height: 19px; }

  #app {

  }
`;

export default GlobalStyle;
