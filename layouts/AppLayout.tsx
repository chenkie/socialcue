import { Dialog, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  ChatAlt2Icon,
  MenuIcon,
  SpeakerphoneIcon,
  XIcon
} from '@heroicons/react/outline';
import classnames from 'classnames';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Toaster } from 'react-hot-toast';

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { name: 'Schedule', href: '/', icon: CalendarIcon },
  { name: 'Campaigns', href: '/campaigns', icon: SpeakerphoneIcon },
  { name: 'Providers', href: '/providers', icon: ChatAlt2Icon }
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Paytone+One&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        {sidebarOpen && (
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 md:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4 justify-center">
                      <img
                        className="-m-10 sm:m-0"
                        src="/logo.svg"
                        alt="Workflow"
                      />
                    </div>
                    <nav className="mt-5 px-2 space-y-1">
                      {navItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <div
                            className={classnames({
                              'group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer':
                                true,
                              'bg-gray-100 text-gray-800 font-bold':
                                item.href === router.route,
                              'text-gray-600 hover:bg-gray-50 hover:text-gray-900':
                                item.href !== router.route
                            })}
                          >
                            {/*// @ts-ignore */}
                            <item.icon
                              className={classnames({
                                'mr-3 flex-shrink-0 h-6 w-6': true,
                                'text-violet': item.href === router.route,
                                'text-gray-400 group-hover:text-gray-500':
                                  item.href !== router.route
                              })}
                              aria-hidden="true"
                            />
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14"></div>
            </Dialog>
          </Transition.Root>
        )}

        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 -m-16">
                <img className="w-auto" src="/logo.svg" alt="Workflow" />
              </div>
              <nav className="mt-5 flex-1 px-4 bg-white space-y-1">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={classnames({
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer':
                          true,
                        'bg-gray-100 text-gray-800 font-bold':
                          item.href === router.route,
                        'text-gray-600 hover:bg-gray-50 hover:text-gray-900':
                          item.href !== router.route
                      })}
                    >
                      {/*// @ts-ignore */}
                      <item.icon
                        className={classnames({
                          'mr-3 flex-shrink-0 h-6 w-6': true,
                          'text-violet': item.href === router.route,
                          'text-gray-400 group-hover:text-gray-500':
                            item.href !== router.route
                        })}
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 bg-gray-50">
            <Toaster position="top-right" />
            <div className="py-10 h-screen">
              <div className="container mx-auto px-4 sm:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 border-b-4 border-violet inline-block">
                  {navItems.find((item) => item.href === router.route)?.name}
                </h1>
                <main className="mt-12">{props.children}</main>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
