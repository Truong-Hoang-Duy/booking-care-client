import MarkdownIt from 'markdown-it';
import { Dispatch, SetStateAction } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

interface MarkdownEditorProps {
  contentMarkdown: string;
  setContentHTML: Dispatch<SetStateAction<string>>;
  setContentMarkdown: Dispatch<SetStateAction<string>>;
}

const MarkdownEditor = ({
  contentMarkdown,
  setContentHTML,
  setContentMarkdown,
}: MarkdownEditorProps) => {
  const mdParser = new MarkdownIt();

  function handleEditorChange({ html, text }: { html: string; text: string }) {
    setContentHTML(html);
    setContentMarkdown(text);
  }
  return (
    <MdEditor
      value={contentMarkdown}
      style={{ height: '380px' }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  );
};

export default MarkdownEditor;
