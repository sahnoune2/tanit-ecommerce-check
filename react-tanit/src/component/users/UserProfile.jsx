import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";

export const UserProfile = () => {
  const { revalidate } = useRevalidator();
  const connectedUser = useLoaderData();
  console.log(connectedUser);
  const navigate = useNavigate();
  if (!connectedUser) {
    navigate("/");
  }
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState({
    name: connectedUser.name || "",
    experience: connectedUser.experience || "",
    links: connectedUser.links || "",
    email: connectedUser.email || "",
    phone: connectedUser.phone || "",
    location: connectedUser.location || "",
  });
  console.log(company);

  const handleclick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/updateuser",
        company,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("infor for update has been sent");
        revalidate();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>User Profile</title>
      <div
        className={`${
          show ? "" : "hidden"
        } font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl`}
      >
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between mb-5 items-start">
            <h2 className="mb-5 text-4xl font-bold text-blue-900">
              Update company Profile
            </h2>
            <div className="text-center">
              <div>
                <img
                  src="https://i.pravatar.cc/300"
                  alt="Profile Picture"
                  className="  rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
                />
                <input
                  className="hidden"
                  type="file"
                  name="profile"
                  id="upload_profile"
                  hidden=""
                  required=""
                />
                <label
                  htmlFor="upload_profile"
                  className="inline-flex items-center"
                >
                  <svg
                    data-slot="icon"
                    className="w-5 h-5 text-blue-700"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    ></path>
                  </svg>
                </label>
              </div>
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300">
                Change Profile Picture
              </button>
            </div>
          </div>
          {/* Bilgi Düzenleme Formu */}
          <form className="space-y-4">
            {/* İsim ve Unvan */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                onChange={(e) =>
                  setCompany({ ...company, name: e.target.value })
                }
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue={connectedUser.name}
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                experience
              </label>
              <input
                onChange={(e) =>
                  setCompany({ ...company, experience: e.target.value })
                }
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue={connectedUser.experience}
              />
            </div>
            {/* Organizasyon Bilgisi */}
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700"
              >
                links
              </label>
              <input
                onChange={(e) =>
                  setCompany({ ...company, links: e.target.value })
                }
                type="text"
                id="organization"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue={connectedUser.links}
              />
            </div>
            {/* İletişim Bilgileri */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                onChange={(e) =>
                  setCompany({ ...company, email: e.target.value })
                }
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue={connectedUser.email}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                onChange={(e) =>
                  setCompany({ ...company, phone: e.target.value })
                }
                type="tel"
                id="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue={connectedUser.phone}
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                onChange={(e) =>
                  setCompany({ ...company, location: e.target.value })
                }
                type="text"
                id="location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue={connectedUser.location}
              />
            </div>
            {/* Kaydet ve İptal Butonları */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShow(false)}
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  handleclick(e); // Call the existing function
                  setShow(false); // Toggle show state
                }}
                type="submit"
                className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={`${
          show ? "hidden" : ""
        } bg-gray-100 font-sans border-2 border-blue-500  w-[100%]`}
      >
        <div className=" mx-auto py-8 px-4 border-2 border-blue-500 w-[100%]  ">
          <div className="bg-white p-6 rounded-lg shadow-lg  border-2 border-blue-500  w-[100%] ">
            <button
              onClick={(e) => setShow(true)}
              className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
            >
              edit profile
            </button>
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
    </>
  );
};
