import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// Import your form fields components or replace them with your actual form components
import mentor from "@/assets/images/mentor.svg";
import RegistrationSchema from "@/helper/doctorSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] =
    useState(false);
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      address: "",
      profilePicture: "",
      file: undefined as File | undefined,
      availabilityFrom: "",
      availabilityTo: "",
      experience: "",
      city: "",
      website: "",
      bio: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegistrationSchema>) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:3000/apply-mentor", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        toast({
          title: "Mentor Application Submitted",
          description:
            "We will review your application and get back to you soon",
          duration: 5000,
        });
        setFormSubmittedSuccessfully(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBecomeAMentorClick = () => {
    setShowForm(true);
    setFormSubmittedSuccessfully(false);
  };
  if (formSubmittedSuccessfully) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-6  overflow-hidden">
        <CheckCircle2 size={100} color="green" />
        <h1 className="text-4xl font-semibold">Mentor Application Submitted</h1>
        <p className="text-center md:w-1/2 text-muted-foreground text-sm px-4 ">
          We will review your application and get back to you soon
        </p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="w-full  flex flex-col justify-center items-center gap-6  overflow-y-scroll">
        <img src={mentor} alt="mentor" className="max-w-xs" />
        <h1 className="text-4xl font-semibold">Become a Mentor</h1>
        <p className="text-center md:w-1/2 text-muted-foreground text-sm px-4 ">
          Join our platform to share your knowledge and experience with those
          eager to learn. Click below to get started!
        </p>
        <Button onClick={handleBecomeAMentorClick}>Become a Mentor</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold px-4 py-3">Become a Mentor</h1>
      <Form {...form}>
        <form
          action=""
          onSubmit={form.control.handleSubmit(onSubmit)}
          className="flex gap-4 px-4 md:flex-row flex-col "
        >
          <div className="md:w-1/3 flex  flex-col gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phoneNumber">phone</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <FormControl>
                    <Input placeholder="city" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="qualifications">Experience</FormLabel>
                  <FormControl>
                    <Input placeholder="3 year" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="md:w-1/3 flex  flex-col gap-4">
            <FormField
              control={form.control}
              name="availabilityFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="availabilityFrom">
                    Available From
                  </FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availabilityTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="availabilityTo">Available To</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="file">Profile Picture</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Address</FormLabel>
                  <FormControl>
                    <Input placeholder="street xyz" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="md:w-1/3 flex  flex-col gap-4">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="website">Website</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="age">License</FormLabel>
                  <FormControl>
                    <Input type="file" accept=".pdf" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </form>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="my-3 md:w-1/3 md:self-start md:mx-4"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Index;
