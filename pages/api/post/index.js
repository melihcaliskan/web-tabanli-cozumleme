import nextConnect from 'next-connect';
import middleware from '../../../middleware/auth';
const models = require('../../../db/models/index');

const handler = nextConnect()
  // Get method
  .get(async (req, res) => {
    const {
      query: { nextPage },
      method,
      body,
    } = req;

    const posts = await models.posts.findAndCountAll({
      include: [
        {
          model: models.users,
          as: 'user',
        },
      ],
      attributes: {
        exclude: ['userId'],
      },
      order: [
        ['id', 'DESC'],
      ],
      offset: nextPage ? +nextPage : 0,
      limit: 5,
    });

    res.statusCode = 200;
    res.json({
      status: 'success',
      data: posts.rows,
      total: posts.count,
      nextPage: +nextPage + 5,
    });
  });

export default handler;
