import { CheckIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import SideModal from '../components/SideModal';
import { CampaignResult } from '../lib/types';

interface AddCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignAddSuccess: (result: CampaignResult) => void;
  onCampaignAddError: (err: string) => void;
}

const AddCampaignModal = (props: AddCampaignModalProps) => {
  const { isOpen, onClose, onCampaignAddSuccess, onCampaignAddError } = props;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const addCampaignMutation = useMutation(
    'addCampaign',
    async ({ name, description }: { name: string; description: string }) => {
      try {
        const response = await fetch('./api/campaigns', {
          method: 'POST',
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
      onSuccess: (result) => onCampaignAddSuccess(result),
      onError: (err: { message: string }) => onCampaignAddError(err.message)
    }
  );

  const onSubmit = (values) => addCampaignMutation.mutate(values);

  return (
    <SideModal title="Add Campaign" isOpen={isOpen} onClose={onClose}>
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

export default AddCampaignModal;
