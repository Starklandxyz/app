import React, { useMemo, useState } from 'react';

export enum LoadingType {
  Button, Span
}
export default function LoadingButton({ type = LoadingType.Button, initialText = 'Click Me', loadingText = 'loading...', onClick = (_: any) => { }, style = {} }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: any) => {
    if (isLoading) { return }
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

  const node = () => {
    if (type == LoadingType.Button) {
      return <button onClick={handleClick} disabled={isLoading} style={style}>
        {isLoading ? loadingText : initialText}
      </button>
    } else if (type == LoadingType.Span) {
      return <span onClick={handleClick} style={style}>
        {isLoading ? loadingText : initialText}
      </span>
    }
  }

  return node();
}
