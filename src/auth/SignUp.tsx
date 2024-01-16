import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GrTechnology } from "react-icons/gr";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import loginSchema from "@/helper/loginSchema";
import { FaGoogle } from "react-icons/fa";
const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  });
  const formValues = (values: z.infer<typeof loginSchema>) => {
    event?.preventDefault();
    console.log(values);
  };
  const [date, setDate] = React.useState<Date>();
  return (
    <div className="flex ">
      <div className=" w-1/2 bg-zinc-800 h-screen hidden md:block">
        <div className=" flex flex-col text-white px-5 py-6 justify-between h-screen ">
          <div className="flex gap-2">
            <GrTechnology size={30} />
            <span className="text-xl font-bold">Solace</span>
          </div>
          <div className="text-white  w-1/2">
            " Lorem ipsum dolor one harum temporibus repellat illum
            dignissimos."
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 ">
        <div className="flex w-full h-screen ">
          <Card
            {...form}
            className=" border-none w-full h-screen px-5 py-5 flex flex-col"
          >
            <CardHeader className="flex gap-2">
              <CardTitle className="text-2xl font-bold ">
                Create account
              </CardTitle>
              <CardDescription className=" text-gray-500">
                Enter your email & password below to SignUp
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                action=""
                method="post"
                className="px-5 flex flex-col gap-4"
                onSubmit={form.handleSubmit(formValues)}
              >
                <div className="flex w-full gap-3">
                  <div className=" w-full">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Username</FormLabel>
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
                  <div className="grid w-full  items-center  gap-3">
                    <Label htmlFor="password">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid w-full items-center gap-3">
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
                </div>

                <div className="flex gap-2">
                  <div className="grid w-full  items-center gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel className="text-black">Password</FormLabel>
                          <FormControl>
                            <Input
                              type={show ? "text" : "password"}
                              placeholder="create password"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute top-0 right-2">
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
                          <FormLabel className="text-black">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type={show1 ? "text" : "password"}
                              placeholder="create password"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute top-0 right-2">
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

                <div className="flex w-full flex-col gap-2">
                  <Button className="w-full">Sign Up</Button>
                  <div className="relative flex py-5 items-center">
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
            <div className="w-full flex justify-center items-center mt-5 gap-1">
              <p className="text-xs  items-center">Already have an account?</p>
              <Link
                to="/login"
                className="underline cursor-pointer font-medium text-xs"
              >
                Login
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
