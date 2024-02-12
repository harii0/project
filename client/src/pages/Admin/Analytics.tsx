// Import necessary components and libraries
import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { BookOpenText, Brain, Trophy } from "lucide-react";

// Define the functional component
const Index = () => {
  // Define the theme
  const [fillColor, setFillColor] = React.useState("#000");
  useEffect(() => {
    const isDarkmode =
      localStorage.getItem("vite-ui-theme") === "dark" ||
      localStorage.getItem("vite-ui-theme") === "system";
    const fillColor = isDarkmode ? "#fff" : "#000";
    setFillColor(fillColor);
  }, []);

  // Define the data for the chart
  const name = [
    { name: "Page A", uv: 10 },
    { name: "Page B", uv: 50 },
    { name: "Page C", uv: 30 },
    { name: "Page D", uv: 40 },
    { name: "Page E", uv: 20 },
    { name: "Page F", uv: 55 },
    { name: "Page G", uv: 60 },
  ];
  // Define the state for the date

  // Return the component
  return (
    <div className="w-full">
      <div className="flex p-4 flex-wrap lg:flex-nowrap justify-center md:justify-normal gap-4 md:gap-0">
        {/* Main Column for Cards */}
        <div className="flex flex-col md:w-3/4 md:mr-4 w-full">
          <div className="flex gap-4 flex-wrap">
            {/* Card Component 1 */}
            <Card className="flex-1 h-[120px] ">
              <CardHeader>
                <div className="flex justify-between gap-10">
                  <h6 className="text-xs">Articles</h6>
                  <div className="icon">
                    <BookOpenText size={20} className="text-gray-600" />
                  </div>
                </div>
                <CardTitle>{12}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
            </Card>

            {/* Card Component 2 */}
            <Card className="flex-1 h-[120px]">
              <CardHeader>
                <div className="flex justify-between gap-10">
                  <h6 className="text-xs">Achievements</h6>
                  <div className="icon">
                    <Trophy size={20} className="text-gray-600" />
                  </div>
                </div>
                <CardTitle>{2}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
            </Card>

            {/* Add more cards as needed */}
            <Card className="flex-1 h-[120px] ">
              <CardHeader>
                <div className="flex justify-between gap-10">
                  <h6 className="text-sm">Psych</h6>
                  <div className="icon">
                    <BookOpenText size={20} className="text-gray-600" />
                  </div>
                </div>
                <CardDescription></CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Smaller Width Column */}
        <div className=" flex-1">
          <Card className="  h-[120px] ">
            <CardHeader>
              <div className="flex justify-between gap-10">
                <h6 className="text-sm">Appointment</h6>
                <div className="icon">
                  <Brain size={20} className="text-gray-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="font-bold">
              <CardTitle>
                20th &nbsp;
                <span className="text-sm text-muted-foreground font-normal">
                  August 2021, 10:00 AM
                </span>
              </CardTitle>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex py-3 px-4 flex-wrap lg:flex-nowrap gap-3 w-full">
        <Card className="flex flex-col w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="font-medium text-base">
              Stress Level
            </CardTitle>
            <CardDescription className="text-xs">
              Your stress level over the past 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={290}>
              <LineChart
                className="text-xs "
                height={200}
                data={name}
                margin={{ top: 5, right: 30, bottom: 5, left: -35 }}
              >
                <Line
                  type="monotone"
                  dataKey="uv"
                  strokeWidth={1.5}
                  activeDot={{ r: 6, fill: `${fillColor}` }}
                  stroke={`${fillColor}`}
                />

                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  labelStyle={{ color: "#1c1c1c" }}
                  itemStyle={{
                    color: "#000000",
                  }}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "5px",
                    padding: "3px 1rem",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="flex flex-col w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="font-medium text-base">
              Stress Level
            </CardTitle>
            <CardDescription className="text-xs">
              Your stress level over the past 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
           
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Export the component as default
export default Index;
