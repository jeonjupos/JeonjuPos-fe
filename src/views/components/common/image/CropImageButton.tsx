import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { imageFileUpload } from '@/utils/fileUtils';
import useModal from '@/providers/modal/hooks/useModal';
import CropImageModal from '@/views/components/common/image/modal/CropImageModal';

interface PropsType {
  className?: string;
  children: React.ReactNode;
  label: string;
  aspect: number;
  dimDetect?: boolean;
  change: (file: Blob, url: string) => void;
}

const CropImageButtonComp = ({ className, label, aspect, children, dimDetect = false, change }: PropsType) => {
  const inpRef = useRef<HTMLInputElement | null>(null);
  const { modal } = useModal();

  const openCropModal = useCallback(async (image: string) => {
    const { file, dataUrl } = await modal(CropImageModal, { aspect, image, label, nonModal: dimDetect }) as { file: Blob, dataUrl: string };

    change(file, dataUrl);
  }, [change]);

  const handleChangeImg = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;

    const { dataUrl } = await imageFileUpload(e);
    openCropModal(dataUrl);
    e.target.value = '';
  }, [change]);

  return (
    <div className={className} tabIndex={-1} role="button" onClick={() => inpRef.current?.click()}>
      <input ref={inpRef} type="file" accept=".jpeg, .jpg, .png" onChange={handleChangeImg} />
      {children}
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const CropImageButton = styled(CropImageButtonComp)`
  >input { .hide; }
`;

export default CropImageButton;
