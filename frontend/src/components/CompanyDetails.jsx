import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyDetails = () => {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const token = localStorage.getItem("token"); // Retrieve token if required

      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/job/get/67bad9f777da4738f04f6dfe",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {}, // Only send token if available
          }
        );
        setCompanyDetails(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
        setError(
          error.response?.status === 401
            ? "Unauthorized access. Please log in."
            : "Failed to fetch company details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []);

  return (
    <div>
      <h2>Company Details</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : companyDetails ? (
        <pre>{JSON.stringify(companyDetails, null, 2)}</pre>
      ) : (
        <p>No details available.</p>
      )}
    </div>
  );
};

export default CompanyDetails;
