import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="mt-48 flex h-full w-full justify-center">
      <button
        className="rounded-lg border border-blue-500 py-3 px-5 text-xl font-semibold text-blue-700 hover:bg-blue-500 hover:text-white hover:transition"
        onClick={() => navigate("/instructor/classlists")}
      >
        Login
      </button>
    </div>
  );
}
