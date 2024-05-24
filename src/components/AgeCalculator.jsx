import { useState } from "react";
import PropTypes from "prop-types";

export const AgeCalculator = ({ calculateAge }) => {
  const [date, setDate] = useState("");

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateAge(date);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-auto">
        <input
          value={date}
          type="date"
          className="mb-3"
          onChange={handleChangeDate}
        />
      </div>
      <div className="col-auto">
        <button
          disabled={!date}
          type="submit"
          className="btn btn-primary mb-3"
          style={{ transition: "background-color 0.3s" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#6f42c1")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Calculate Age
        </button>
      </div>
    </form>
  );
};

AgeCalculator.propTypes = {
  calculateAge: PropTypes.func.isRequired,
};
