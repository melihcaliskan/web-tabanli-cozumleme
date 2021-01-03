import nextConnect from 'next-connect';
import { verifyToken } from './utils';

const middleware = nextConnect();

const restricted = ['/api/post/[slug]', '/api/job/[slug]'];

export default middleware.use(async (req, res, next) => {
  let authHeader = req.headers.authorization || '';
  let user = {};

  if (!restricted.includes(req.url) && !authHeader) {
    return next();
  }
  if (authHeader) {
    let sessionID = authHeader.split(' ')[1];
    if (sessionID) {
      user = verifyToken(sessionID);
      if (user) {
        req.user = user;
      } else {
        res.statusCode = 401;
        return res.send({
          status: 'error',
          error: 'Kullanıcı keyiniz sona erdi...',
        });
      }
    } else {
      res.statusCode = 401;
      return res.send({
        status: 'error',
        error: 'Kullanıcı keyiniz hatalı...',
      });
    }
  } else {
    res.statusCode = 401;
    return res.send({
      status: 'error',
      error: 'Giriş yapmadınız...',
    });
  }
  return next();
});
