import { useState, useEffect, useCallback } from 'react';

export default function CurrentTimestamp({ timezone = 'UTC' }) {
   const [timestamp, setTimestamp] = useState('');

   const updateTimestamp = useCallback(() => {
      setTimestamp(new Date().toLocaleTimeString('en-US', { timeZone: timezone }));
   }, [timezone]);

   useEffect(() => {
      // Update immediately when timezone changes
      updateTimestamp();
      
      const intervalId = setInterval(updateTimestamp, 1000);

      return () => {
         clearInterval(intervalId);
      };
   }, [timezone, updateTimestamp]);

   return <time className='whitespace-nowrap'>{timestamp}</time>;
}
