
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export const DateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = format(dateTime, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(dateTime, 'h:mm:ss a');

  return (
    <div className="text-sm text-center text-muted-foreground flex flex-col sm:flex-row sm:gap-2 items-center justify-center">
      <div>{formattedDate}</div>
      <div className="hidden sm:block">•</div>
      <div>{formattedTime}</div>
    </div>
  );
};

export default DateTime;
