import { Campaign, Post, Provider } from '@prisma/client';

export type Result = {
  message: string;
  data: Post | Campaign | Provider;
};

export type PostResult = {
  message: string;
  data: Post & { provider: Provider };
};

export type CampaignResult = {
  message: string;
  data: Campaign;
};

export type ProviderResult = {
  message: string;
  data: Provider;
};
