import { useState } from 'react';
import { useLoginMutation } from '../../api/beltmarApi';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../landingPage/topNavBar';
import { useDispatch } from 'react-redux';
import { storeTokenInSessionStorage } from '../../slice/beltmarSlice';

function LoginForm() {
    const navigate = useNavigate();
    const [login, { loading, error }] = useLoginMutation();
    const [authToken, setAuthToken] = useState("");
    const [userRole, setUserRole] = useState(null);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const dispatch = useDispatch();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login(formData);
            const token = response.data.token;
            const userRole = response.data.user.role;
    
            // Dispatch an action to store the token and user data in the Redux store
            dispatch(storeTokenInSessionStorage({ token, user: response.data.user }));
    
            // Update local state if needed
            sessionStorage.setItem("authToken", token);
            setAuthToken(token);
            setUserRole(userRole);
    
            // Navigate based on user role
            if (userRole === 'ADMIN') {
                navigate("/admin-dashboard");
            } else if (userRole === 'CLIENT') {
                navigate("/client-dashboard");
            } else {
                console.error("Unknown user role:", userRole);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    


    return (
        <div className=''>
            <TopNavBar />
        <section className=" min-h-screen flex items-center justify-center">
            <div className="bg-gray-300 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="text-center font-bold text-2xl text- to-black">Login</h2>
                    <p className="text-center text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="p-2 mt-8 rounded-xl border"
                            required
                        />
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="p-2 rounded-xl border w-full"
                                required
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>
                        <button type="submit" className="bg-primary rounded-xl text-white py-2 hover:scale-105 duration-300">
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
                <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl" src="https://images.unsplash.com/photo-1611071512738-6dd137f8ff29?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Login" />
                </div>
            </div>
        </section>
    </div>
    );
}

export default LoginForm;


