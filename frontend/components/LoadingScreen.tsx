import { useEffect, useState } from "react";
import { cn, isServerRunning } from "@/lib/utils";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import useLocalStorage from "use-local-storage";
import useCircularBuffer from "@/hooks/circularHook";

function DialogContentNoClose({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export default function LoadingScreen() {
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
      <DialogContentNoClose className="max-w-[40rem] outline-none">
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
                  key={`${i}${s}${statuses}`}
                  style={{
                    opacity: `${0.9 - i / STATUS_CAP}`,
                  }}
                  className={`text-center transition-opacity transition-duration-1000 ${
                    i === 0
                      ? "-motion-translate-y-in-100 motion-opacity-in-20 motion-scale-in-80"
                      : "-motion-translate-y-in-100"
                  }`}
                >
                  {s}
                </p>
              ))}
            </div>
          </div>
        </DialogFooter>
      </DialogContentNoClose>
    </Dialog>
  );
}
