import { Campaign, Prisma } from '@prisma/client';
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
  if (req.method === 'POST') {
    try {
      const { name, description } = JSON.parse(req.body);

      const data: Prisma.CampaignCreateInput = {
        name,
        description
      };

      const campaign = await prisma.campaign.create({ data });

      res.status(200).json({ message: 'Provider added!', data: campaign });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(400).json({ message: 'Method not supported' });
  }
};
