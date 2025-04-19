import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const Cv = () => {
  const { candidateID } = useParams();
  const [connectedUser, setUser] = useState(null);
  console.log("connected user:", connectedUser);

  useEffect(() => {
    const getCandidate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getuserid/${candidateID}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log(response.data.userFound);
          setUser(response.data.userFound);
          console.log("user found")
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
      }
    };
    getCandidate();
  }, [candidateID]);

  if (!connectedUser) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    // <div></div>
    <div>
      <Link to={"/Cdashboard/addproject"}>
        <button className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 ">
          cancel
        </button>
      </Link>
      <div
        className={` bg-gray-100 font-sans border-2 border-blue-500  w-[100%]`}
      >
        <div className=" mx-auto py-8 px-4 border-2 border-blue-500 w-[100%]  ">
          <div className="bg-white p-6 rounded-lg shadow-lg  border-2 border-blue-500  w-[100%] ">
            <h1 className="text-3xl font-semibold"> {connectedUser.name} </h1>
            {/* <p className="text-gray-600">Web Developer</p> */}
            <hr className="my-4" />
            <h2 className="text-xl font-semibold mb-2">name</h2>
            <p className="text-gray-700">{connectedUser.name}</p>
            <h2 className="text-xl font-semibold mt-4 mb-2">phone</h2>
            <ul className="list-disc list-inside text-gray-700">
              {connectedUser.phone}
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">location</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                {connectedUser.location}
              </h3>
            </div>
            <h2 className="text-xl font-semibold mt-4 mb-2">Contact</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Email: {connectedUser.email} </li>
              <li>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/johndoe"
                  className="text-blue-500 hover:underline"
                >
                  {connectedUser.links}
                </a>
              </li>
              <li>
                Website:{" "}
                <a
                  href="https://www.johndoe.com"
                  className="text-blue-500 hover:underline"
                >
                  {connectedUser.links}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
