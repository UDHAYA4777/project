import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  // Filter jobs based on the searched query
  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(searchedQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Result ({filteredJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length === 0 ? (
            <span>No Job Available</span>
          ) : (
            filteredJobs
              .slice(0, 6)
              .map((job) => <Job key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
