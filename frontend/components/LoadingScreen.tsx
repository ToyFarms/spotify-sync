import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { isServerRunning } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useLocalStorage from "use-local-storage";
import useCircularBuffer from "@/hooks/circularHook";

export default function LoadingScreen({
  onDone: callback,
}: {
  onDone: () => any;
}) {
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useLocalStorage("server-url", "http://127.0.0.1:6061");

  const STATUS_CAP = 5;
  const [statuses, addStatus] = useCircularBuffer<string>(STATUS_CAP);

  useEffect(() => {
    let isMounted = true;
    let tryCount = 0;

    addStatus(`Checking server connection: ${url}`);

    const work = async () => {
      if (!isMounted) return;

      const running = await isServerRunning(`${url}/api/ping`);
      if (running) {
        callback();
        setDialog(false);
        return;
      }

      setDialog(true);
      addStatus(`(${tryCount}) Cannot contact server, retrying...`);

      tryCount++;
      if (isMounted) {
        setTimeout(work, 1000);
      }
    };

    work();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <Dialog open={dialog}>
      <DialogContent className="max-w-[40rem]">
        <DialogHeader>Config</DialogHeader>
        <DialogTitle>Server URL</DialogTitle>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              defaultValue={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="mb-5">
          <div className="text-secondary text-sm flex flex-col gap-5">
            Make sure the URL and port are the same with the backend's server
            <br />
            Make sure the server is actually running
            <div>
              {statuses.map((s, i) => (
                <p
                  key={`${s}${i}`}
                  style={{
                    opacity: `${0.9 - i / STATUS_CAP}`,
                  }}
                  className={`text-center ${
                    i === 0
                      ? "motion-translate-y-in-50 motion-opacity-in-20"
                      : ""
                  }`}
                >
                  {s}
                </p>
              ))}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
