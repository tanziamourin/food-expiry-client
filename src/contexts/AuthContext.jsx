import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  JWT fetch and set to cookie
  const getJWT = async (email) => {
    try {
      const res = await fetch("https://food-expiry-server.vercel.app/jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to set JWT token");
      }

      console.log(" JWT token set in cookie");
      return true;
    } catch (error) {
      console.error("Error getting JWT:", error.message);
    }
  };

  //  Create User
  const createUser = async (email, password, name, photo) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    await refreshUser();
    await getJWT(email);
    setLoading(false);
    return userCredential;
  };

  //  Email/Password Login
  const login = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await getJWT(email);
    setLoading(false);
    return userCredential;
  };

  //  Google Login
  const googleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await getJWT(result.user.email);
    setLoading(false);
    return result;
  };

  //  GitHub Login
  const githubLogin = async () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await getJWT(result.user.email);
    return result;
  };

  //  Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      setUser(null);
      setLoading(false);
    });
  };

  //  Update Firebase profile
  const updateUserProfile = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      await refreshUser();
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  //  Refresh Current User
  const refreshUser = async () => {
    const currentUser = auth.currentUser;
    await currentUser?.reload();
    setUser(auth.currentUser);
  };

  //  Check on page load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        createUser,
        login,
        googleLogin,
        githubLogin,
        logout,
        refreshUser,
        updateUserProfile,
        getJWT,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
