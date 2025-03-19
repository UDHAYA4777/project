import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "../../../utils/constant.js";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const EditPostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get job id from URL parameters
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch existing job data for editing
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${JOB_API_END_POINT}/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const jobData = res.data.job;
          setInput({
            title: jobData.title,
            description: jobData.description,
            requirements: jobData.requirements,
            salary: jobData.salary,
            location: jobData.location,
            jobType: jobData.jobType,
            position: jobData.position,
          });
        } else {
          toast.error(
            "Job not found or an issue occurred fetching job details."
          );
        }
      } catch (error) {
        toast.error("Failed to fetch job details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check for missing required fields
    if (!input.title || !input.description || !input.salary) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/${id}`, // PUT request for updating job
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full my-5">
        <form
          onSubmit={submitHandler}
          className="p-4 max-w-xl border border-gray-200 shadow-lg rounded-md w-full"
        >
          {loading && (
            <div className="text-center">
              <Loader2 className="animate-spin mx-auto my-2" />
              <p>Loading...</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                placeholder="Job Title"
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                placeholder="Job Description"
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                placeholder="Job Requirements"
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="Job Location"
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Select
                value={input.jobType}
                onValueChange={(value) =>
                  setInput({ ...input, jobType: value })
                }
                className="my-1 w-full"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fulltime">Full-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
              <p className="text-xs text-red-600 mt-1">
                * Enter the salary in number (eg : 5 (if Fulltime job with 5LPA)
                or 15000 (if Internship with 15000 per month))
              </p>
            </div>

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Updating..." : "Update Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostJob;
