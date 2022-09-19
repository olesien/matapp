import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { auth } from '../firebase'
import SyncLoader from 'react-spinners/SyncLoader'

const AuthContext = createContext()

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        // listen for changes in auth-state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setInitialLoading(false)
        })

        return unsubscribe
    }, [])

    const contextValues = {
        // here be everything the children needs/should be able to use
        currentUser,
        login,
        logout,
        signup,
    }

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
    )
}

export {
    AuthContextProvider as default,
    useAuthContext,
}
