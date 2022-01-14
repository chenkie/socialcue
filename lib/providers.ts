export type ProviderOption = {
  label: string;
  value: string;
  provider: string;
};

export const providerOptions: ProviderOption[] = [
  {
    label: 'Twitter',
    value: 'Twitter',
    provider: 'Twitter'
  },
  {
    label: 'Instagram',
    value: 'Instagram',
    provider: 'Instagram'
  },
  {
    label: 'Facebook',
    value: 'Facebook',
    provider: 'Facebook'
  },
  {
    label: 'LinkedIn',
    value: 'LinkedIn',
    provider: 'LinkedIn'
  }
];
