import "./post.css"
import { PostFormat } from "./main"
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: PostFormat;
}
interface Like {
    likeId: string;
    userId: string;
}


export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
        // setLike(data.docs.length);
    }

    const addLike = async () => {
        try {

            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post?.id
            });
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }] : [{ userId: user?.uid, likeId: newDoc.id }]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const removeLike = async () => {
        try {
            const likesToDeleteQuery = query(likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            );
            const likeToDeleteData = await getDocs(likesToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const userLiked = likes?.find((like) => like.userId === user?.uid);


    useEffect(() => {
        getLikes();
    }, [])





    return (
        <div className="post">

            <div className="title">
                <h2>{post.title} </h2>
            </div>

            <div className="description">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>by <b><i>{post.user}</i></b>  </p>
                <button onClick={userLiked ? removeLike : addLike}>
                    {userLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {likes && <p> {likes.length} likes </p>}
            </div>

        </div>
    )
}