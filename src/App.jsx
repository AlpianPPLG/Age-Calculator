import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AgeCalculator } from "./components/AgeCalculator";
import { AgeResult } from "./components/AgeResult";
import { AgeChart } from "./components/AgeChart";
import { LeaveMessage } from "./components/LeaveMessage"; // Import LeaveMessage component
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
  const [decade, setDecade] = useState(null);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]); // State untuk riwayat perhitungan
  const [motivation, setMotivation] = useState(""); // State untuk motivasi
  const [fact, setFact] = useState(""); // State untuk cerita atau fakta menarik

  const motivationalQuotes = [
    "Age is merely the number of years the world has been enjoying you.",
    "The more you praise and celebrate your life, the more there is in life to celebrate.",
    "You are never too old to set another goal or to dream a new dream.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "The secret of staying young is to live honestly, eat slowly, and lie about your age.",
  ];

  const interestingFacts = [
    "Did you know? The tradition of celebrating birthdays dates back to ancient Egypt, where the Pharaoh's birthday was considered a significant event.",
    "In many cultures, a person's 18th birthday is considered a rite of passage into adulthood.",
    "The longest recorded human lifespan is 122 years, achieved by Jeanne Calment of France.",
    "In ancient Rome, birthday celebrations were reserved for men, while women's birthdays were not celebrated until the 12th century.",
    "In some cultures, it's customary to celebrate 'half-birthdays' for children who are born on dates that fall close to holidays.",
  ];

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(storedMessages);

    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const calculateAge = (date) => {
    const today = new Date();
    const dateObject = new Date(date);

    const years = differenceInYears(today, dateObject);
    const ageDetails = {
      years: years,
      months: differenceInMonths(today, dateObject),
      days: differenceInDays(today, dateObject),
      weeks: differenceInWeeks(today, dateObject),
      hours: differenceInHours(today, dateObject),
      minutes: differenceInMinutes(today, dateObject),
      seconds: differenceInSeconds(today, dateObject),
    };

    setAge(ageDetails);
    setHistory([
      ...history,
      { date: dateObject.toDateString(), age: ageDetails },
    ]); // Tambahkan riwayat perhitungan

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

    const currentDecade = Math.floor(years / 10) * 10;
    const yearsInCurrentDecade = years - currentDecade;
    const yearsToNextDecade = 10 - yearsInCurrentDecade;
    setDecade({
      currentDecade: currentDecade,
      yearsToNextDecade: yearsToNextDecade,
    });

    // Ambil kutipan motivasi dan fakta menarik secara acak
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    const randomFact =
      interestingFacts[Math.floor(Math.random() * interestingFacts.length)];
    setMotivation(randomQuote);
    setFact(randomFact);
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

  const handleNewMessage = (message) => {
    setMessages([...messages, message]);
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
      {/* Fitur Leave a Message */}
      <LeaveMessage onSubmit={handleNewMessage} />
      <div className="my-4">
        <h4>Messages</h4>
        {messages.map((msg, index) => (
          <div key={index} className="border p-2 mb-2 rounded">
            <strong>{msg.name}</strong> {msg.email && `(${msg.email})`}:
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      {/* Riwayat Perhitungan */}
      <div className="my-4">
        <h4>Riwayat Perhitungan Usia</h4>
        {history.length === 0 ? (
          <p>Tidak ada riwayat perhitungan.</p>
        ) : (
          history.map((entry, index) => (
            <div key={index} className="border p-2 mb-2 rounded">
              <strong>Tanggal: {entry.date}</strong>
              <p>
                Usia: {entry.age.years} tahun, {entry.age.months} bulan,{" "}
                {entry.age.days} hari
              </p>
            </div>
          ))
        )}
      </div>
      {/* Motivasi */}
      {motivation && (
        <div className="alert alert-success text-center">
          <h5>Motivasi Hari Ini:</h5>
          <p>{motivation}</p>
        </div>
      )}
      {/* Fakta Menarik */}
      {fact && (
        <div className="alert alert-info text-center">
          <h5>Fakta Menarik:</h5>
          <p>{fact}</p>
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
