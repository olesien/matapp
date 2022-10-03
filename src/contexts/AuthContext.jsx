import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import SyncLoader from "react-spinners/SyncLoader";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const AuthContext = createContext();

const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userEmail, setUserEmail] = useState(null)
    const [userPhotoURL, setUserPhotoURL] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true);

    const changeCurrentUser = async (user) => {
        let data = {};
        if (user) {
            //Get related docs
            // console.log(user);
            const ref = doc(db, "users", user.uid);
            const snapshot = await getDoc(ref);

            if (snapshot.exists()) {
                data = snapshot.data();
            } else {
                //Add the details to user object
            }
            setCurrentUser({ ...user, ...data });
        } else {
            setCurrentUser(false);
        }
        setInitialLoading(false);
    };

    const signup = async (email, password, photo) => {
        await createUserWithEmailAndPassword(auth, email, password);

        if (photo) {
            await setPhoto(photo);
        }

        await reloadUser();

        // make user document that is used for reference to photoURL
        const docRef = doc(db, "users", auth.currentUser.uid); // "users/23123123aw321323123kj1io1"
        await setDoc(docRef, {
            email,
            photoURL: auth.currentUser?.photoURL,
            admin: false,
        });
    };

    const reloadUser = async () => {
        await auth.currentUser.reload();
        setCurrentUser(auth.currentUser)
        setUserEmail(auth.currentUser.email)
        setUserPhotoURL(auth.currentUser.photoURL)
        changeCurrentUser(auth.currentUser);
        return true;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const setEmail = (email) => {
        return updateEmail(auth.currentUser, email)
    }

    const setPassword = (newPassword) => {
        return updatePassword(auth.currentUser, newPassword)
    }

    const setPhoto = async (photo) => {
        /**
         * @todo Om tid finns, se till så att den gamla profilbilden skrivs över i databasen när en ny profilbild laddas upp
         */
        let photoURL = auth.currentUser.photoURL;

        if (photo) {
            // create a reference to upload the file to
            const fileRef = ref(
                storage,
                `photos/${auth.currentUser.email}/${photo.name}`
            );

            // upload photo to fileRef
            const uploadResult = await uploadBytes(fileRef, photo);

            // get download url to uploaded file
            photoURL = await getDownloadURL(uploadResult.ref);
        }

        return updateProfile(auth.currentUser, {
            photoURL,
        });
    };

    useEffect(() => {
        // listen for changes in auth-state
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            setCurrentUser(user)
            setUserEmail(user?.email)
            setUserPhotoURL(user?.photoURL)

            changeCurrentUser(user);

            setInitialLoading(false)
        });

        return unsubscribe;
    }, []);

    const contextValues = {
        // here be everything the children needs/should be able to use
        currentUser,
        initialLoading,
        login,
        logout,
        signup,
        reloadUser,
        resetPassword,
        setEmail,
        setPassword,
        setPhoto,
        userEmail,
        userPhotoURL,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {initialLoading ? (
                <div id="initial-loader">
                    <SyncLoader />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export { AuthContextProvider as default, useAuthContext };
