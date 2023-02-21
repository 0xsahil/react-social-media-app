import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate("/")
    }


    return (
        <div className="text-3xl">
            <p>Sign in with Google to continue</p>
            <button onClick={signInWithGoogle} className="bg-transparent hover:bg-blue-100 text-gray-800 font-semibold py-4 px-8 border border-gray-400 rounded-lg shadow text-xl" >Sign in with Google </button>
        </div>
    )
}