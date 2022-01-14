import format from 'date-fns/format';
import Image from 'next/image';

const CalendarEvent = ({ event }) => {
  if (!event.provider) {
    return null;
  }
  return (
    <div className="px-4 py-2 text-sm rounded-lg overflow-scroll">
      <div className="flex">
        <Image
          src={`/${event.provider.name}.png`}
          width="20"
          height="20"
          objectFit="contain"
          alt="social icon"
        />
        <p className="text-gray-600 text-xs my-auto ml-2">
          {format(new Date(event.start), 'HH:mm')}
        </p>
      </div>
    </div>
  );
};

export default CalendarEvent;
