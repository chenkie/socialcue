import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { Fragment, SVGProps } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type DropdownItem = {
  text: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  action: () => void;
};

interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown = (props: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-violet">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {props.items.map((item, i: number) => {
              return (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <button
                      onClick={item.action}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full text-left'
                      )}
                    >
                      <div className="flex group">
                        <div className="w-5 text-gray-400 mr-2 group-hover:text-gray-500">
                          {item.icon(null)}
                        </div>
                        <div>{item.text}</div>
                      </div>
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
