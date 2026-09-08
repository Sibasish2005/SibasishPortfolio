'use client';

import React, { useState, useEffect, memo } from 'react';

interface AgartalaClockProps {
  className?: string;
  showLocation?: boolean;
}

function AgartalaClockComponent({
  className = '',
  showLocation = true,
}: AgartalaClockProps) {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('en-IN', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {timeStr || '15:30:00'}{showLocation ? ' AGARTALA, INDIA' : ''}
    </span>
  );
}

export const AgartalaClock = memo(AgartalaClockComponent);
export default AgartalaClock;
