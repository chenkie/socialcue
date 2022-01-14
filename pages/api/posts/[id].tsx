import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  data?: any;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      res.status(200).json({ message: 'Post updated!', data: null });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'DELETE') {
    try {
      res.status(200).json({ message: 'Post deleted!', data: null });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(400).json({ message: 'Method not supported' });
  }
};
