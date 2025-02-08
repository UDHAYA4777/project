import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText = "" } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState([]);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job?.company?.name
        ?.toLowerCase()
        .includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const handleDelete = async () => {
    const jobToDelete = filterJobs.find((job) => job._id === deleteJobId);
    if (!jobToDelete) {
      toast.error("Job not found.");
      return;
    }

    if (deleteConfirmation !== jobToDelete.title) {
      toast.error(
        "Job title does not match. Please enter the correct job title."
      );
      return;
    }

    try {
      const response = await axios.delete(
        `https://finalproject-1-ezj0.onrender.com/api/v1/job/delete/${deleteJobId}`
      );
      if (response.status === 200) {
        setFilterJobs((prevJobs) =>
          prevJobs.filter((job) => job._id !== deleteJobId)
        );
        setShowDeleteConfirmation(false);
        toast.success("Job deleted successfully.");
      } else {
        toast.error("Failed to delete the job.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("An error occurred while deleting the job.");
    }
  };

  const handleDeleteClick = (jobId) => {
    setDeleteJobId(jobId);
    setShowDeleteConfirmation(true);
  };

  const formatSalary = (jobType, salary) => {
    return jobType === "internship" ? `${salary} per month` : `${salary} LPA`;
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                <TableCell>{job?.title || "N/A"}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell>{formatSalary(job.jobType, job.salary)}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <div
                    onClick={() => handleDeleteClick(job._id)}
                    className="flex items-center w-fit gap-2 cursor-pointer mt-2 text-red-600"
                  >
                    <Trash2 className="w-4 h-10" />
                    <span>Delete</span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-lg mb-4">
              Please type the job title to confirm deletion
            </h2>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Job Title"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobsTable;
