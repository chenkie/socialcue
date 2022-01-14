import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  data?: any;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === 'POST') {
    try {
      res.status(200).json({ message: 'Post added!', data: null });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(400).json({ message: 'Method not supported' });
  }
};
