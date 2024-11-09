import PropTypes from "prop-types";

export const AgeResult = ({ age }) => (
  <>
    {Object.entries(age).map(([unit, value]) => (
      <h5 key={unit}>
        {unit === "years" ? "Your age is" : "Or"} {value}{" "}
        {unit.charAt(0).toUpperCase() + unit.slice(1)}
      </h5>
    ))}
  </>
);

AgeResult.propTypes = {
  age: PropTypes.shape({
    years: PropTypes.number.isRequired,
    months: PropTypes.number.isRequired,
    weeks: PropTypes.number.isRequired,
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }).isRequired,
};
