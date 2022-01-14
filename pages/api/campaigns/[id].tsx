import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  data?: any;
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
      return res.status(200).json({ message: 'Campaign updated!', data: null });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      return res.status(200).json({ message: 'Campaign deleted!', data: null });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  }
};
