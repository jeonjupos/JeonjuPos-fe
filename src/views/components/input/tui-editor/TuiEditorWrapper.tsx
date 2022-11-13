import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import useService from '@/hooks/useService';
import TuiStyle from '@components/common/input/tui-editor/TuiStyle';

export interface TuiEditorWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
  valueType?: 'markdown' | 'html';
  height?: string;
  initialValue?: string;
  value?: string;
}

const TuiEditorWrapper = (props: TuiEditorWithForwardedProps) => {
  const { forwardedRef, height } = props;

  const { aws } = useService();

  const uploadImgStatus = useRef(false);

  const addImage = async (file: File, callback: any) => {
    if (uploadImgStatus.current) return;

    uploadImgStatus.current = true;
    const path = await aws.fileUpload({ file, bucketType: 'DESCRIPTION' });

    callback(`${process.env.AWS_DOMAIN_URL}${path}`, '');
    uploadImgStatus.current = false;
  };

  useEffect(() => {
    if (forwardedRef) {
      const editorIns = forwardedRef.current.getInstance();
      editorIns.removeHook('addImageBlobHook');
      editorIns.addHook('addImageBlobHook', addImage);
    }
  }, [forwardedRef]);

  return (
    <TuiStyle style={{ height: `${height}px` }}>
      <Editor {...props} ref={forwardedRef} language="ko-KR" />
    </TuiStyle>
  );
};

export default TuiEditorWrapper;
