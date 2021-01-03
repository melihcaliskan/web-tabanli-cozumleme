import React from 'react';

import Link from 'next/link';
import Router, { useRouter } from 'next/router';

/* utils */
import { absoluteUrl } from '../middleware/utils';

/* components */
import Layout from '../components/layout/Layout';
import UserNav from '../components/navigation/User';

function User(props) {
  const router = useRouter();
  const { origin, user, users } = props;

  function renderUsers(users) {
    return users.data.map((user, i) => {
      return (
        <Link key={i} href="/user/[slug]" as={`/user/${user.id}`}>
          <a className="card">
            <h3 className="headline">
              {/* {user.firstName} {user.lastName} */}
              {user.username}
            </h3>
            <p>{user.email}</p>
            <small>Yüklemeler: {user.posts.length}</small>{' '}
          </a>
        </Link>
      );
    });
  }

  async function loadMoreClick(e) {
    await Router.push({
      pathname: '/user',
      query: {
        nextPage: users.nextPage ? users.nextPage : 5,
      },
    });
  }

  return (
    <Layout
      url={`${origin}${router.asPath}`}
      origin={origin}
    >
      <main>
        <UserNav props={{ user: user }} />
        <h2>
          <Link href={{ pathname: '/' }}>
            <a>&larr; </a>
          </Link>
            Önceki Sayfa
          </h2>
        <div className="grid">
          {users.status === 'success' ? (
            users.data.length && renderUsers(users)
          ) : (
              <h3
                style={{
                  textAlign: 'center',
                  marginTop: '0rem',
                  marginBottom: '1rem',
                  display: 'inline-block',
                  width: '100%',
                }}
              >
                {users.error}
              </h3>
            )}
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const { nextPage } = query;
  const { origin } = absoluteUrl(req);

  const referer = req.headers.referer || '';

  const nextPageUrl = !isNaN(nextPage) ? `?nextPage=${nextPage}` : '';
  const baseApiUrl = `${origin}/api`;

  const usersApi = await fetch(`${baseApiUrl}/user${nextPageUrl}`);
  const users = await usersApi.json();

  return {
    props: {
      origin,
      referer,
      users,
    },
  };
}

export default User;
