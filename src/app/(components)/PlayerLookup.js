import { useCallback } from "react";
import debounce from 'lodash/debounce';

export default function PlayerLookup() {
  const debouncedFetch = useCallback(
    debounce(keyword => {
      if (keyword.length) {
        fetch(`/api/player-lookup/${keyword}`)
          .then(response => response.json())
          .then(data => console.log(data));
      };
    }, 500), []);

  return <input type="text" onChange={e => debouncedFetch(e.target.value)} />;
}
