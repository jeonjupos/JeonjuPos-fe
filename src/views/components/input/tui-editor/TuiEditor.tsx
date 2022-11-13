import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
// import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import { TuiEditorWithForwardedProps } from './TuiEditorWrapper';
import { isClient } from '@/constants/common';

interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(() => import('./TuiEditorWrapper'), { ssr: false });
const EditorWithForwardedRef = React.forwardRef<EditorType | undefined, EditorPropsWithHandlers>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

interface PropsType extends EditorProps {
  className?: string;
  onChange?: (value: string) => void;
  valueType?: 'markdown' | 'html';
}

const TuiEditorComp = (props: PropsType) => {
  const toolbarItems = [['bold', 'italic', 'strike'], ['hr'], ['ul', 'ol'], ['image', 'link'], ['code'], ['scrollSync']];

  const { className, onChange, valueType = 'html', initialValue, previewStyle = 'vertical', height = '600px', initialEditType = 'wysiwyg', useCommandShortcut = true } = props;
  const editorRef = useRef<EditorType>();

  const handleChange = () => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();
    let value = valueType === 'markdown' ? instance.getMarkdown() : instance.getHTML();
    if (value === '<p><br></p>') value = '';
    onChange && onChange(value);
  };

  useEffect(() => {
    if (isClient && editorRef.current) {
      const isMarkdown = valueType === 'markdown';
      const instance = editorRef.current.getInstance();
      const instanceValue = isMarkdown ? instance.getMarkdown() : instance.getHTML();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if ((!instanceValue || instanceValue === '<p><br></p>') && initialValue) isMarkdown ? instance.setMarkdown(initialValue) : instance.setHTML(initialValue);
    }
  }, [editorRef, initialValue]);

  return (
    <div className={className}>

      <EditorWithForwardedRef
        {...props}
        initialValue={initialValue}
        previewStyle={previewStyle}
        height={height}
        initialEditType={initialEditType}
        useCommandShortcut={useCommandShortcut}
        ref={editorRef}
        toolbarItems={toolbarItems}
        autofocus={false}
          // plugins={[colorSyntax]}
        onChange={handleChange}
      />

    </div>
  );
};

// noinspection LessResolvedByNameOnly
const TuiEditor = styled(TuiEditorComp)`
  
`;

export default TuiEditor;
