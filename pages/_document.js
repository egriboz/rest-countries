import Document, { Html, Head, Main, NextScript } from "next/document";

import SiteConfig from "../site.config.js";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={SiteConfig.lang}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content={SiteConfig.description} />
          {/* pwa */}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#fff" />
          <meta name="application-name" content={SiteConfig.title} />
          <meta name="apple-mobile-web-app-title" content={SiteConfig.title} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          {/* ico */}
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          {/* analytic */}
          {SiteConfig.googleAnalytic && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${SiteConfig.googleAnalytic}`}
              />
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${SiteConfig.googleAnalytic}');`,
                }}
              />
            </>
          )}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
