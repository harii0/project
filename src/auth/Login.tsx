import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { FaGithub } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import loginSchema from "@/helper/loginSchema";
// import "./Login.css";
const Login = () => {
  const formValues = (values: z.infer<typeof loginSchema>) => {
    event?.preventDefault();
    console.log(values);
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="flex w-full h-screen">
      <div className=" w-full md:w-1/3 bg-white shadow-md flex h-screen flex-col gap-8 px-5">
        <div className="px-5 py-10 flex flex-col gap-2">
          <span className=" text-2xl font-bold">Login</span>
          <p className="text-sm text-gray-500">Welcome back </p>
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
                    <FormLabel className="text-black">Email</FormLabel>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                submit
              </Button>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink px-3 text-gray-400 text-sm">
                  or
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="w-full px-1">
                <Button
                  variant={"outline"}
                  className="w-full text-sm text-gray-500"
                >
                  <FaGoogle className="mr-1" /> Login with Google
                </Button>
              </div>
            </form>
            <div className="w-full flex justify-center items-center mt-5 gap-1">
              <p className="text-xs  items-center">Dont have an account?</p>
              <Link
                to="/signup"
                className="underline cursor-pointer font-medium text-xs"
              >
                create account
              </Link>
            </div>
          </Form>
        </div>
      </div>
      <div className=" bg-black hidden md:block"></div>
    </div>
  );
};

export default Login;
