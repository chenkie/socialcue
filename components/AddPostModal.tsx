import { CheckIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Select from 'react-select';
import { getPublishAtTime } from '../lib/util';
import Button from './Button';
import FormGroup from './FormGroup';
import ProviderOptionLabel from './ProviderOptionLabel';
import SideModal from './SideModal';
import TimeInput from './TimeInput';

interface AddPostModalProps {
  isOpen: boolean;
  date: Date;
  onClose: () => void;
  onAddPostSuccess: (result: any) => void;
  onAddPostError: (err: string) => void;
  providers: any[];
  campaigns: any[];
}

const AddPostModal = (props: AddPostModalProps) => {
  const {
    isOpen,
    date,
    onClose,
    onAddPostSuccess,
    onAddPostError,
    providers,
    campaigns
  } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const addPostMutation = useMutation(
    'addPost',
    async ({
      provider,
      campaigns,
      body,
      publishAt
    }: {
      provider: string;
      campaigns: string;
      body: string;
      publishAt: Date;
    }) => {
      try {
        const response = await fetch('./api/posts', {
          method: 'POST',
          body: JSON.stringify({ provider, campaigns, body, publishAt })
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
      onSuccess: (result) => onAddPostSuccess(result),
      onError: (err: { message: string }) => onAddPostError(err.message)
    }
  );

  const onSubmit = (data) => {
    const { provider, body, campaigns, time } = data;

    const publishAt = getPublishAtTime(date, time);

    addPostMutation.mutate({
      provider,
      campaigns,
      body,
      publishAt
    });
  };

  return (
    <SideModal title="Add Post" isOpen={isOpen} onClose={onClose}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label className="form-label">Account</label>
            <Select
              {...register('provider', { required: true })}
              name="provider"
              options={providers.map((p) => ({
                value: p.id,
                label: `${p.name} - ${p.account}`,
                provider: p.name
              }))}
              formatOptionLabel={ProviderOptionLabel}
              onChange={(provider) => setValue('provider', provider.value)}
            />
            {errors.provider && (
              <p className="form-error">Provider is required</p>
            )}
          </FormGroup>

          <FormGroup>
            <label className="form-label">Campaigns</label>
            <Select
              {...register('campaigns')}
              name="campaigns"
              options={campaigns.map((campaign) => ({
                value: campaign.id,
                label: campaign.name
              }))}
              onChange={(campaigns) => {
                setValue(
                  'campaigns',
                  campaigns.map((c) => c.value)
                );
              }}
              isMulti
            />
          </FormGroup>

          <FormGroup>
            <label className="form-label">Post Body</label>
            <textarea
              className="form-textarea h-48"
              {...register('body', { required: true })}
              placeholder="My post here"
            />
            {errors.body && <p className="form-error">Body is required</p>}
          </FormGroup>

          <FormGroup>
            <label className="form-label">Post Time</label>
            <TimeInput
              {...register('time', { required: true })}
              onChange={(value) => setValue('time', value)}
            />
            {errors.time && <p className="form-error">Time is required</p>}
          </FormGroup>

          <div className="mt-6">
            <Button type="submit" text="Submit" icon={CheckIcon} />
          </div>
        </form>
      </div>
    </SideModal>
  );
};

export default AddPostModal;
