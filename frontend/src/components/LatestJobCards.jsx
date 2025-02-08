import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { Badge } from "./ui/badge"; // Assuming Badge is a custom component
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  // Handle navigation when card is clicked
  const handleNavigate = () => {
    if (job?._id) {
      navigate(`/description/${job._id}`);
    }
  };

  return (
    <div
      onClick={handleNavigate} // Use the handle function to ensure safe navigation
      className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer"
    >
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-red-700 font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-purple-600 font-bold"} variant="ghost">
          {job?.jobType === "internship"
            ? `${job?.salary} per month`
            : `${job?.salary} LPA`}
        </Badge>
      </div>
    </div>
  );
};

// Add PropTypes for validation
LatestJobCards.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.number,
    jobType: PropTypes.string,
    salary: PropTypes.number,
  }).isRequired,
};

export default LatestJobCards;
