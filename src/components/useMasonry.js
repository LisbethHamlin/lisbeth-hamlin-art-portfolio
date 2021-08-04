import { useEffect, useState } from "react";
import Masonry from 'masonry-layout';

export const useMasonry = (selector, options) => {
  const [state] = useState(() => ({
    selector,
    options
  }));
  const [msnry, setMsnry] = useState();

  useEffect(() => {
    const instance = new Masonry(state.selector, state.options);

    setMsnry(instance);

    return () => {
      instance.destroy();
    }

  }, [state]);

  return msnry;
}