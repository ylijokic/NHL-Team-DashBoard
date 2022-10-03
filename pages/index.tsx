import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NHL Dashboard</title>
        <meta name="description" content="NHL Dashboard" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href='/teams'>
            <a className={styles.card}>
              <h2>NHL Teams &rarr;</h2>
              <p>Explore detailed information about all 32 NHL franchises!</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home;
