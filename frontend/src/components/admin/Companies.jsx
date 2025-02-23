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
        <div className="flex items-center justify-end mb-4">
          {/* "New Company" Button aligned to the right */}
          <Button onClick={() => navigate("/admin/companies/create")}>
            Post Company
          </Button>
        </div>
        <CompaniesTable searchText={input} />
      </div>
    </div>
  );
};

export default Companies;
