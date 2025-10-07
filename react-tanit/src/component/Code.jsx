import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";

export const Code = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  console.log(code);
  const { revalidate } = useRevalidator();

  const handleCode = async () => {
    try {
      const response = await axios.post(
        "https://tanit-ecommerce-check.onrender.com/signup",
        {
          code: code,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("code matches ");
        console.log(response);
        revalidate();
        navigate("/");
      } else {
        toast.error("invalid code");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <div>
        <input
          onChange={(e) => setCode(e.target.value)}
          type="text"
          placeholder="code here"
        />
      </div>
      <br />
      <h2 style={{ color: "red" }}>
        {" "}
        USED '1111' AS A PLACEHOLDER CODE DUE TO SMTP/EMAIL SENDING ISSUES, TO
        BYPASS VERIFICATION AND TEST FRONTEND–BACKEND INTEGRATION QUICKLY.{" "}
      </h2>
      <div></div>

      <button onClick={handleCode}>submit</button>
    </div>
  );
};
