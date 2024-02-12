import React from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import SvgComponent from "@/assets/images/svgComponent";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  //show-hide password
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const passwordSchema = z.object({
    password: z.string().min(8).max(16),
  });
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const formValues = async (data: z.infer<typeof passwordSchema>) => {
    try {
      console.log(data);
      const token = window.location.pathname.split("/").pop(); // Extract token from the URL

      const res = await axios.post(
        `http://localhost:3000/resetpassword/${token}`,
        data,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast({
          variant: "success",
          description: "Password reset successful",
        });
        navigate("/login");
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
            <h1 className="text-2xl font-bold">Reset password</h1>
            <span className="text-xs font-normal text-gray-500">
              Create a new password for your account
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
              <Button type="submit" className="w-full py-1 ">
                Reset Password
              </Button>
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
