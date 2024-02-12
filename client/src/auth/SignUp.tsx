import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GrTechnology } from "react-icons/gr";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import signUpSchema from "@/helper/signUpSchema";
import { FaGoogle } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
      dob: undefined,
    },
  });

  const formValues = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const res = await axios.post("http://localhost:3000/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        toast({
          variant: "success",
          description: "Account created successfully",
        });
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast({
          variant: "destructive",
          description: "Account already exists",
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 409) {
          // Assuming 409 is used for "Account already exists"
          toast({
            variant: "destructive",
            description: "Email already exists",
          });
        } else {
          toast({
            variant: "destructive",
            description: "An error occurred. Please try again.",
          });
        }
      } else {
        // Handle non-Axios errors
        toast({
          variant: "destructive",
          description: "An unexpected error occurred",
        });
      }
    }
  };
  return (
    <div className="flex ">
      <div className=" w-1/2 bg-zinc-800 h-screen hidden md:block ">
        <div className=" flex flex-col text-white px-5 py-5 justify-between h-screen ">
          <div className="flex gap-1">
            <GrTechnology size={30} />
            <span className="text-lg font-bold">Solace</span>
          </div>
          <div className="text-white  w-1/2">
            " Lorem ipsum dolor one harum temporibus repellat illum
            dignissimos."
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 overflow-y-scroll ">
        <div className="flex w-full">
          <div className=" border-none w-full h-screen px-5  flex flex-col justify-center gap-6">
            <div className="flex gap-1 flex-col px-4 ">
              <div className="text-2xl font-bold flex justify-between items-center">
                Create account
                <div>
                  <ModeToggle />
                </div>
              </div>
              <div className=" text-gray-500 text-xs">
                Enter your details to create your account
              </div>
            </div>
            <Form {...form}>
              <form
                action=""
                method="post"
                className="px-5 flex flex-col gap-5 w-full"
                onSubmit={form.handleSubmit(formValues)}
              >
                <div className="flex w-full gap-3 items-end">
                  <div className=" w-full">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="johndoe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full  items-center  gap-3">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of birth</FormLabel>
                          <DatePicker
                            selected={
                              field.value ? new Date(field.value) : null
                            }
                            onChange={(date: Date) => field.onChange(date)}
                            dateFormat="MMMM d, yyyy"
                            maxDate={new Date()}
                            showYearDropdown
                            dropdownMode="select"
                            className="input px-4 py-1 text-sm " 
                            placeholderText="Select date"
                          />
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-3">
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
                </div>

                <div className="flex gap-2">
                  <div className="grid w-full  items-center gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type={show ? "text" : "password"}
                              placeholder="create password"
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
                  </div>
                  <div className=" w-full  items-center gap-3">
                    <FormField
                      control={form.control}
                      name="confirm"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type={show1 ? "text" : "password"}
                              placeholder="confirm your password"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute top-0 right-2 cursor-pointer">
                            {show1 ? (
                              <Eye
                                size={15}
                                className=" text-gray-500"
                                onClick={() => setShow1(!show1)}
                              />
                            ) : (
                              <EyeOff
                                size={15}
                                className=" text-gray-500"
                                onClick={() => setShow1(!show1)}
                              />
                            )}
                          </div>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col gap-1">
                  <Button className="w-full">Sign Up</Button>
                  <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink px-3 text-gray-400 text-sm">
                      or
                    </span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  <Button
                    variant={"outline"}
                    className="w-full text-sm text-gray-500"
                  >
                    <FaGoogle className="mr-1" /> Login with Google
                  </Button>
                </div>
              </form>
            </Form>
            <div className="w-full flex justify-center items-center mb-4 gap-1 ">
              <p className="text-xs  items-center">Already have an account?</p>
              <Link
                to="/login"
                className="underline cursor-pointer font-medium text-xs"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
