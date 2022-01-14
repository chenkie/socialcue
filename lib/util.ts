import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import { dateFnsLocalizer } from 'react-big-calendar';

export const getPublishAtTime = (date: Date, time: string) => {
  const hour = parseInt(time.slice(0, 2));
  const minute = parseInt(time.slice(3, 5));
  const publishAt = new Date(new Date(date).setHours(hour, minute));
  return publishAt;
};

export const getTime = (publishAt: string) => {
  const date = new Date(publishAt);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'en-US': enUS
  }
});
