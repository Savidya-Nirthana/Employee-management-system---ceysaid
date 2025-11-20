import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { object } from "prop-types";
import { useEffect, useState } from "react";

const statusColors = {
  pending: { text: "text-blue-500", stroke: "stroke-blue-500" },
  approved: { text: "text-yellow-500", stroke: "stroke-yellow-500" },
  confirm: { text: "text-orange-500", stroke: "stroke-orange-500" },
  processing: { text: "text-blue-500", stroke: "stroke-blue-500" },
  completed: { text: "text-green-500", stroke: "stroke-green-500" },
};

function ProgressCircle({ label, used, total, color, stroke }) {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const percentage = total === 0 ? 0 : (used / total) * 100;
    const newOffset = circumference - (percentage / 100) * circumference;

    const timer = setTimeout(() => setOffset(newOffset), 100);

    return () => clearTimeout(timer);
  }, [used, total, circumference]);
  return (
    <div className="flex flex-col items-center text-center min-w-[150px]">
      <div className="relative w-32 h-32 mb-4">
        <svg
          className="transform -rotate-90"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          <circle
            className="stroke-gray-200"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className={`fill-transparent stroke-linecap-round transition-all duration-700 ease-out ${stroke}`}
            strokeWidth="8"
            r={radius}
            cx="60"
            cy="60"
            style={{
              strokeDasharray: `${circumference} ${circumference}`,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className={`text-4xl font-semibold ${color}`}>{used}</span>
        </div>
      </div>
      <span className="text-base font-medium text-gray-600">{label}</span>
    </div>
  );
}

const ShowStat = ({ ShowStat, setShowStat, stat }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative">
      <div
        onClick={() => setShowStat(false)}
        className=" w-[40px] h-[40px] rounded-full bg-red-500 text-white flex items-center justify-center text-[20px] transition-all duration-300 hover:bg-red-600 cursor-pointer absolute right-[-10px] top-[-10px] "
      >
        <FontAwesomeIcon icon={faClose} />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 m-0">Home</h2>
      </div>
      <div className="flex justify-around flex-wrap gap-5 mt-5">
        {Object.keys(stat).map((key) => (
          <ProgressCircle
            key={key.substring(0).toLocaleUpperCase() + key.substring(1)}
            label={key[0].toLocaleUpperCase() + key.substring(1)}
            used={stat[key]}
            total={Object.values(stat).reduce(
              (accumulator, current) => accumulator + current,
              0
            )}
            color={statusColors[key].text}
            stroke={statusColors[key].stroke}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowStat;
