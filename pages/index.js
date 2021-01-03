import Link from 'next/link';
import { absoluteUrl } from '../middleware/utils';
import Layout from '../components/layout/Layout';
import UserNav from '../components/navigation/User';

export default function Home(props) {
  const { user, origin } = props;
  return (
    <Layout
      title="201713171036 - Melih Çalışkan"
      url={origin}
      origin={origin}>
      <main className="home-page">
        <p className="text-3xl mb-2">Melih Çalışkan</p>
        <p className="text-3xl mb-5">201713171036</p>
        <p className="text-4xl mb-10 leading-snug font-medium">Web Tabanlı Uygulama<br />Çözümlemeleri Projesi</p>
        <UserNav props={{ user: user }} />
        <div className="grid">
          <Link href="/post/add">
            <a className="card">
              <h3>Projeyi Dene &rarr;</h3>
              <p>Fotoğraf yükle ve açıklamasını gör.</p>
            </a>
          </Link>
          <Link href="/post">
            <a className="card">
              <h3>Önceki Denemeleri Listele &rarr;</h3>
              <p>Önceden yüklenen fotoğrafları ve açıklamalarını listele</p>
            </a>
          </Link>
          <Link href="/user">
            <a className="card">
              <h3>Kullanıcılar &rarr;</h3>
              <p>Son kaydolan kullanıcıları gör</p>
            </a>
          </Link>
          <Link href="/demo/instagram">
            <a className="card">
              <h3>Demo 1 &rarr;</h3>
              <p>Demoyu Instagram üzerinde gör</p>
            </a>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  return {
    props: {
      origin,
    },
  };
}
