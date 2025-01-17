import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

function Allusers() {
    const [appUser, setAppUsers] = useState([]);
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('user:detail')));

    // console.log(loggedUser.id);  // Log the logged-in user ID

    useEffect(() => {
        const fetchUser = async () => {
            const url = `http://localhost:3000/api/get-users/`;
            const response = await axios.get(url);
            setAppUsers(response.data);
            // console.log('Fetched Users:', response.data); 
        }
        fetchUser();
    }, []);

    const createConversation = async(reciver_id)=>{
     const sender = loggedUser.id;
     const url = `http://localhost:3000/api/create-conversation/`;
     const payload={
        senderId:sender,
        receiverId:reciver_id
     }
     const response = await axios.post(url,payload);
      if(response.data.message){
        // console.log(response.data.message);
        toast.success(response.data.message);
      }
    
    }

    // console.log(appUser);
    return (
        <div className='mt-8 text-center'  >
                      <h1 className='text-3xl font-bold  ' style={{textShadow: '1px 1px 2px pink, 0 0 1em orange, 0 0 0.2em blue'}}>Add Friends</h1>
        <div className="mt-8 flex justify-center flex-wrap ml-3 "> 
            {appUser.length > 0 ? (
                appUser.map((user) => {
                    if (user.user_id !== loggedUser.id) {
                        {/* console.log(user.users.id); */}
                        return (
                            <div key={user.user_id} className="mt-[10px] mb-3 chat_profile2 cursor-pointer bg-[#b19088] hover:bg-gray-900 h-[100px] w-[500px] shadow-lg rounded-xl">
                                <div className="dp">
                                    <img src="dpp.jpg" alt="dp" />
                                </div>
                                <div className="user_name">
                                    <h4>{user.users.name}</h4>
                                    <p className="message_preview">{user.users.email}</p>
                                </div>
                                <button onClick={()=>createConversation(user.user_id)} className='bg-blue-950 text-white h-[40px] w-[40px] rounded-xl f-right ml-auto mt-[18px] hover:bg-yellow-100 hover:text-black '><i className="fa-solid fa-user-plus"></i></button>
                                <ToastContainer />
                            </div>
                        );
                    }
                    
                })
            ) : (
                "No users are available"
            )}
        </div>
        </div>
    );
}

export default Allusers;
