import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const[hidePass, setHidePass]= useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handlepass =()=>{
    setHidePass(!hidePass);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    
    if (password.length < 8) {

      return toast.error('Password must be at least 8 characters long');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:3000/api/reset-password', {
        token,
        newPassword: password
      });
      
      toast.success('Password reset successfully');
      navigate('/sign-in');

    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('Invalid or expired reset token');
      } else if (error.response?.status === 404) {
        toast.error('User not found');
      } else {
        toast.error('Failed to reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=' h-screen flex justify-center items-center'>

         <div className='bg-[#08031B] shadow-[0_35px_60px_-15px_rgba(0.9,0.9,0.9,0.9)] border-x-4  w-[450px] h-[500px] rounded-3xl flex justify-center items-center flex-col '>    
      <img src="../dpp.jpg" alt="dp" className='w-24 h-24 rounded-full object-cover -mt-12 mb-2 '/>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            Reset Password
          </h2>
        </div>
        <form className="mt-6 space-y-9" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className='flex'>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type={hidePass ? "password":"text"}
                required
                className="appearance-none mt-7 rounded-none relative block w-full px-6 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-950 focus:border-blue-950 focus:z-10 sm:text-sm"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                {hidePass ?<i onClick={handlepass} className="fa-regular fa-eye  text-stone-900 z-20 mt-10 justify-center items-center fixed -ml-8"></i> : <i onClick={handlepass} className="fa-regular fa-eye-slash  text-stone-900 z-20 mt-10 justify-center items-center fixed -ml-8"></i> }
              
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-none mt-7 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
   
          
         </div>
         </div>
  );
};

export default ResetPassword; 