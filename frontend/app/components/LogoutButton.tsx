import { useRouter } from "next/navigation";
import useUserStore from "./useUserStore";


const LogoutButton = () => {
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();
  
  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    router.push('/home')
  };
  return (
    <ul tabIndex={0} 
    className="ml-3 mt-1 pl-0"
    onClick={handleLogout}>
    <li>logout</li>
  </ul>
  );
};

export default LogoutButton;
