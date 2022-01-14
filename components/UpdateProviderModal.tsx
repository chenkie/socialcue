import { CheckIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Select from 'react-select';
import { ProviderOption } from '../lib/providers';
import Button from './Button';
import FormGroup from './FormGroup';
import ProviderOptionLabel from './ProviderOptionLabel';
import SideModal from './SideModal';

interface UpdateProviderModalProps {
  isOpen: boolean;
  provider: any;
  providerOptions: ProviderOption[];
  onClose: () => void;
  onProviderUpdateSuccess: (result: any) => void;
  onProviderUpdateError: (err: string) => void;
}

const UpdateProviderModal = (props: UpdateProviderModalProps) => {
  const {
    isOpen,
    provider,
    providerOptions,
    onClose,
    onProviderUpdateSuccess,
    onProviderUpdateError
  } = props;

  if (!provider) {
    return null;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: provider.name,
      account: provider.account
    }
  });

  const updateProviderMutation = useMutation(
    'updateProvider',
    async ({ name, account }: { name: string; account: string }) => {
      try {
        const response = await fetch(`./api/providers/${provider.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ name, account })
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
      onSuccess: (result) => onProviderUpdateSuccess(result),
      onError: (err: { message: string }) => onProviderUpdateError(err.message)
    }
  );

  const onSubmit = (values) => updateProviderMutation.mutate(values);

  return (
    <SideModal title="Update Provider" isOpen={isOpen} onClose={onClose}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label className="form-label">Provider</label>
            <Select
              {...register('name', { required: true })}
              name="name"
              formatOptionLabel={ProviderOptionLabel}
              options={providerOptions}
              onChange={({ value }) => {
                setValue('name', value);
              }}
              value={{
                value: provider.name,
                label: provider.name,
                provider: provider.name
              }}
            />
            {errors.name && <p className="form-error">Provider is required</p>}
          </FormGroup>

          <FormGroup>
            <label className="form-label">Username/Account Handle</label>
            <input
              className="form-input"
              {...register('account', { required: true })}
              placeholder="johndoe"
            />
            {errors.account && (
              <p className="form-error">Username/handle is required</p>
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

export default UpdateProviderModal;
