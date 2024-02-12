import React from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
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
import loginSchema from "@/helper/loginSchema";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  //show-hide password
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formValues = async (data: z.infer<typeof loginSchema>) => {
    try {
      console.log(data);
      const res = await axios.post("http://localhost:3000/login", data, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.status === 200) {
        toast({
          variant: "success",
          description: "Login successful",
        });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Invalid credentials",
      });
    }
  };
  return (
    <div className="flex w-full h-screen">
      <div className=" w-full md:w-1/2 shadow-md flex h-screen flex-col gap-8 px-5">
        <div className="px-5 py-10 flex gap-2 justify-between">
          <div className="flex gap-4 flex-col">
            <h1 className="text-2xl font-bold">Login</h1>
            <span className="text-xs font-normal text-gray-500">
              Login to your account
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className=" relative">
                    <FormLabel>password</FormLabel>
                    <FormControl className="relative">
                      <Input
                        type={show ? "text" : "password"}
                        placeholder="P@ssw0rd1"
                        {...field}
                      />
                    </FormControl>
                    <div className="absolute top-0 right-2 cursor-pointer">
                      {show ? (
                        <Eye
                          size={15}
                          className=" text-gray-500"
                          onClick={() => setShow(!show)}
                        />
                      ) : (
                        <EyeOff
                          size={15}
                          className=" text-gray-500"
                          onClick={() => setShow(!show)}
                        />
                      )}
                    </div>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="flex w-full py-1 justify-end">
                <p className="text-xs">
                  <Link to={"/forgetpassword"}>Forget Password</Link>?
                </p>
              </div>
              <Button type="submit" className="w-full py-1 ">
                Login
              </Button>

              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink px-3 text-gray-400 text-sm">
                  or
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="w-full px-1">
                <Button variant={"outline"} className="w-full text-xs  ">
                  <FaGoogle className="mr-3" /> Login with Google
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
      <div className=" hidden md:flex w-full justify-center items-center">
        <div className=" w-[500px]">
          <SvgComponent />
        </div>
      </div>
    </div>
  );
};

export default Login;
