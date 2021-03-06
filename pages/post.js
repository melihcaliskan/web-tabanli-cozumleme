import React from 'react';

import Link from 'next/link';
import Router, { useRouter } from 'next/router';

/* utils */
import { absoluteUrl, getAppCookies } from '../middleware/utils';

/* components */
import Layout from '../components/layout/Layout';
import UserNav from '../components/navigation/User';

function Post(props) {
  const router = useRouter();
  const { origin, user, posts } = props;

  function renderPosts(posts) {
    return posts.data.map((post, j) => {
      return (
        <Link key={j} href="/post/[slug]" as={`/post/${post.slug}`}>
          <a className="card">
            <img src={post.title} className="mb-5 rounded-lg" style={{ width: "100%" }} />
            <p className="text-4xl">Fotoğrafın içeriği: {post.content}</p>
            <audio className="mt-3 mb-10" src={"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=Foto%C4%9Fraf%C4%B1n%20i%C3%A7eri%C4%9Fi%20" + encodeURI(post.content) + "&tl=tr&total=1&idx=0&textlen=51"} controls>
              Your browser does not support the audio element.
                </audio>
            <hr className="my-3" />
            <div>
              <small>{post.createdAt}</small>
            </div>
            <div>
              <small>
                Paylaşan : {post.user.firstName || ''} {post.user.lastName || ''}
              </small>
            </div>
          </a>
        </Link>
      );
    });
  }

  async function loadMoreClick(e) {
    await Router.push({
      pathname: '/post',
      query: {
        nextPage: posts.nextPage ? posts.nextPage : 5,
      },
    });
  }

  return (
    <Layout
      url={`${origin}${router.asPath}`}
      origin={origin}
    >
      <main>
        <p className="text-4xl mb-10 leading-snug font-medium">
          Son Paylaşımlar
        </p>
        <UserNav props={{ user: user }} />
        <h2>
          {' '}
          <Link
            href={{
              pathname: '/',
            }}
          >
            <a>&larr; </a>
          </Link>
            Geri
          </h2>
        <div className="grid">
          <small
            style={{
              textAlign: 'center',
              marginTop: '0rem',
              marginBottom: '1rem',
            }}
          >
            <Link href="/post/add">
              <a>+ Paylaşım Ekle</a>
            </Link>
          </small>
          {posts.status === 'success' ? (
            posts.data.length && renderPosts(posts)
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
                {posts.error}
              </h3>
            )}

          {posts.status === 'success' && (
            <>
              {posts.nextPage < posts.total &&
                posts.data.length !== posts.total ? (
                  <button onClick={loadMoreClick}>Sonraki</button>
                ) : (
                  <span className="span-info">Paylaşımların sonuna gelindi</span>
                )}
              <style jsx>
                {`
                    button,
                    .span-info {
                      margin: 1rem auto;
                      padding: 0.5rem 1rem;
                      border: 1px solid #cecece;
                      background-color: #fffcfc;
                      color: #7b7b7b;
                      outline: none;
                    }
                  `}
              </style>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}

/* getServerSideProps */
export async function getServerSideProps(context) {
  const { query, req } = context;
  const { nextPage } = query;
  const { origin } = absoluteUrl(req);

  const token = getAppCookies(req).token || '';
  const referer = req.headers.referer || '';

  const nextPageUrl = !isNaN(nextPage) ? `?nextPage=${nextPage}` : '';
  const baseApiUrl = `${origin}/api`;

  const postsApi = await fetch(`${baseApiUrl}/post${nextPageUrl}`, {
    headers: {
      authorization: token || '',
    },
  });

  const posts = await postsApi.json();

  return {
    props: {
      origin,
      referer,
      token,
      posts,
    },
  };
}

export default Post;
