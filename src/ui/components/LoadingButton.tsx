import React, { useState } from 'react';

function LoadingButton({ initialText = 'Click Me', loadingText = 'loading...', onClick=(_:any)=>{},style={}}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e:any) => {
    setIsLoading(true);
    if (onClick) {
      try {
        await onClick(e);
      } catch (error) {
        console.error("Error in onClick handler:", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={isLoading} style={style}>
      {isLoading ? loadingText : initialText}
    </button>
  );
}

export default LoadingButton;
