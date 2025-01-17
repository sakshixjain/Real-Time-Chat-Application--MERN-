import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:3000/api/forget-password', { 
        email: email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      toast.success(response.data.message);
      setEmail('');
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(
        error.response?.data?.message || 
        'Failed to send reset link. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className=' h-screen flex justify-center items-center'>

    <div className='bg-[#08031B] shadow-[0_35px_60px_-15px_rgba(0.9,0.9,0.9,0.9)] border-x-4  w-[450px] h-[500px] rounded-3xl flex justify-center items-center flex-col '>
    <img src="dpp.jpg" alt="dp" className='w-24 h-24 rounded-full object-cover -mt-20 mb-12 '/>

    <div>
           <h2 className=" text-center text-3xl font-extrabold text-gray-100">
          Forgot Password
           </h2>
       </div>
        <form className="mt-8 space-y-9" onSubmit={handleSubmit}>
         <div>
           <label htmlFor="email" className="sr-only">
               Email address
             </label>
             <input
               id="email"
               name="email"
               type="email"
               required
               className="appearance-none rounded-none relative block w-full px-8 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Email address"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
             />
           </div>

           <div>
             <button
               type="submit"
               disabled={loading}
               className="group relative w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
             >
               {loading ? 'Sending...' : 'Send Reset Link'}
             </button>
           </div>
         </form>
         <ToastContainer />
    </div>
    </div>
  );
};

export default ForgotPassword;