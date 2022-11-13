import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface PropsType extends React.InputHTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const TuiStyleComp = ({ className, children }: PropsType) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const TuiStyle = styled(TuiStyleComp)`
  .toastui-editor-md-container{ .rel; .bgc(white); }
  .toastui-editor-contents { .fs(14, 18); .c(@grayScale[@55]); font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    * { .fs(14, 18); }
    p{  .c(@grayScale[@55]); }
    ol, ul { .pl(12);
      >li { .mb(4); }
    }
    ul {
      > li{
        &:last-child{ .mb(0); }
        &::before { .wh(4); .mt(7); .ml(-12); .bgc(transparent); .no-repeat('@{icon}/ico-list-bullet.svg'); }
      }
    }
    ol {
      > li { 
        &::before { .ml(-32); .c(@grayScale[@55]); }
      } 
    }
  }
  .toastui-editor-contents ul, .toastui-editor-contents menu, .toastui-editor-contents ol, .toastui-editor-contents dir { .c(@grayScale[@55]); }
  
  @media(@wg-tablet){
    .toastui-editor-contents { .fs(16, 21);
      * { .fs(16, 21); }
      ol, ul { 
        >li { .mb(12); }
      }
    }
  }
`;

export default TuiStyle;
