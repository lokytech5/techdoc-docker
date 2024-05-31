import React from 'react'
import LayoutContainer from './LayoutContainer'
import { useRouter } from 'next/navigation'

interface Props {
    onClose: () => void;
}

const LoginAlert = ({onClose}: Props) => {
    const router = useRouter()

    const handleLogin = () => {
        onClose();
        router.push("/login");
      };

  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
    <div className="text-center p-5">
        <h1 className="text-2xl font-bold text-white mb-6">Please log in to access this content.</h1>
        <div className="flex justify-center gap-6">
            <button className="btn btn-primary" onClick={handleLogin}>
                Log In
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
                Cancel
            </button>
        </div>
    </div>
</div>
      
  )
}

export default LoginAlert