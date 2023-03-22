import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { PageWrapper } from "../components/PageWrapper";

interface Opts {
  scripts?: string[];
  subtitle?: string;
}
export function renderRoot(node: React.ReactNode, opts?: Opts) {
  const subtitle = opts.subtitle ? `| ${opts.subtitle}` : "";
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>weston.dev ${subtitle} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="/public/favicon.png">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;300;400;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="/public/reset.css" type="text/css" />
        <link rel="stylesheet" href="/public/output.css" type="text/css" />
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2Q48ECMC0R"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-2Q48ECMC0R');
        </script>
      </head>
      <body class="dark">
        ${ReactDOMServer.renderToString(<Root>{node}</Root>)}
        ${
          opts?.scripts?.map(
            (scriptName) => `<script async src="${scriptName}"></script>`
          ) ?? ""
        }
      </body>
    </html>
  `;
}

export const Root = ({ children }) => {
  return <PageWrapper>{children}</PageWrapper>;
};
