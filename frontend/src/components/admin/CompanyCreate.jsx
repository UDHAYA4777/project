import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Company_API_END_POINT } from "../../../utils/constant.js";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../../redux/companySlice.js";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const registeredNewCompany = async () => {
    if (!name.trim()) {
      // If the name is empty or only spaces, show an error
      toast.error("Company name is required");
      return;
    }

    try {
      const res = await axios.post(
        `${Company_API_END_POINT}/register`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      } else {
        // If there's a failure message from the backend, show it
        toast.error(res.data.message || "Failed to register company");
      }
    } catch (error) {
      console.log(error);
      // Handle network or unexpected errors
      toast.error("Company already registered");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            Recruiters, post a job in the job portal. You can edit the details
            later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Google, Microsoft, etc."
          value={name} // Bind the input value to state
          onChange={(e) => setName(e.target.value)} // Update state on input change
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registeredNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
