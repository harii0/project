import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import SvgComponent from "@/assets/images/svgComponent";
// import { FaGithub } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
const Login = () => {
  const forgetSchema = z.object({
    email: z.string().email(),
  });
  //show-hide password
  const form = useForm<z.infer<typeof forgetSchema>>({
    resolver: zodResolver(forgetSchema),
    defaultValues: {
      email: "",
    },
  });
  const formValues = async (data: z.infer<typeof forgetSchema>) => {
    try {
      console.log(data);
      const res = await axios.post(
        "http://localhost:3000/forgetpassword",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast({
          variant: "success",
          description: "Link send to your email",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex w-full h-screen">
      <div className=" w-full md:w-1/2 shadow-xl flex h-screen flex-col gap-8 px-5">
        <div className="px-5 py-10 flex gap-2 justify-between">
          <div className="flex gap-4 flex-col">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <span className="text-xs font-normal text-gray-500">
              Enter your email to reset password
            </span>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
        <div className="form">
          <Form {...form}>
            <form
              action=""
              method="post"
              className="px-5 flex flex-col gap-4"
              onSubmit={form.handleSubmit(formValues)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="example@mail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full py-1 font-normal">
                Send Link
              </Button>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  <span className=" text-lg">*</span>
                  <p>
                    Please use the link sent to your email to reset your
                    password.
                  </p>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className=" hidden md:flex w-full justify-center items-center">
        <div className=" w-[500px]">
          <SvgComponent />
        </div>
      </div>
    </div>
  );
};

export default Login;
