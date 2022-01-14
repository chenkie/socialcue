import { CheckIcon, TrashIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Select from 'react-select';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import ProviderOptionLabel from '../components/ProviderOptionLabel';
import SideModal from '../components/SideModal';
import { getPublishAtTime, getTime } from '../lib/util';
import TimeInput from './TimeInput';

interface UpdatePostModalProps {
  post: any;
  providers: any[];
  campaigns: any[];
  onClose: () => void;
  onUpdatePostSuccess: (result: any) => void;
  onUpdatePostError: (err: string) => void;
  onDeletePostSuccess: (result: any) => void;
  onDeletePostError: (err: string) => void;
}

const UpdatePostModal = (props: UpdatePostModalProps) => {
  const {
    providers,
    campaigns,
    post,
    onClose,
    onUpdatePostSuccess,
    onUpdatePostError,
    onDeletePostSuccess,
    onDeletePostError
  } = props;

  if (!post) {
    return null;
  }

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      provider: post.provider.id,
      campaigns: post.campaigns
        ? post.campaigns.map((campaign) => campaign.id)
        : [],
      body: post.body,
      time: getTime(post.publishAt as unknown as string)
    }
  });

  const updatePostMutation = useMutation(
    'updatePost',
    async ({
      id,
      provider,
      campaigns,
      body,
      publishAt
    }: {
      id: string;
      provider: string;
      campaigns: string;
      body: string;
      publishAt: Date;
    }) => {
      try {
        const response = await fetch(`./api/posts/${id}`, {
          method: 'PATCH',
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
      onSuccess: (result) => onUpdatePostSuccess(result),
      onError: (err: { message: string }) => onUpdatePostError(err.message)
    }
  );

  const deletePostMutation = useMutation(
    'deletePost',
    async ({ id }: { id: string }) => {
      try {
        const response = await fetch(`./api/posts/${id}`, {
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
      onSuccess: (result) => onDeletePostSuccess(result),
      onError: (err: { message: string }) => onDeletePostError(err.message)
    }
  );

  const onSubmit = (data) => {
    const { provider, campaigns, body, time } = data;

    const publishAt = getPublishAtTime(post.publishAt, time);

    updatePostMutation.mutate({
      id: post.id,
      provider,
      campaigns,
      body,
      publishAt
    });
  };

  return (
    <SideModal title="Edit Post" isOpen={!!post} onClose={onClose}>
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
              value={{
                value: post.provider.id,
                label: `${post.provider.name} - ${post.provider.account}`,
                provider: post.provider.name
              }}
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
              defaultValue={post.campaigns.map((campaign) => ({
                value: campaign.id,
                label: campaign.name
              }))}
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
              time={getValues('time')}
              onChange={(value) => setValue('time', value)}
            />
            {errors.time && <p className="form-error">Time is required</p>}
          </FormGroup>

          <div className="mt-6">
            <Button type="submit" text="Submit" icon={CheckIcon} />
          </div>
        </form>
      </div>
      <section className="mt-16">
        <div className="px-2 py-1 bg-red-600 rounded-tr rounded-tl">
          <p className="text-red-50 font-bold text-sm">Danger Zone</p>
        </div>
        <div className="px-3 py-4 border border-red-600 rounded-br rounded-bl">
          <Button
            text="Delete Post"
            type="button"
            color="danger"
            size="sm"
            icon={TrashIcon}
            onClick={() => {
              if (confirm('Are you sure you want to delete this post?')) {
                deletePostMutation.mutate({ id: post.id });
              }
            }}
          />
        </div>
      </section>
    </SideModal>
  );
};

export default UpdatePostModal;
