import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./create-form.css"


interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const schema = yup.object().shape({
        title: yup.string().required("You must add title..."),
        description: yup.string().required("Enter description about post...")
    })
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const postRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postRef, {
            ...data,
            user: user?.displayName,
            userId: user?.uid

        })
        alert("poost created")
        navigate("/")
    }
    return (
        <div className="form">
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input type="text" placeholder="title..." {...register("title")} />
                <p style={{ color: "red" }} >{errors.title?.message} </p>
                <textarea rows={10} placeholder="description...." {...register("description")} />
                <p style={{ color: "red" }}>{errors.description?.message}</p>
                {/* <input className="button" type="submit" value="Create Post" /> */}
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}