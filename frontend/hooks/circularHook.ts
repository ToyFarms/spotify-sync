import { useState } from "react";

export default function useCircularBuffer<T>(
  cap: number,
  _default: T[] = [],
): [T[], (item: T) => any] {
  const [queue, setQueue] = useState<T[]>(_default);

  const enqueue = (item: T) => {
    setQueue((prevQueue: T[]) => {
      const updated = [item, ...prevQueue];
      if (prevQueue.length >= cap) {
        updated.pop();
      }
      return updated;
    });
  };

  return [queue, enqueue];
}
