import { createContext, useContext, useEffect, useState } from 'react'
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

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
			{children}
		</AuthContext.Provider>
	)
}

export {
	AuthContextProvider as default,
	useAuthContext,
}
