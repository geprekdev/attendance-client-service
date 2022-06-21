import React from "react";
import { Outlet } from "react-router-dom";

export default function Student() {
  return (
    <div className="mx-auto h-screen max-w-[420px] border border-t-0  bg-[#EBEBFF] p-5">
      <Outlet />
    </div>
  );
}
