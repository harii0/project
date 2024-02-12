import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import mobileImage from "@/assets/images/responsive-design.png";
import chatImg from "@/assets/images/live-chat.png";
import Doctor from "@/assets/images/doctor.png";
import Emotion from "@/assets/images/emotional.png";
import Analytic from "@/assets/images/analytics.png";
import { ModeToggle } from "@/components/mode-toggle";
import "./animate.css";
const LandingPage = () => {
  const cards = [
    {
      title: "Mobile Responsive",
      description:
        "Solace is a social media platform that allows you to connect with friends and family.",
      image: mobileImage,
    },
    {
      title: "Live Chat",
      description:
        "Solace is a social media platform that allows you to connect with friends and family.",
      image: chatImg,
    },
    {
      title: "Doctor Consultation",
      description:
        "Solace is a social media platform that allows you to connect with friends and family.",
      image: Doctor,
    },
    {
      title: "User Analytics",
      description:
        "Solace is a social media platform that allows you to connect with friends and family.",
      image: Analytic,
    },
    {
      title: "Emotional Support",
      description:
        "Solace is a social media platform that allows you to connect with friends and family.",
      image: Emotion,
    },
  ];
  return (
    <div className="w-full h-full ">
      {/* Navigation */}
      <nav className="  backdrop-blur-sm  z-10 fixed flex w-full  border-r-0  border-black border py-3 justify-between items-center px-5">
        <div className="logo m-0">
          <h1 className=" font-bold text-lg">Solace</h1>
        </div>
        <ul className="gap-6 text-sm hidden md:flex">
          <li className=" hover:underline cursor-pointer">
            <a href="#home">Home</a>
          </li>
          <li className=" hover:underline cursor-pointer">
            <a href="#features">Features</a>
          </li>
          <li className=" hover:underline cursor-pointer">
            <a href="#about">About</a>
          </li>
          <li className=" hover:underline cursor-pointer">
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="btns flex items-center gap-5">
          <ModeToggle />
          <Button className=" border-soild border border-black  rounded-full text-xs w-24 h-8">
            <Link to={"/signup"}>Try now</Link>
          </Button>
        </div>
      </nav>

      {/* Home Section */}
      <section className="home " id="home">
        <div className="home__content flex flex-col justify-center items-center h-screen gap-8">
          <h1 className="text-7xl font-bold leading-16">Explore Solace</h1>
          <p className="text-zinc-500 text-center text-sm md:w-1/3">
            Solace is a social media platform that allows you to connect with
            friends and family. Share your thoughts, photos, and videos with
            everyone.
          </p>
          <div className="btns flex items-center justify-around gap-3 mt-5">
            <Button className="rounded-full text-xs px-20 h-10">
              <Link to={""}>Explore</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="flex flex-col justify-center items-center h-screen gap-2">
          <h1 className="text-5xl font-bold  leading-16 mb-10">
            Features & Benefits
          </h1>

          {/* Feature Cards */}
          <div className="cards flex w-full px-5 py-4 gap-2 justify-center flex-wrap ">
            {cards.map((cardNumber) => (
              <div
                key={cardNumber.title}
                className="card border border-black  backdrop-blur-sm bg-white/10 flex-col w-1/2 md:flex-row md:w-1/4 rounded-md flex  hover:bg-white hover:bg-opacity-95 transition-all
                 hover:shadow-xl"
              >
                <div className=" flex flex-col justify-center items-center py-3 gap-">
                  <div className="image h-[80px] w-[80px] px-2 py-5">
                    <img src={cardNumber.image} alt="" />
                  </div>

                  <h1 className="text-lg font-medium text-black pt-3">
                    {cardNumber.title}
                  </h1>

                  <p className="text-zinc-500 text-center text-xs px-4 py-4">
                    {cardNumber.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section className="pricing mt-5">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-5xl font-bold text-black leading-16 mb-10">
            Pricing
          </h1>          
        </div>
      </section> */}
      {/* About Section */}
      <section
        className="about w-full h-screen flex justify-center py-4"
        id="about"
      >
        <h1 className="text-5xl font-bold  leading-16 mb-10">About Solace</h1>
         <p></p>
      </section>
    </div>
  );
};

export default LandingPage;
