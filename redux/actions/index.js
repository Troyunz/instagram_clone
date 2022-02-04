import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { USER_STATE_CHANGED } from "../constants";

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