import React, { useMemo, useState } from 'react';

export enum LoadingType {
  Button, Span,Image
}
export default function LoadingButton({image="", type = LoadingType.Button, initialText = 'Click Me', loadingText = 'loading...', onClick = (_: any) => { }, style = {} }) {
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
    } else if(type==LoadingType.Image){
      return <>{isLoading?<span>{loadingText}</span>:<img onClick={handleClick} style={{cursor:"pointer"}} src={image}/>}</>
    }
  }

  return node();
}
