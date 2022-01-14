import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import Dropdown from '../components/Dropdown';
import Card from './Card';

interface ResourceCardProps {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}
const ResourceCard = (props: ResourceCardProps) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div className="">{props.children}</div>
        <Dropdown
          items={[
            {
              text: 'Edit',
              icon: PencilAltIcon,
              action: props.onEdit
            },
            {
              text: 'Delete',
              icon: TrashIcon,
              action: props.onDelete
            }
          ]}
        />
      </div>
    </Card>
  );
};
export default ResourceCard;
