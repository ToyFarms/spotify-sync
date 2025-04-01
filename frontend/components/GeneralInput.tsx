import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GeneralInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {}

export function PasswordInput({
  storageKey,
  ...props
}: GeneralInputProps & { storageKey?: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      {storageKey ? (
        <CachedInput
          {...props}
          storageKey={storageKey}
          type={visible ? "text" : "password"}
        />
      ) : (
        <Input {...props} type={visible ? "text" : "password"} />
      )}
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
      >
        {visible ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
      </button>
    </div>
  );
}

export function CachedInput({
  storageKey,
  ...props
}: GeneralInputProps & { storageKey: string }) {
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem(storageKey) || "";
  });

  useEffect(() => {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue !== null) {
      setValue(storedValue);
    }
  }, [storageKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    localStorage.setItem(storageKey, newValue);
  };

  return <Input {...props} value={value} onChange={handleChange} />;
}
