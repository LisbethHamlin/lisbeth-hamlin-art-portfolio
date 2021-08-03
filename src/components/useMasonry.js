import { useEffect, useState } from "react";
import Masonry from 'masonry-layout';

export const useMasonry = (selector, options) => {
  const [state] = useState(() => ({
    selector,
    options
  }));

  useEffect(() => {
    const msnry = new Masonry(state.selector, state.options);

    return () => {
      msnry.destroy();
    }

  }, [state]);
}