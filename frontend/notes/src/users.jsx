import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import HandleUser from "./upload_download";

export default function MyUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // ✅ only keep the fields you’ll actually use
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
        });
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
  <h1>Welcome, {user?.email}</h1>

  <HandleUser user={user} />

  <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "1rem" }}>
    <button
      style={{
        all: "unset",             // remove all inherited styles
        display: "inline-block",
        padding: "0.5rem 1rem",
        backgroundColor: "#4f46e5", // changed from purple to indigo
        color: "white",
        transition: "background-color 0.2s ease",
        margin: "0.2rem 0",
        fontSize: "0.9rem",
        borderRadius: "0.5rem",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
</div>


);

}

