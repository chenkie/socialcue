import { Campaign } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../db';

type ResponseData = {
  message: string;
  data?: Campaign;
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
      const { name, description } = JSON.parse(req.body);

      const campaign = await prisma.campaign.update({
        where: { id: id as string },
        data: {
          name,
          description,
          updatedAt: new Date()
        }
      });

      return res
        .status(200)
        .json({ message: 'Campaign updated!', data: campaign });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const campaign = await prisma.campaign.delete({
        where: { id: id as string }
      });

      return res
        .status(200)
        .json({ message: 'Campaign deleted!', data: campaign });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  }
};
