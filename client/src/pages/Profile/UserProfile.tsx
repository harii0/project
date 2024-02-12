import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import profileSchema from "@/helper/profileSchema";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import Badge from "@/assets/images/Badge1.png";
import badge2 from "@/assets/images/Badge2.png";
import { useState } from "react";
const UserProfile = () => {
  const achievements = [
    {
      img: badge2,
      title: "Login streak",
    },
    {
      img: Badge,
      title: "Learner",
    },
  ];
  // User state

  const user = useSelector((state: RootState) => state.auth.user);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  // At the top of your component
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const profileUpdate = async (data: z.infer<typeof profileSchema>) => {
    const formData = new FormData();
    // Append all text fields from the form
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append the file if selected
    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }
    try {
      const res = await axios.post("http://localhost:3000/user-profile", data, {
        headers: {
          
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        toast({
          title: "Profile Updated",
        });
      } else {
        toast({
          title: "error",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="px-3 h-screen flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold">Personal Information</h1>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>

          <hr />
        </div>
        <Form {...form}>
          <Card className="flex gap-5 flex-wrap md:flex-nowrap flex-col p-4">
            <div className="flex gap-5 items-center">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user?.profileImage}/>
                <AvatarFallback>{user?.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <h1 className="text-md font-medium">{user?.username}</h1>
                <span className="text-xs text-muted-foreground ">
                  {user?.email}
                </span>
                <span className="text-xs">
                  {user?.age}
                  <span className="text-muted-foreground">years old</span>
                </span>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <div className="flex flex-col gap-2">
                <span>Bio</span>
                <span className="text-xs text-muted-foreground w-1/2">
                  {user?.bio}
                </span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-28 mt-3 h-10">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] ">
                <form
                  action=""
                  className="flex flex-col gap-2 flex-wrap"
                  onSubmit={form.handleSubmit(profileUpdate)}
                >
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-2 py-1">
                    <div className="grid  items-center gap-4">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="username" className="text-right">
                              Username
                            </Label>
                            <Input
                              id="username"
                              className="col-span-4"
                              {...field}
                            />
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid  items-center gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email"
                              className="col-span-4"
                              {...field}
                            />
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid items-center gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="age" className="text-right">
                              Age
                            </Label>
                            <Input
                              id="age"
                              className="col-span-4"
                              type="number"
                              {...field}
                            />
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid items-center gap-4">
                      <Label htmlFor="picture">Picture</Label>
                      <Input
                        id="picture"
                        type="file"
                        onChange={(e) =>
                          setSelectedFile(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                    </div>
                    <div className="grid  items-center gap-4">
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="bio">Bio</Label>
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
                  </div>
                  <Button type="submit">Save changes</Button>
                </form>
              </DialogContent>
            </Dialog>
          </Card>
        </Form>
        <Card>
          <Card className="flex gap-5 p-4 flex-col items-start">
            <div className="flex justify-between w-full">
              <div className="text">
                <h2 className="font-semibold">Achievements</h2>
                <p className="text-xs text-muted-foreground">
                  Here are your achievements
                </p>
              </div>
              <div>
                <Button className="px-4 py-2 text-sm font-normal">
                  show all
                </Button>
              </div>
            </div>
            {achievements.map((achievement, index) => (
              <div className="flex gap-3 items-center" key={index}>
                <img src={achievement.img} className="w-10 h-10" alt="badge" />
                <p className="text-sm">{achievement.title}</p>
              </div>
            ))}
          </Card>
        </Card>
      </div>
    </>
  );
};

export default UserProfile;
