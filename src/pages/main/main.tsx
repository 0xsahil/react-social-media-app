import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { Post } from "./post";

export interface PostFormat {
    id: string;
    userId: string;
    title: string;
    user: string;
    description: string;
}

export const Main = () => {
    const [postList, setPostList] = useState<PostFormat[] | null>(null);
    const postRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostFormat[]
        );
    };
    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div>
            {postList?.map((post) => <Post post={post} />)}
        </div>
    )
}