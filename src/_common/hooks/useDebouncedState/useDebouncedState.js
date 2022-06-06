import { useState, useEffect } from "react";

const useDebouncedState = (initialState, timeout = 500) => {
  const [immediate, setImmediate] = useState(initialState);
  const [debounced, setDebounced] = useState(initialState);

  useEffect(() => {
    const ts = setTimeout(() => setDebounced(immediate), timeout);
    return () => clearTimeout(ts);
  }, [immediate, timeout]);

  return [debounced, setImmediate, immediate];
}

export default useDebouncedState;
