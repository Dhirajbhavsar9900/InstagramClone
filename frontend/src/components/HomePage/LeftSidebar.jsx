import React from "react";
import IGimg from "../../img/LoginPage/instagram.png";
import { useNavigate } from "react-router-dom";
import LeftSiderTop from "./LeftSiderButton/LeftSiderTop";
import LeftSiderButtom from "./LeftSiderButton/LeftSiderButtom";

function LeftSidebar() {
  return (
    <aside className="w-full lg:max-w-[250px]  border-none rounded-r-3xl bg-[#0e0e0e] text-white border-r p-4 pb-6 hidden lg:flex flex-col justify-between lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
      <div className="flex cursor-pointer items-center ml-5 my-6">
        <img className="w-[120px] lg:w-[100px] h-auto" src={IGimg} alt="Instagram" />
      </div>
      <div className="flex flex-col h-full">
        <LeftSiderTop />
        <LeftSiderButtom />
      </div>
    </aside>
  );
}

export default LeftSidebar;
