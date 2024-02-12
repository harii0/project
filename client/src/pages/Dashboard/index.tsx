// Import necessary components and libraries
import React, { useEffect, useState } from "react";
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
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { BookOpenText, Brain, Trophy } from "lucide-react";

// Define the functional component

const Index = () => {
  // Define the state for the current step
  // State to track the current step
  const [currentStep, setCurrentStep] = useState(0);

  // State to track selected options
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleOptionChange = (questionId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Process submission here (e.g., send to an API)
    console.log(selectedOptions);
  };
  // Define the theme
  const [fillColor, setFillColor] = React.useState("#000");
  useEffect(() => {
    const isDarkmode =
      localStorage.getItem("vite-ui-theme") === "dark" ||
      localStorage.getItem("vite-ui-theme") === "system";
    const fillColor = isDarkmode ? "#fff" : "#000";
    setFillColor(fillColor);
  }, []);

  // Define the questions
  const questions = [
    {
      id: 1,
      questionText: "How stressed have you felt this week?",
      options: [
        { id: "a", text: "Not at all" },
        { id: "b", text: "Somewhat stressed" },
        { id: "c", text: "Very stressed" },
        { id: "d", text: "Extremely stressed" },
      ],
    },
    {
      id: 2,
      questionText: "How many hours of sleep did you get last night?",
      options: [
        { id: "a", text: "0-3 hours" },
        { id: "b", text: "4-6 hours" },
        { id: "c", text: "7-9 hours" },
        { id: "d", text: "10+ hours" },
      ],
    },
    {
      id: 3,
      questionText: "How many hours of exercise did you get this week?",
      options: [
        { id: "a", text: "0 hours" },
        { id: "b", text: "1-3 hours" },
        { id: "c", text: "4-6 hours" },
        { id: "d", text: "7+ hours" },
      ],
    },
    {
      id: 4,
      questionText: "How many hours of work did you get this week?",
      options: [
        { id: "a", text: "0 hours" },
        { id: "b", text: "1-10 hours" },
        { id: "c", text: "11-20 hours" },
        { id: "d", text: "21+ hours" },
      ],
    },
    // Add more questions as needed
  ];
  // Define the data for the chart
  const data = [
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
                  <h6 className="text-xs">Total Article Read</h6>
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
                <CardTitle>{0}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
            </Card>

            {/* Add more cards as needed */}
            <Card className="flex-1 h-[120px] ">
              <CardHeader>
                <div className="flex justify-between gap-10">
                  <h6 className="text-sm">Learning Progress</h6>
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
                data={data}
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
        <div className="md:w-1/2 flex  gap-2 flex-wrap ">
          <Card className="md:w-[17rem] w-full hover:bg-secondary">
            <CardHeader>
              <CardTitle className="font-medium text-base">
                Find a Therapist
              </CardTitle>
              <CardDescription className="text-xs">
                This is a chart that shows the stress level of the user
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className=" md:w-1/2 w-full hover:bg-secondary">
            <Dialog>
              <DialogTrigger>
                <CardHeader>
                  <CardTitle className="font-medium text-base self-start">
                    Track Stress Level
                  </CardTitle>
                  <CardDescription className="text-xs self-start text-left">
                    This is a chart that shows the stress level of the user
                  </CardDescription>
                </CardHeader>
              </DialogTrigger>
              <DialogContent>
                {currentStep < questions.length && (
                  <div key={questions[currentStep].id}>
                    <h1 className="text-lg font-semibold mb-2">
                      {questions[currentStep].questionText}
                    </h1>
                    {questions[currentStep].options.map((option) => (
                      <label key={option.id} className="block mb-1">
                        <input
                          type="radio" // or "checkbox" for multiple selections
                          name={`question_${questions[currentStep].id}`}
                          value={option.id}
                          checked={
                            selectedOptions[questions[currentStep].id] ===
                            option.id
                          }
                          onChange={() =>
                            handleOptionChange(
                              questions[currentStep].id.toString(),
                              option.id
                            )
                          }
                          className="mr-2"
                        />
                        {option.text}
                      </label>
                    ))}
                  </div>
                )}
                <div className="mt-4">
                  {currentStep > 0 && (
                    <button onClick={previousStep} className="mr-2">
                      Previous
                    </button>
                  )}
                  {currentStep < questions.length - 1 && (
                    <button onClick={nextStep}>Next</button>
                  )}
                  {currentStep === questions.length - 1 && (
                    <button onClick={handleSubmit}>Submit</button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </Card>

          <Card className="md:w-[17rem] w-full hover:bg-secondary">
            <CardHeader>
              <CardTitle className="font-medium text-base">
                Stress Level
              </CardTitle>
              <CardDescription className="text-xs">
                This is a chart that shows the stress level of the user
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="md:w-1/2 w-full hover:bg-secondary">
            <CardHeader>
              <CardTitle className="font-medium text-base">
                Stress Level
              </CardTitle>
              <CardDescription className="text-xs">
                This is a chart that shows the stress level of the user
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Export the component as default
export default Index;
