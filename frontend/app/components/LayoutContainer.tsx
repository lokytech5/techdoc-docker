import React, { ReactNode } from 'react';
import Navbar from './nav/Navbar';
import DrawerSide from './DrawerSide';

interface Props {
    children: ReactNode
}

const LayoutContainer = ({ children }: Props) => {
    return (
        <div className="drawer lg:drawer-open md:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <Navbar />
                {children}
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <DrawerSide />
            </div>
        </div>
    );
};

export default LayoutContainer;
