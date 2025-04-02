import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  useForm,
  useWatch,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "./LoginPage";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/GeneralInput";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { LoginSchema } from "@lib/login";
import { useEffect } from "react";
import { toast } from "sonner";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import { fromError } from "zod-validation-error";

function Field<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  desc,
}: {
  control?: Control<TFieldValues, TName>;
  name: Path<TFieldValues>;
  label: React.ReactNode;
  desc: React.ReactNode;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PasswordInput {...field} />
          </FormControl>
          <FormDescription>{desc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default function LoginPage() {
  const STORAGE_KEY = "LOGIN_DATA";
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { ...savedData },
  });

  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
  }, [formValues]);

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    const res = await fetch("http://127.0.0.1:6061/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status === 200) {
      toast.success("Login Successfull!");
    } else {
      toast.error(`Failed to Login ${res.status}`, {
        description: (await res.json())?.error,
      });
    }
  }

  return (
    <fieldset
      className="flex items-center justify-center self-center w-full"
      disabled={form.formState.isSubmitting}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 flex-grow max-w-[40rem] mx-[1rem]"
        >
          <Field
            control={form.control}
            name="spClientID"
            label="Spotify Client ID"
            desc={
              <>
                Get from{" "}
                <Link
                  to="https://developer.spotify.com/dashboard"
                  target="_blank"
                  className="underline"
                >
                  Spotify Dashboard
                </Link>
              </>
            }
          />
          <Field
            control={form.control}
            name="spClientSecret"
            label="Spotify Client Secret"
            desc={
              <>
                Get from{" "}
                <Link
                  to="https://developer.spotify.com/dashboard"
                  target="_blank"
                  className="underline"
                >
                  Spotify Dashboard
                </Link>
              </>
            }
          />
          <Field
            control={form.control}
            name="acoustKey"
            label="AcoustID Api Key"
            desc={
              <>
                Get from{" "}
                <Link
                  to="https://acoustid.org/my-applications"
                  target="_blank"
                  className="underline"
                >
                  AcoustID's Website
                </Link>
              </>
            }
          />
          <Separator />
          <div className="flex flex-row gap-2 items-center">
            <TooltipProvider>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    Login
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Login each service</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    disabled={form.formState.isSubmitting}
                  >
                    Update
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Update the backend credential without calling the login
                  service
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {!form.formState.isValid && (
              <AlertTriangle className="text-amber-500" size={20} />
            )}
            {form.formState.isSubmitting && (
              <LoaderCircle className="animate-spin" />
            )}
          </div>
        </form>
      </Form>
    </fieldset>
  );
}
