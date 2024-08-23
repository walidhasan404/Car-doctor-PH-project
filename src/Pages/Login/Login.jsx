import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {

    const { signIn, googleSignin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const user = { email };

                axios.post('https://car-doctor-server-six-wine.vercel.app/jwt', user, { withCredentials: true })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.success) {
                            navigate(location?.state ? location?.state : '/');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
                // alert("Invalid email or password. Please try again.");
            });
    };


    const handleGoogleSignin = async () => {
        try {
            const result = await googleSignin();
            const loggedInUser = result.user;

            const user = { email: loggedInUser.email };
            const response = await axios.post('https://car-doctor-server-six-wine.vercel.app/jwt', user, { withCredentials: true });

            if (response.data.success) {
                localStorage.setItem('jwtToken', response.data.token);
                navigate(location?.state?.from?.pathname || '/', { replace: true });
            }
        } catch (error) {
            console.error('Google Sign-In error:', error);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" name='password' placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-outline" type="submit" value="Login" />
                            </div>
                            <button onClick={handleGoogleSignin} className='btn btn-primary  mt-4'>
                                <strong><FaGoogle className='w-20 text-2xl' /></strong>
                            </button>
                        </form>
                        <p className='mb-4 text-center'>New to Car Doctors <Link className='text-orange-600 font-bold' to="/signup">Sign Up</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;