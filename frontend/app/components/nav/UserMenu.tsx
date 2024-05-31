import Image from "next/image";
import LogoutButton from "../LogoutButton";
import useUserStore from "../useUserStore";

const UserMenu = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated );

  if (!isAuthenticated) {
    return null;
  }

    return (
      <div className="dropdown dropdown-end sm:block px-2">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
          <Image
                alt="User Profile"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                width={40} // Add the width of the image
                height={40} // Add the height of the image
                className="rounded-full"
            />          </div>
        </div>       
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a className="justify-between">Profile<span className="badge">New</span></a></li>
          <li><a>Settings</a></li>
          <li><LogoutButton/></li>
        </ul>
      </div>
    );
  };
  
  export default UserMenu;
  