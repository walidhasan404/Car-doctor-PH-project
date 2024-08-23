import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';

const Profile = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className='text-center py-5'>
            <img className='mx-auto' src={user.photoURL} alt="" />
            <h3>{user.displayName}</h3>
            <p>return to <span className='text-blue-700'><Link to="/">home</Link></span></p>
        </div>
    );
};

export default Profile;