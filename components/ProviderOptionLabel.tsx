import Image from 'next/image';

interface ProviderOptionLabelProps {
  value: string;
  label: string;
  provider: string;
}

const ProviderOptionLabel = ({ label, provider }: ProviderOptionLabelProps) => (
  <div className="flex">
    <Image
      width="25"
      height="25"
      objectFit="contain"
      alt={`${provider} logo`}
      src={`/${provider}.png`}
    />
    <p className="ml-2 my-auto">{label}</p>
  </div>
);

export default ProviderOptionLabel;
