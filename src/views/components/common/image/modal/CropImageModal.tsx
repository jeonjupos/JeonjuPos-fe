import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Cropper, { Area, Point } from 'react-easy-crop';
import { ModalStyle } from '@/views/components/common/modal/ModalTemplate';
import { ModalComponentPropsType } from '@/providers/modal/type/modal';
import WgButton, { GrayBorderBtn } from '@/views/components/common/button/JwButton';
import {ReactComponent as SvgIcoClose} from '@imgs/icon/ico-close.svg';
import {ReactComponent as SvgIcoRefresh} from '@imgs/icon/ico-refresh.svg';

interface PropsType extends ModalComponentPropsType {
  className?: string;
  label: string;
  aspect: number;
  minZoom?: number;
  image?: string;
  initialPos?: Point;
  initialZoom?: number;
  nonModal?: boolean;
}

// noinspection LessResolvedByNameOnly
const Root = styled(ModalStyle)`
  .cont{ .bgc(white); .br(16);
    .modal-box{ .p(32, 40); }
    .tit-cont{ .flex; .space-between; .items-center; .mb(32);
      .tit{ .fs(20); .c(black); .bold; } 
    }
    .crop-image-cont{ .rel; .wh(90vw, 480); .max-w(640); .bgc(black); }
    .btn-cont{ .flex; .space-between; .items-center; .mt(20); 
      ${WgButton} { .h(50); .p(0,16); .fs(16); .br(12); }
      .btn-cancel{ .min-w(108); }
      .btn-rotation{ .min-w(155); 
        svg, .text{ .ib; .vam; }
        svg{ .mr(8);
          path {}
        }
      }
      .btn-submit{ .min-w(108); }
    }
  }
`;

const CropImageModal = ({ className, label, image = '', aspect, minZoom = 1, initialPos = { x: 0, y: 0 }, initialZoom = 1, nonModal = false, close, resolve }: PropsType) => {
  const [crop, setCrop] = useState<Point>(initialPos);
  const [zoom, setZoom] = useState(initialZoom);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const createImage = (url: string) : Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });
  };

  const getRadianAngle = (degreeValue: number) => {
    return (degreeValue * Math.PI) / 180;
  };

  const rotateSize = (width: number, height: number, rotation: number) => {
    const rotRad = getRadianAngle(rotation);

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
  };

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    rotation: number | undefined = 0,
    flip : { horizontal: boolean, vertical: boolean } | undefined = { horizontal: false, vertical: false },
  ) : Promise<{ file:Blob, dataUrl: string } | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation,
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        if (file) resolve({ file, dataUrl: URL.createObjectURL(file) });
        else reject();
      }, 'image/jpeg');
    });
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const ninetyDegRotate = useCallback(() => {
    setRotation(rotation + 90);
  }, [rotation]);

  const makeImageResult = useCallback(async () => {
    if (!image || !croppedAreaPixels) return;
    try {
      const { file, dataUrl } = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation,
      ) || {};

      resolve && resolve({ file, dataUrl });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <Root className={className} nonModal={nonModal} close={close}>
      <div className="tit-cont">
        <h3 className="tit">{label}</h3>
        <button onClick={close}>
          <SvgIcoClose width={20} height={20} />
        </button>
      </div>
      <div className="crop-image-cont">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          minZoom={minZoom}
          aspect={aspect}
          rotation={rotation}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="btn-cont">
        <GrayBorderBtn className="btn-cancel" onClick={close}>취소</GrayBorderBtn>
        <GrayBorderBtn className="btn-rotation" onClick={ninetyDegRotate}>
          <SvgIcoRefresh width={16} height={16} />
          <span className="text">90도 회전</span>
        </GrayBorderBtn>
        <WgButton className="btn-submit" color="indigoBasic-300" onClick={makeImageResult}>확인</WgButton>
      </div>
    </Root>
  );
};

export default CropImageModal;
