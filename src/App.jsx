import { useState } from "react";
import PropTypes from "prop-types";
import { AgeCalculator } from "./components/AgeCalculator";
import { AgeResult } from "./components/AgeResult";
import { AgeChart } from "./components/AgeChart";
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
  const [nextBirthday, setNextBirthday] = useState(null);
  const [upcomingBirthday, setUpcomingBirthday] = useState(null);
  const [daysInYear, setDaysInYear] = useState({ daysPassed: 0, daysLeft: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [timeUnit, setTimeUnit] = useState("years");
  const [decade, setDecade] = useState(null); // State untuk menyimpan dekade dan sisa waktu menuju dekade

  const calculateAge = (date) => {
    const today = new Date();
    const dateObject = new Date(date);

    const years = differenceInYears(today, dateObject);
    setAge({
      years: years,
      months: differenceInMonths(today, dateObject),
      days: differenceInDays(today, dateObject),
      weeks: differenceInWeeks(today, dateObject),
      hours: differenceInHours(today, dateObject),
      minutes: differenceInMinutes(today, dateObject),
      seconds: differenceInSeconds(today, dateObject),
    });

    const nextBirthdayDate = new Date(
      today.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate()
    );
    if (nextBirthdayDate < today) {
      nextBirthdayDate.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilNextBirthday = differenceInDays(nextBirthdayDate, today);
    setNextBirthday(daysUntilNextBirthday);

    const daysUntil = checkUpcomingBirthday(dateObject);
    setUpcomingBirthday(daysUntil);

    setDaysInYear(calculateDaysInYear());

    // Menambahkan logika untuk perhitungan dekade
    const currentDecade = Math.floor(years / 10) * 10; // Dekade saat ini
    const yearsInCurrentDecade = years - currentDecade; // Sisa tahun di dekade saat ini
    const yearsToNextDecade = 10 - yearsInCurrentDecade; // Sisa tahun menuju dekade berikutnya
    setDecade({
      currentDecade: currentDecade,
      yearsToNextDecade: yearsToNextDecade,
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const checkUpcomingBirthday = (birthDate) => {
    const today = new Date();
    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = differenceInDays(nextBirthday, today);
    return daysUntilBirthday <= 7 ? daysUntilBirthday : null;
  };

  const calculateDaysInYear = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    const daysPassed = differenceInDays(today, startOfYear);
    const daysLeft = differenceInDays(endOfYear, today) + 1;

    return { daysPassed, daysLeft };
  };

  const AgeTimeline = ({ age }) => {
    const maxAge = 80;
    const agePercentage = Math.min((age.years / maxAge) * 100, 100);

    return (
      <div className="my-4">
        <h5>Progress Usia (Target: {maxAge} Tahun)</h5>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${agePercentage}%` }}
            aria-valuenow={agePercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {agePercentage.toFixed(2)}%
          </div>
        </div>
      </div>
    );
  };

  AgeTimeline.propTypes = {
    age: PropTypes.shape({
      years: PropTypes.number.isRequired,
      months: PropTypes.number,
      days: PropTypes.number,
      weeks: PropTypes.number,
      hours: PropTypes.number,
      minutes: PropTypes.number,
      seconds: PropTypes.number,
    }).isRequired,
  };

  const handleUnitChange = (event) => {
    setTimeUnit(event.target.value);
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
      <div className="mb-3">
        <label>Select Time Unit: </label>
        <select
          value={timeUnit}
          onChange={handleUnitChange}
          className="form-select"
        >
          <option value="years">Years</option>
          <option value="months">Months</option>
          <option value="weeks">Weeks</option>
          <option value="days">Days</option>
          <option value="hours">Hours</option>
          <option value="minutes">Minutes</option>
          <option value="seconds">Seconds</option>
        </select>
      </div>
      {age && (
        <div
          className="mt-4 p-3 border rounded"
          style={{ backgroundColor: darkMode ? "rgb(52, 58, 64)" : "#e9ecef" }}
        >
          <AgeResult age={{ [timeUnit]: age[timeUnit] }} />
          {nextBirthday !== null && (
            <p className="mt-3">
              Days until next birthday: <strong>{nextBirthday}</strong>
            </p>
          )}
          {upcomingBirthday !== null && (
            <div className="alert alert-info text-center">
              🎉 Ulang tahun Anda tinggal {upcomingBirthday} hari lagi!
            </div>
          )}
          <AgeTimeline age={age} />
          <div className="my-4">
            <h5>Hari dalam Tahun Ini</h5>
            <p>Hari yang telah berlalu: {daysInYear.daysPassed}</p>
            <p>Hari yang tersisa: {daysInYear.daysLeft}</p>
          </div>
          <div className="my-4">
            <h5>Sisa Waktu Menuju Dekade Berikutnya</h5>
            <p>
              Dekade Saat Ini: <strong>{decade?.currentDecade}</strong>
            </p>
            <p>
              Sisa Tahun Menuju Dekade Berikutnya:{" "}
              <strong>{decade?.yearsToNextDecade}</strong>
            </p>
          </div>
          <AgeChart age={age} />
        </div>
      )}
      {/* Footer */}
      <footer
        className={`text-center mt-5 p-3 ${
          darkMode ? "bg-dark text-white" : "bg-light text-dark"
        }`}
      >
        <p>
          &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
