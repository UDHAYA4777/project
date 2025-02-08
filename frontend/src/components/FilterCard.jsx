import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice.js";

const filterData = [
  {
    filterType: "Location",
    array: [
      "chennai",
      "Hyderabad",
      "bangalore",
      "Delhi",
      "Noida",
      "Pune",
      "Mumbai",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend developer",
      "Backend developer",
      "FullStack developer",
      "Data science",
      "Networking",
      "Cyber Security",
      "AI/MI",
      "Cloud Computing",
      "IT Support",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    name={data.filterType} // Ensure each group of options has the same name
                    checked={selectedValue === item} // Mark the radio as checked if it matches selectedValue
                  />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
