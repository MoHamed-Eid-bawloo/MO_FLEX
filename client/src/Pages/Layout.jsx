import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="w-full h-auto flex bg-primaryGray relative">
        <aside>
          <Sidebar></Sidebar>
        </aside>
        <div className="flex-1 flex flex-col">
            <header>
              <Header></Header>
            </header>
          <div className="px-5 h-[calc(100vh-57px)] overflow-y-scroll hide-scrollbar relative">
            <main><Outlet/></main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
