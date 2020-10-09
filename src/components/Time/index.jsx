import React from 'react';
import {
  differenceInHours,
  differenceInCalendarDays,
  formatDistanceToNow,
  format
} from 'date-fns';

const Time = ({ date }) => {
  const getMessageTime = (time) => {
    const now = new Date();
    const hoursFromNow = differenceInHours(now, time);
    const daysFromNow = differenceInCalendarDays(now, time);

    if (hoursFromNow === 0) {
      return formatDistanceToNow(time, { addSuffix: true });
    } else if (hoursFromNow <= 23 && !daysFromNow) {
      return format(time, 'H:mm');
    } else {
      return format(time, 'dd/MM/yy');
    }
  };

  return <time className='date'>{getMessageTime(new Date(date))}</time>;
};

export default Time;
