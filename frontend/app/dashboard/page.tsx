"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineFundProjectionScreen, AiOutlineHome } from "react-icons/ai";
import { RiGuideLine, RiRegisteredLine, RiLoginBoxLine } from "react-icons/ri";
import LoginPage from '../login/page';
import RegisterPage from '../register/page';
import GuidePage from '../guides/page';
import ProjectPage from '../project/page';
import HomePage from '../home/page';
import Navbar from '../components/nav/Navbar';
import DrawerSide from '../components/DrawerSide';
import usePageStore from '../components/usePageStore';

const DashboardPage = () => {
  const { activePage, setActivePage } = usePageStore();
  return (
    <div className="drawer lg:drawer-open md:drawer-open">
      {/* <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar/>
        <div>
          {activePage === 'home' && <HomePage />}
          {activePage === 'project' && <ProjectPage />}
          {activePage === 'guides' && <GuidePage />}
          {activePage === 'register' && <RegisterPage />}
          {activePage === 'login' && <LoginPage />}
          {activePage === 'removeProject' && <RemoveProject />}
          {activePage === 'addProject' && <AddProject/>}
          {activePage === 'viewProject' && <ProjectsList />}
        </div>
      </div>
      <DrawerSide/> */}
    </div>
  );
};

export default DashboardPage