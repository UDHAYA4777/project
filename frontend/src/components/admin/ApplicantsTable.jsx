import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";

const ApplicantsTable = ({ applicants, shortListingStatus, statusHandler }) => {
  const [filterText, setFilterText] = useState("");

  const filteredApplicants = (applicants?.applications || []).filter((item) =>
    String(item?.applicant?.phoneNumber || "").includes(filterText)
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Filter by contact number"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="p-2 mb-4 border rounded w-full"
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">Name</TableCell>
            <TableCell className="font-bold">Email</TableCell>
            <TableCell className="font-bold">Contact Number</TableCell>
            <TableCell className="font-bold">Skills</TableCell>
            <TableCell className="font-bold">Resume</TableCell>
            <TableCell className="font-bold">Applied Date</TableCell>
            <TableCell className="font-bold text-right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredApplicants?.length > 0 ? (
            filteredApplicants.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="p-2">
                  {item?.applicant?.fullName || "NA"}
                </TableCell>
                <TableCell className="p-2">
                  {item?.applicant?.email || "NA"}
                </TableCell>
                <TableCell className="p-2">
                  {item?.applicant?.phoneNumber || "NA"}
                </TableCell>
                <TableCell className="p-2">
                  {(item?.applicant?.profile?.skills || []).length > 0
                    ? item.applicant.profile.skills.join(", ")
                    : "NA"}
                </TableCell>
                <TableCell className="p-2">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    "NA"
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {item?.applicant?.createdAt?.split("T")[0] || "NA"}
                </TableCell>
                <TableCell className="p-2 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item._id)}
                          className="flex items-center my-1 cursor-pointer p-1 rounded hover:bg-gray-200 transition duration-200 ease-in-out"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" className="text-center p-2">
                No applicants found for the given contact number.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
