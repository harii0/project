import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import "./landing.css";
import mobileImage from "@/assets/images/responsive-design.png";

const LandingPage = () => {
  return (
    <div className="w-full h-full landing">
      {/* Navigation */}
      <nav className=" landing  z-10 fixed flex w-full  border-r-0  border-black border py-3 justify-between items-center px-5">
        <div className="logo m-0">
          <h1 className="text-black font-bold text-lg">Solace</h1>
        </div>
        <ul className="gap-6 text-sm hidden md:flex">
          <li className="text-black hover:underline cursor-pointer">Home</li>
          <li className="text-black hover:underline cursor-pointer">
            Features
          </li>
          <li className="text-black hover:underline cursor-pointer">Pricing</li>
          <li className="text-black hover:underline cursor-pointer">About</li>
          <li className="text-black hover:underline cursor-pointer">Contact</li>
        </ul>
        <div className="btns flex items-center">
          <Button className="bg-transparent border-soild border border-black text-black hover:text-white rounded-full text-xs w-24 h-8">
            <Link to={"/signup"}>Try now</Link>
          </Button>
        </div>
      </nav>

      {/* Home Section */}
      <section className="home">
        <div className="home__content flex flex-col justify-center items-center h-screen gap-4">
          <h1 className="text-7xl font-bold text-black leading-16">
            Explore Solace
          </h1>
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
      <section className="features">
        <div className="flex flex-col justify-center items-center h-screen gap-2">
          <h1 className="text-5xl font-bold text-black leading-16 mb-10">
            Features & Benefits
          </h1>

          {/* Feature Cards */}
          <div className="cards flex w-full px-5 py-4 gap-2 justify-center flex-wrap ">
            {[1, 2, 3, 4, 5, 6].map((cardNumber) => (
              <div
                key={cardNumber}
                className="card bg-white/40 backdrop-blur-sm w-1/4 rounded-md flex hover:bg-white hover:bg-opacity-95 transition-all"
              >
                <div className="card__content flex flex-col justify-center items-center py-3">
                  <div className="image h-[80px] w-[80px] px-2 py-5">
                    <img src={mobileImage} alt="" />
                  </div>
                  <h1 className="text-lg font-medium text-black">
                    Mobile Responsive
                  </h1>
                  <p className="text-zinc-500 text-center text-xs px-4 py-4">
                    Solace is a social media platform that allows you to connect
                    with friends and family.
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
      {/* Footer Section */}
    </div>
  );
};

export default LandingPage;
