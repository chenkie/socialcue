import { Post, Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../db';

type ResponseData = {
  message: string;
  data?: Post;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === 'POST') {
    try {
      const { provider, campaigns, body, publishAt } = JSON.parse(req.body);

      const data: Prisma.PostCreateInput = {
        body,
        publishAt,
        provider: {
          connect: {
            id: provider
          }
        },
        campaigns: {
          connect: campaigns.map((c) => ({ id: c }))
        }
      };

      const post = await prisma.post.create({
        data,
        include: {
          provider: true,
          campaigns: true
        }
      });

      res.status(200).json({ message: 'Post added!', data: post });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(400).json({ message: 'Method not supported' });
  }
};
