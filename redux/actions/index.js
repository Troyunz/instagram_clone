import { doc, getDoc, getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { USER_STATE_CHANGED, USER_POSTS_STATE_CHANGED } from "../constants";

export function fetchUser() {
    return (async (dispatch) => {
        const db = getFirestore();
        const auth = getAuth();
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            dispatch({type: USER_STATE_CHANGED, currentUser: docSnap.data()})
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    })
}

export function fetchUserPosts() {
    return (async (dispatch) => {
        const db = getFirestore();
        const auth = getAuth();
        const docRef = collection(db, "posts", auth.currentUser.uid, "userPosts");
        const docSnap = await getDocs(docRef);
        let posts = docSnap.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data }
        });
        // console.log(posts);
        dispatch({type: USER_POSTS_STATE_CHANGED, posts})
    })
}