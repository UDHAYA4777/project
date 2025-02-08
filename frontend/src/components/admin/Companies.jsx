import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between mb-4">
          {/* Search Input for Filtering */}
          <input
            type="text"
            placeholder="Filter by Name..."
            className="p-2 border rounded-md w-1/4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {/* "New Company" Button */}
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable searchText={input} />
      </div>
    </div>
  );
};

export default Companies;
