import { Bookmark } from "lucide-react";
import { useState } from "react"; // Removed unused React import
import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Corrected the milliseconds calculation
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} day${
                daysAgoFunction(job?.createdAt) > 1 ? "s" : ""
              } ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt="Company Logo" />
          </Avatar>
        </Button>
        <div>
          <h1>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-400 font-bold" variant="ghost">
          {job?.position} positions
        </Badge>
        <Badge className="text-red-700 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-600 font-bold" variant="ghost">
          {job?.salary} {job?.jobType === "internship" ? "per month" : "LPA"}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

Job.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    jobType: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string, // Added logo in PropTypes
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Job;
