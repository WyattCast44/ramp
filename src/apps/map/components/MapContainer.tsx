import React, { forwardRef } from 'react';

const c = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function (props, ref) {
   /**
    * Clip path style is needed to keep the blur effect inside the container
    */
   const style = {
      clipPath: 'inset(0px 0px 0px 0px)',
   };

   return (
      <div
         ref={ref}
         style={style}
         className="flex-1 h-full flex-grow py-0.5 sm:py-0"
         {...props}
      ></div>
   );
});

export default React.memo(c);