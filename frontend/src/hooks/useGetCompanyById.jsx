import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Company_API_END_POINT } from "../../utils/constant.js";
import { setSingleCompany } from "../../redux/companySlice.js";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  const [singleCompany, setSingleCompanyState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        console.log(`Fetching company data for companyId: ${companyId}`);
        const res = await axios.get(
          `${Company_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setSingleCompanyState(res.data.company);
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError(err.response ? err.response.data : err.message); // Capture the error message from the server response
      } finally {
        setLoading(false);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);

  return { singleCompany, loading, error };
};

export default useGetCompanyById;
