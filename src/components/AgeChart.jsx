import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const AgeChart = ({ age }) => {
  const data = {
    labels: ["Years", "Months", "Weeks", "Days"],
    datasets: [
      {
        label: "Age Breakdown",
        data: [age.years, age.months, age.weeks, age.days],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Age Breakdown",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

AgeChart.propTypes = {
  age: PropTypes.shape({
    years: PropTypes.number.isRequired,
    months: PropTypes.number.isRequired,
    weeks: PropTypes.number.isRequired,
    days: PropTypes.number.isRequired,
  }).isRequired,
};
