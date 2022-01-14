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
  if (req.method === 'POST') {
    try {
      const { name, account } = JSON.parse(req.body);

      const data: Prisma.ProviderCreateInput = {
        name,
        account
      };

      const provider = await prisma.provider.create({ data });

      res.status(200).json({ message: 'Provider added!', data: provider });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(400).json({ message: 'Method not supported' });
  }
};
