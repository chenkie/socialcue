import { SpeakerphoneIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import pluralize from 'pluralize';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import AddCampaignModal from '../components/AddCampaignModal';
import ResourceAction from '../components/ResourceAction';
import ResourceCard from '../components/ResourceCard';
import UpdateCampaignModal from '../components/UpdateCampaignModal';
import campaignsData from './../lib/data/campaigns.json';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(campaignsData);
  const [addCampaignOpen, setAddCampaignOpen] = useState(false);
  const [campaignForEdit, setCampaignForEdit] = useState(null);

  const deleteCampaignMutation = useMutation(
    'deleteCampaign',
    async ({ id }: { id: string }) => {
      try {
        const response = await fetch(`./api/campaigns/${id}`, {
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
        setCampaigns(
          campaigns.filter((provider) => provider.id !== result.data.id)
        );
      },
      onError: (err: { message: string }) => {
        toast.error(err.message);
      }
    }
  );

  return (
    <div>
      <Head>
        <title>Campaigns | SocialCue</title>
      </Head>
      <ResourceAction
        actionText="Add Campaign"
        emptyIcon={SpeakerphoneIcon}
        onClick={() => setAddCampaignOpen(true)}
        resourceCount={campaigns.length}
        emptyMessage="No campaigns yet"
      />

      {campaigns.map((campaign) => (
        <ResourceCard
          onEdit={() => setCampaignForEdit(campaign)}
          onDelete={() => {
            if (confirm('Are you sure you want to delete this campaign?')) {
              deleteCampaignMutation.mutate({ id: campaign.id });
            }
          }}
          key={campaign.id}
        >
          <p className="text-lg font-semibold text-gray-700">{campaign.name}</p>
          <div className="mb-4">
            <span className="bg-purple-200 px-2 py-1 rounded-full text-purple-800 text-xs">
              {campaign.posts ? (
                <>
                  {campaign.posts.length}{' '}
                  {pluralize('Posts', campaign.posts.length)} Scheduled
                </>
              ) : (
                <span>0 Posts Scheduled</span>
              )}
            </span>
          </div>
          <p className="mt-2 text-gray-600">{campaign.description}</p>
        </ResourceCard>
      ))}

      <AddCampaignModal
        isOpen={addCampaignOpen}
        onClose={() => setAddCampaignOpen(false)}
        onCampaignAddSuccess={(result) => {
          toast.success(result.message);
          setCampaigns([...campaigns, result.data]);
          setAddCampaignOpen(false);
        }}
        onCampaignAddError={(err) => toast.error(err)}
      />

      <UpdateCampaignModal
        campaign={campaignForEdit}
        isOpen={!!campaignForEdit}
        onClose={() => setCampaignForEdit(null)}
        onCampaignUpdateSuccess={(result) => {
          toast.success(result.message);
          setCampaigns(
            campaigns.map((campaign) => {
              if (campaign.id === result.data.id) {
                return result.data;
              }
              return campaign;
            })
          );
          setCampaignForEdit(null);
        }}
        onCampaignUpdateError={(err) => toast.error(err)}
      />
    </div>
  );
};

export default Campaigns;
