import React, { useEffect, useState } from "react";
import axios from "axios";
import { Company_API_END_POINT } from "../../utils/constant.js";

const CompanyDetails = ({ companyId }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (companyId) {
      console.log("Fetching company with ID:", companyId);

      const fetchCompanyDetails = async () => {
        try {
          const res = await axios(`${Company_API_END_POINT}/get/${companyId}`, {
            withCredentials: true, // Ensure cookies/session are sent
          });

          if (res.data.success) {
            setCompany(res.data.company);
          } else {
            setError("Company not found");
          }
        } catch (error) {
          if (error.response?.status === 401) {
            setError("Unauthorized access. Please login to view this company.");
          } else {
            setError("Error fetching company data: " + error.message);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchCompanyDetails();
    }
  }, [companyId]);

  // If loading, show loading state
  if (loading) {
    return <div>Loading Company Details...</div>;
  }

  // If there's an error, show error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto my-10">
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Company Details
      </h1>

      <div>
        <h1 className="font-bold my-1">
          Company Name:
          <span className="pl-4 font-normal text-gray-800">
            {company?.name}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {company?.location}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Company Description:
          <span className="pl-4 font-normal text-gray-800">
            {company?.description}
          </span>
        </h1>

        {/* Website Section */}
        <h1 className="font-bold my-1">
          Website:
          <span className="pl-4 font-normal text-gray-800">
            <a
              href={company?.website}
              className="text-blue-500 underline hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              {company?.website}
            </a>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default CompanyDetails;
