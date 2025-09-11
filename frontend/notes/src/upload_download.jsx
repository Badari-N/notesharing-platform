import { useState, useEffect, useRef } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import "./upload_download.css";

export default function UploadDownload({ user }) {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch all uploaded notes from backend
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/files");
      const data = await res.json();
      setFileList(data);
    } catch (err) {
      console.error("Failed to fetch files", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Upload selected file to backend
  const handleUpload = async () => {
    if (!file) return alert("Select a file first.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploader", user.email);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const text = await res.text();
      alert(text);

      // Reset input and refresh list
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchFiles();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // Download a file from Firebase Storage
  const handleDownload = async (fileName) => {
    try {
      const storageRef = ref(storage, `shared/${fileName}`);
      const url = await getDownloadURL(storageRef);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  };

  return (
    <div className="handle-user-container">
      <h2>Upload a Note</h2>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="btn" onClick={handleUpload}>
        Upload
      </button>

      <h2>Available Notes</h2>
      {loading ? (
        <p>Loading files...</p>
      ) : fileList.length === 0 ? (
        <p>No notes uploaded yet.</p>
      ) : (
        <ul className="file-list">
          {fileList.map((f) => (
            <li key={f.name} className="file-item">
              <span className="file-name">{f.name}</span>
              <span className="file-uploader">Uploaded by: {f.uploader}</span>
              <button className="btn" onClick={() => handleDownload(f.name)}>
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
