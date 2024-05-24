import { useState } from "react";
import { AgeCalculator } from "./components/AgeCalculator";
import { AgeResult } from "./components/AgeResult";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears,
} from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [age, setAge] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const calculateAge = (date) => {
    const today = new Date();
    const dateObject = new Date(date);
    setAge({
      years: differenceInYears(today, dateObject),
      months: differenceInMonths(today, dateObject),
      days: differenceInDays(today, dateObject),
      weeks: differenceInWeeks(today, dateObject),
      hours: differenceInHours(today, dateObject),
      minutes: differenceInMinutes(today, dateObject),
      seconds: differenceInSeconds(today, dateObject),
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`container my-5 p-4 border rounded shadow-lg ${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
      style={{ maxWidth: "600px" }}
    >
      <h1
        className="text-center mb-4"
        style={{ color: darkMode ? "#ffffff" : "#007bff" }}
        onClick={() => window.location.reload()}
      >
        Age Calculator
      </h1>
      <p className="text-center mb-4" style={{ fontSize: "1.2rem" }}>
        This free age calculator computes age in terms of years, months, weeks,
        days, hours, minutes, and seconds, given a date of birth.
      </p>
      <div className="text-center mb-4">
        <button className="btn btn-secondary" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="my-3">
        <AgeCalculator calculateAge={calculateAge} />
      </div>
      {age && (
        <div
          className="mt-4 p-3 border rounded"
          style={{ backgroundColor: darkMode ? "rgb(52, 58, 64)" : "#e9ecef" }}
        >
          <AgeResult age={age} />
        </div>
      )}
    </div>
  );
}

export default App;
