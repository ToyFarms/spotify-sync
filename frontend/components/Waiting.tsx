import { useEffect, useState } from "react";

export function WaitingText({
  text,
  interval = 500,
}: {
  text: string;
  interval?: number;
}) {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const int = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4);
    }, interval);

    return () => clearInterval(int);
  }, [interval]);

  return <>{text + ".".repeat(dotCount)}</>;
}

// TODO: how to animate with interval
export function WaitingHeartBeat({ interval = 500 }: { interval?: number }) {
  return <p className="animate-ping">&#x25A0;</p>;
}
