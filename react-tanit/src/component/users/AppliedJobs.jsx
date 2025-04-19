import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";

export const AppliedJobs = () => {
  const connectedUser = useLoaderData();
  // const [applied, setApplied] = useState([]);
  console.log(connectedUser);
  const { revalidate } = useRevalidator();

  // console.log(applied);
  // const getCurrent = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/getappliedjobs", {
  //       withCredentials: true,
  //     });
  //     console.log(response);
  //     if (response.status === 200) {
  //       console.log(response.data.userFound.applied);
  //       setApplied(response.data.userFound.applied);
  //       return response.data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   getCurrent();
  // }, []);
  const handleDelete = async (selected) => {
    try {
      console.log(selected);
      const response = await axios.put(
        `http://localhost:5000/deleteapplied/${selected}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("info of deleting sent");
        revalidate();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
  if (!connectedUser) {
    return <div>...loading</div>;
  }

  return (
    <div>
      {connectedUser.applied.map((job) => (
        <>
          {/* component */}
          <div className=" border-2 border-blue-700 mt-5 rounded-md w-full bg-white px-4 py-4 shadow-md transition transform duration-500 cursor-pointer">
            <div className="flex flex-col justify-start">
              <div className="flex justify-between items-center ">
                <div className="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
                  <svg
                    className="w-7 h-7 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillrule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      cliprule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  <span> {job.title} </span>
                </div>
                <span>
                  <span style={{ fontWeight: "bold" }}>Description</span>{" "}
                  {job.description}{" "}
                </span>
                {/* <span className="bg-green-500 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl">
                  {" "}
                  Remote{" "}
                </span> */}
              </div>
              <div className="text-sm text-gray-500 flex space-x-1 items-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillrule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    cliprule="evenodd"
                  />
                </svg>
                <span> {job.location} </span>
              </div>
              <div>
                <div className="mt-5">
                  <button
                    onClick={() => handleDelete(job._id)}
                    className={`   mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer`}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
