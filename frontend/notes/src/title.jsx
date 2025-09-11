

import './title.css'
export default function MyTitle(){

    return(
        <div className="landing-container">
  <h1 className="landing-title">Welcome to Not<span className="accent">Ex</span></h1>
  <h2 className="landing-subtitle">Please login to access your notes and files securely</h2>
  <a href="/login" className="btn primary-btn">Login</a>
  <a href="/register" className="btn secondary-btn">Register</a>
    </div>
        
)



}