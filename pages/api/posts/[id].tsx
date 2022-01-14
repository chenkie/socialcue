import { Post } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../db';

const makeCampaignsFragment = (campaigns) => {
  if (!campaigns || !campaigns.length) {
    return {
      set: []
    };
  } else {
    return {
      connect: campaigns.map((campaign) => ({ id: campaign }))
    };
  }
};

type ResponseData = {
  message: string;
  data?: Post;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const data = JSON.parse(req.body);

      const post = await prisma.post.update({
        where: { id: id as string },
        data: {
          body: data.body,
          publishAt: data.publishAt,
          provider: {
            connect: {
              id: data.provider
            }
          },
          campaigns: makeCampaignsFragment(data.campaigns),
          updatedAt: new Date()
        },
        include: {
          provider: true,
          campaigns: true
        }
      });

      res.status(200).json({ message: 'Post updated!', data: post });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const post = await prisma.post.delete({
        where: { id: id as string }
      });

      res.status(200).json({ message: 'Post deleted!', data: post });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(400).json({ message: 'Method not supported' });
  }
};
