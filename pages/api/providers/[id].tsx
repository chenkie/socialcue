import { Prisma, Provider } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../db';

type ResponseData = {
  message: string;
  data?: Provider;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (!['PATCH', 'DELETE'].includes(req.method)) {
    return res.status(400).json({ message: 'Method not supported' });
  }

  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const { name, account } = JSON.parse(req.body);

      const input: Prisma.ProviderUpdateArgs = {
        where: {
          id: id as string
        },
        data: {
          name,
          account,
          updatedAt: new Date()
        }
      };

      const provider = await prisma.provider.update(input);

      return res
        .status(200)
        .json({ message: 'Provider updated!', data: provider });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const provider = await prisma.provider.delete({
        where: { id: id as string }
      });

      return res
        .status(200)
        .json({ message: 'Provider deleted!', data: provider });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  }
};
