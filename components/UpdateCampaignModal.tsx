import { CheckIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Button from './Button';
import FormGroup from './FormGroup';
import SideModal from './SideModal';

interface UpdateCampaignModalProps {
  campaign: any;
  isOpen: boolean;
  onClose: () => void;
  onCampaignUpdateSuccess: (result: any) => void;
  onCampaignUpdateError: (err: string) => void;
}

const UpdateCampaignModal = (props: UpdateCampaignModalProps) => {
  const {
    campaign,
    isOpen,
    onClose,
    onCampaignUpdateSuccess,
    onCampaignUpdateError
  } = props;

  if (!campaign) {
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: campaign.name,
      description: campaign.description
    }
  });

  const updateCampaignMutation = useMutation(
    'updateCampaign',
    async ({ name, description }: { name: string; description: string }) => {
      try {
        const response = await fetch(`./api/campaigns/${campaign.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ name, description })
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
      onSuccess: (result) => onCampaignUpdateSuccess(result),
      onError: (err: { message: string }) => onCampaignUpdateError(err.message)
    }
  );

  const onSubmit = (values) => updateCampaignMutation.mutate(values);

  return (
    <SideModal title="Update Campaign" isOpen={isOpen} onClose={onClose}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label className="form-label">Name</label>
            <input
              {...register('name', { required: true })}
              placeholder="My social campaign"
              name="name"
              className="form-input"
            />
            {errors.name && <p className="form-error">Name is required</p>}
          </FormGroup>

          <FormGroup>
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea h-48"
              {...register('description', { required: true })}
              placeholder="This campaign will get lots of follows"
            />
            {errors.description && (
              <p className="form-error">Description is required</p>
            )}
          </FormGroup>

          <div className="mt-6">
            <Button type="submit" text="Submit" icon={CheckIcon} />
          </div>
        </form>
      </div>
    </SideModal>
  );
};

export default UpdateCampaignModal;
