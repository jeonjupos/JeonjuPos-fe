import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalStyle } from '@components/common/modal/ModalTemplate';
import { ModalComponentPropsType } from '@/provider/modal/type/modal';
import WgButton from '@components/common/button/WgButton';
import WgImage from '@components/common/image/WgImage';
import { firstUpperCase } from '@/utils/commonUtils';
import { clipboardCopy } from '@/utils/browserUtils';
import useToast from '@/provider/toast/hooks/useToast';

interface PropsType extends ModalComponentPropsType {
  className?: string;
  title: string;
  url: string;
  mobileUrl?: string;
  imageUrl?: string;
}

// noinspection LessResolvedByNameOnly
const ShareModalStyle = styled(ModalStyle)`
  .cont { .max-w(350); .wf;
    .modal-box {
      .sns-cont{ .flex; .flex-row; .space-between; .mt(32);
        li{ .w(60); .tc;
          .logo-cont{ .flex-center; .wh(48); .mb(4); .mh-c; .bgc(@grayScale[@fa]); .br(50%); transition: background-color 0.2s; }
          .text{ .fs(12); .c(@grayScale[@55]); .regular;  transition: font-weight 0.2s; }
          
          &:hover{ 
            .logo-cont{ .bgc(@grayScale[@f5]); }
            .text{ .bold; }
          }
        }
      }
    }
  }
  
  @media(@wg-tablet){
    .cont {
      .modal-box {
        .sns-cont {
          li { .w(70);
            .logo-cont { .wh(56); 
              ${WgImage} { .h(19); }
            }
            .text{ .fs(14); }
            &:hover{
              .logo-cont{ .bgc(@grayScale[@fa]); }
              .text{ .regular; }
            }
          }
        }
      }
    }
  }
`;

const ShareModal = ({ className, title, url, mobileUrl, imageUrl, close }: PropsType) => {
  const { AWS_DOMAIN_URL = '' } = process.env;
  const SNS_LIST = {
    kakao: { url: '' },
    facebook: { url: `http://www.facebook.com/sharer/sharer.php?u=${url}` },
    twitter: { url: `https://www.twitter.com/intent/tweet?&url=${url}&text=${title}` },
  };

  const { toast } = useToast();

  const [script, setScript] = useState<HTMLScriptElement | null>(null);

  const kakaoShare = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description: '위너지지에서 리그에 참여해보세요!',
        imageUrl: AWS_DOMAIN_URL + imageUrl,
        link: {
          webUrl: url,
          mobileWebUrl: mobileUrl || url,
        },
      },
      callback () {
        close && close();
      },
      installTalk: true,
    });
  };

  const snsShare = (snsName: keyof typeof SNS_LIST) => {
    if (snsName === 'kakao') kakaoShare();
    else {
      const width = 600;
      const height = 600;

      const left = ((document.body.offsetWidth / 2) - (width / 2)) + window.screenLeft;
      const top = (document.body.offsetHeight / 2) - (height / 2);

      window.open(SNS_LIST[snsName].url, '위너지지 공유하기', `width=${width}, height=${height}, left=${left}, top=${top}`);
    }
  };

  const linkCopy = async () => {
    await clipboardCopy(url);
    toast('링크가 복사 되었습니다.', { type: 'success' });
    close && close();
  };

  const dynamicScriptImport = () => {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.0.0/kakao.min.js';
    head.appendChild(script);
    setScript(script);
  };

  useEffect(() => {
    setTimeout(() => {
      !window.Kakao.isInitialized() && window.Kakao.init('59b973b88ea1c30ed1b633f79031fdfa');
    }, 100);

    return () => {
      script && script.remove();
    };
  }, [script]);

  useLayoutEffect(() => {
    dynamicScriptImport();
  }, []);

  return (
    <ShareModalStyle className={className} mobile="bottomSheet" subject="공유하기" showCloseBtn close={close}>
      <ul className="sns-cont">
        {Object.keys(SNS_LIST).map(sns => (
          <li key={sns}>
            <WgButton ripple={{ disabled: true }} onClick={() => snsShare(sns as keyof typeof SNS_LIST)}>
              <div className="logo-cont">
                <WgImage src={`/imgs/icon/ico-${sns}.svg`} />
              </div>
              <span className="text">{firstUpperCase(sns)}</span>
            </WgButton>
          </li>
        ))}
        <li>
          <WgButton ripple={{ disabled: true }} onClick={linkCopy}>
            <div className="logo-cont">
              <WgImage src="/imgs/icon/ico-link.svg" />
            </div>
            <span className="text">Copy Link</span>
          </WgButton>
        </li>
      </ul>
    </ShareModalStyle>
  );
};

export default ShareModal;
