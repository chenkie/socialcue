import { PlusIcon } from '@heroicons/react/solid';
import { SVGProps } from 'react';
import Button from './Button';

interface ResourceActionProps {
  emptyMessage: string;
  resourceCount: number;
  emptyIcon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  actionText: string;
  onClick: (boolean) => void;
}

const ResourceAction = (props: ResourceActionProps) => {
  return (
    <>
      {props.resourceCount === 0 ? (
        <div className="flex mt-12 flex-col">
          <div className="w-8 m-auto text-violet">{props.emptyIcon(null)}</div>
          <p className="m-auto text-gray-800 text-semibold text-lg mt-2">
            {props.emptyMessage}
          </p>
          <div className="mt-4 m-auto">
            <Button
              text={props.actionText}
              icon={PlusIcon}
              onClick={props.onClick}
            />
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <Button
            text={props.actionText}
            icon={PlusIcon}
            onClick={props.onClick}
          />
        </div>
      )}
    </>
  );
};

export default ResourceAction;
