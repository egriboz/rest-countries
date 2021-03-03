import Head from "next/head";
import styles from "../styles/Home.module.css";
import SiteConfig from "../site.config";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Fatih Eğriboz - Global Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className={styles.header}>
        <p>
          {SiteConfig.title} - {SiteConfig.description}
        </p>
        <ColorModeSwitcher />
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>footer</footer>
    </>
  );
}

export default Layout;
