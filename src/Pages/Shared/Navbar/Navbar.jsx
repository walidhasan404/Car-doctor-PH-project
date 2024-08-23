import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import axios from 'axios';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                axios.post('https://car-doctor-server-six-wine.vercel.app/logout', {}, { withCredentials: true })
                    .then(response => {
                        if (response.status === 200) {
                            console.log('Successfully logged out');
                        }
                    })
                    .catch(error => console.error('Error during logout:', error));
            })
            .catch(error => console.log('Logout failed:', error));
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const navItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
    </>;

    return (
        <div className="relative">
            <div className="navbar bg-base-100 shadow-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-10" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end flex items-center space-x-3">
                    {user?.email ? (
                        <>
                            <div className="relative">
                                <img
                                    onClick={toggleModal}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    src={user.photoURL}
                                    alt={user.displayName}
                                />
                                {isModalOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white rounded-lg p-6 w-80">
                                            <div className="text-center mb-4">
                                                <img className="w-20 h-20 rounded-full mx-auto" src={user.photoURL} alt="User" />
                                                <h2 className="text-xl font-semibold mt-2">{user.displayName}</h2>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogOut}
                                                className="btn btn-danger w-full mb-3"
                                            >
                                                Log Out
                                            </button>
                                            <button
                                                onClick={toggleModal}
                                                className="btn btn-secondary w-full"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Link to="/bookings" className="btn btn-primary text-lg"><strong>Bookings</strong></Link>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
