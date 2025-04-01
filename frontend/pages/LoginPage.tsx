import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  useForm,
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

const formSchema = z.object({
  spClientID: z.string(),
  spClientSecret: z.string(),
  acoustKey: z.string().optional(),
});

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
            <PasswordInput {...field} storageKey={name} />
          </FormControl>
          <FormDescription>{desc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center self-center w-full">
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
                <Link to="https://acoustid.org/my-applications" target="_blank">
                  AcoustID's Website
                </Link>
              </>
            }
          />
          <Separator />
          <div className="flex flex-row gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Button className="cursor-pointer" type="submit">
                    Login
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Login each service</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="cursor-pointer">
                    Update
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Update the backend credential without calling the login
                    service
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </form>
      </Form>
    </div>
  );
}
