import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../../../utils/constant.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: 0,
    companyId: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company before posting the job.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
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
                or 15000 (if Internsip with 15000 per month))
              </p>
            </div>
            {companies.length > 0 && (
              <div className="col-span-2">
                <Label>Select Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-4">
              Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              Please register a company before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
