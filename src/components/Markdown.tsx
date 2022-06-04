import * as React from 'react';
import MarkdownIt from 'markdown-it';

interface MarkdownProps {
  content: string;
}
export const Markdown = ({ content }) => {
  const md = new MarkdownIt({
    html: true
  })
  const html = md.render(content);
  return <div
    className="markdown"
    dangerouslySetInnerHTML={{ __html: html }}
  />
}
