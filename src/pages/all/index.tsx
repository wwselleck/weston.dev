import * as React from 'react';

import { renderSecondaryPage } from "../../templates/secondary-template"
import { Context } from '../../context';
import { Page } from '../../services/pages';

export const page = {
  title: 'All pages',
  published: true,
  tags: [],
  async renderToHTML(context: Context) {
    const allPages = await context.pages.getAllPages();
    const allPagesWithoutSelf = allPages.filter(p => p.permalink !== this.permalink);
    const sortedPages = allPagesWithoutSelf.sort((p1: Page, p2: Page) => {
      return p1.title.localeCompare(p2.title)
    });
    return renderSecondaryPage(<div>
      <ul>
        {sortedPages.map(p => {
            return <li><a href={p.permalink}>{p.title}</a></li>
          })}
      </ul>
    </div>, 'All pages');
  }

}
