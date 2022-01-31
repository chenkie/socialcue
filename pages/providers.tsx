import { ChatAlt2Icon } from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import AddProviderModal from '../components/AddProviderModal';
import ResourceAction from '../components/ResourceAction';
import ResourceCard from '../components/ResourceCard';
import UpdateProviderModal from '../components/UpdateProviderModal';
import { providerOptions } from '../lib/providers';
import providers from './../lib/data/providers.json';

const Providers = () => {
  const [socialProviders, setSocialProviders] = useState(providers);
  const [addProviderOpen, setAddProviderOpen] = useState(false);
  const [providerToEdit, setProviderToEdit] = useState(null);

  const deleteProviderMutation = useMutation(
    'deleteProvider',
    async ({ id }: { id: string }) => {
      try {
        const response = await fetch(`./api/providers/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        return await response.json();
      } catch (err) {
        throw new Error(err);
      }
    },
    {
      onSuccess: (result) => {
        toast.success(result.message);
        setSocialProviders(
          socialProviders.filter((provider) => provider.id !== result.data.id)
        );
        setAddProviderOpen(false);
      },
      onError: (err: { message: string }) => {
        toast.error(err.message);
      }
    }
  );

  return (
    <div>
      <Head>
        <title>Providers | SocialCue</title>
      </Head>
      <ResourceAction
        actionText="Add Provider"
        emptyIcon={ChatAlt2Icon}
        onClick={() => setAddProviderOpen(true)}
        resourceCount={socialProviders.length}
        emptyMessage="No providers yet"
      />
      {socialProviders.map((provider) => (
        <ResourceCard
          onEdit={() => setProviderToEdit(provider)}
          onDelete={() => {
            if (confirm('Are you sure you want to delete this provider?')) {
              deleteProviderMutation.mutate({ id: provider.id });
            }
          }}
          key={provider.id}
        >
          <div className="flex mb-2 py-2">
            <Image
              width="25"
              height="25"
              objectFit="contain"
              alt={`${provider.name} logo`}
              src={`/${provider.name}.png`}
            />
            <div className="flex">
              <p className="text-gray-600 my-auto ml-2">{provider.name}</p>
            </div>
          </div>
          <a
            href={`https://${provider.name}.com/${provider.account}`}
            target="_blank"
            className="text-lg font-semibold text-violet hover:underline"
          >
            @{provider.account}
          </a>
        </ResourceCard>
      ))}

      <AddProviderModal
        isOpen={addProviderOpen}
        providerOptions={providerOptions}
        onClose={() => setAddProviderOpen(false)}
        onProviderAddSuccess={(result) => {
          toast.success(result.message);
          setSocialProviders([...socialProviders, result.data]);
          setAddProviderOpen(false);
        }}
        onProviderAddError={(err) => {
          toast.error(err);
        }}
      />

      <UpdateProviderModal
        isOpen={!!providerToEdit}
        provider={providerToEdit}
        providerOptions={providerOptions}
        onClose={() => setProviderToEdit(null)}
        onProviderUpdateSuccess={(result) => {
          toast.success(result.message);
          setSocialProviders(
            socialProviders.map((provider) => {
              if (provider.id === result.data.id) {
                return result.data;
              }
              return provider;
            })
          );
          setProviderToEdit(null);
          setAddProviderOpen(false);
        }}
        onProviderUpdateError={(err) => toast.error(err)}
      />
    </div>
  );
};

export default Providers;
