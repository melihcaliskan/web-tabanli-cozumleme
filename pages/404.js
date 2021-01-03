/* components */
import Layout from '../components/layout/Layout';

// pages/404.js
export default function Custom404() {
  return (
    <Layout title="Sayfa bulunamadı">
      <div className="page-error">
        <h1>404 - Sayfa Bulunamadı</h1>
      </div>
    </Layout>
  );
}
