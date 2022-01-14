import { CheckIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Select from 'react-select';
import Button from '../components/Button';
import ProviderOptionLabel from '../components/ProviderOptionLabel';
import SideModal from '../components/SideModal';
import { ProviderOption } from '../lib/providers';
import FormGroup from './FormGroup';

interface AddProviderModalProps {
  isOpen: boolean;
  providerOptions: ProviderOption[];
  onClose: () => void;
  onProviderAddSuccess: (result: any) => void;
  onProviderAddError: (err: string) => void;
}

const AddProviderModal = (props: AddProviderModalProps) => {
  const {
    isOpen,
    providerOptions,
    onClose,
    onProviderAddSuccess,
    onProviderAddError
  } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const addProviderMutation = useMutation(
    'addProvider',
    async ({ name, account }: { name: string; account: string }) => {
      try {
        const response = await fetch('./api/providers', {
          method: 'POST',
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
      onSuccess: (result) => onProviderAddSuccess(result),
      onError: (err: { message: string }) => onProviderAddError(err.message)
    }
  );

  const onSubmit = (values) => addProviderMutation.mutate(values);

  return (
    <SideModal title="Add Provider" isOpen={isOpen} onClose={onClose}>
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

export default AddProviderModal;
