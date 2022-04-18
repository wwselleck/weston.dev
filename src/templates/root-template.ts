export function renderRoot (str: string, opts?: any) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Weston Selleck</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700&display=swap">

        <link rel="stylesheet" href="/public/reset.css" type="text/css" />
        <link rel="stylesheet" href="/public/styles.css" type="text/css" />
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2Q48ECMC0R"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-2Q48ECMC0R');
        </script>
      </head>
      <body>
        ${str}
        ${opts?.scripts?.map(scriptName => `<script async src="${scriptName}"></script>`) ?? ''}
      </body>
    </html>
  `;
}
