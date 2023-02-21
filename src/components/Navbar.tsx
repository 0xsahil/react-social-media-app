import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from 'firebase/auth';
import "./Navbar.css"


export const Navbar = () => {
    const [user] = useAuthState(auth);
    const logOut = async () => {
        await signOut(auth);
    }
    return (
        <div className="container">
            {/* navigation Links */}
            <div className='item-1'>
                <Link to="/" className='text-links' > Home </Link>
                {!user ? <Link to="/login" className='text-links'>Login </Link> : <Link to="/createpost" className='text-links' > Create Post</Link>}
            </div>


            

            {/* user information */}

            {user && (
                <div className='item-2'>
                    <img src={user?.photoURL || ""} alt="" />
                    <p>{user?.displayName} </p>
                    <button onClick={logOut}>Log Out</button>
                </div>
            )}

        </div>
    )
}