import { useState, useEffect } from 'react';

export default function CurrentDate({ timezone = 'UTC' }) {
   const [date, setDate] = useState(
      new Date().toLocaleDateString('en-US', { timeZone: timezone }),
   );

   useEffect(() => {
      const intervalId = setInterval(() => {
         const now = new Date();
         const options = { timeZone: timezone };
         setDate(now.toLocaleDateString('en-US', options));
      }, 1000);

      return () => {
         clearInterval(intervalId);
      };
   }, [timezone]);

   return <span>{date}</span>;
}
