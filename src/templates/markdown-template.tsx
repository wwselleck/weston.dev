import * as React from 'react';
import { renderSecondaryPage} from './secondary-template';
import { Markdown } from '../components/Markdown';

export const renderMarkdownPage = (markdown: string, subtitle: string) => {
  return renderSecondaryPage(<Markdown content={markdown} />, subtitle)
}
