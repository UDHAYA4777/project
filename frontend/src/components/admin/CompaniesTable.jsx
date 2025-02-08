import { MoreHorizontal, Edit2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable({ searchText }) {
  const { companies } = useSelector((store) => store.company);

  // Filter companies based on the search input
  const filteredCompanies = companies.filter((company) =>
    company?.name?.toLowerCase().includes(searchText.toLowerCase())
  );
  const navigate = useNavigate();

  return (
    <div>
      {companies.length === 0 ? (
        <span>You haven't registered any company yet.</span>
      ) : (
        <Table>
          <TableCaption>A list of your registered companies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} alt="Company Logo" />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name || "Company Name"}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default CompaniesTable;
