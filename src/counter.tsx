import { useSignal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";

type Props = {
  state: [string, any];
};
type Timeout = ReturnType<typeof setTimeout> | null;

export default function Counter({ state }: Props) {
  const [playing, setPlaying] = state;

  const [time, setTime] = useState(5);
  const timer = useSignal<Timeout>(null);

  useEffect(() => {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }

    if (playing === "playing")
      timer.value = setTimeout(() => {
        if (time > 0) {
          setTime(time - 1);
          return;
        }
        setPlaying("finished");
        setTime(60);
      }, 1000);
  }, [playing, timer, time]);

  return playing ? <span>{time}s</span> : <span>_</span>;
}
