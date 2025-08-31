// App.jsx
import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import "./App.css";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */
Amplify.configure(outputs);
const client = generateClient({ authMode: "userPool" });

export default function App() {
  const [userprofiles, setUserProfiles] = useState([]);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    const { data: profiles } = await client.models.UserProfile.list();
    setUserProfiles(profiles);
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CloudSchool</h2>
        <nav>
          <ul>
            <li>🏠 Dashboard</li>
            <li>📚 Courses</li>
            <li>📝 Assignments</li>
            <li>📊 Progress</li>
            <li>⚙️ Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h1>
            Welcome back {user.name || "!"} 
          </h1>
          <button className="logout-btn" onClick={signOut}>
            Logout
          </button>
        </header>

        {/* Dashboard Cards */}
        <section className="dashboard-grid">
          <div className="card">
            <h3>Active Courses</h3>
            <p>3 ongoing courses</p>
            <button className="view-btn">View Courses</button>
          </div>

          <div className="card">
            <h3>Assignments</h3>
            <p>2 due this week</p>
            <button className="view-btn">Check Assignments</button>
          </div>

          <div className="card">
            <h3>Progress</h3>
            <p>75% completed</p>
            <button className="view-btn">View Progress</button>
          </div>
        </section>

        {/* Course Highlights */}
        <section className="course-highlights">
          <h2>Course Highlights</h2>
          <div className="highlight-grid">
            <div className="highlight">
              <h4>Cloud Computing 101</h4>
              <p>Next lecture: Tomorrow 10AM</p>
            </div>
            <div className="highlight">
              <h4>Serverless with AWS</h4>
              <p>Assignment due: Friday</p>
            </div>
            <div className="highlight">
              <h4>DevOps Basics</h4>
              <p>Quiz opens: Saturday</p>
            </div>
          </div>
        </section>

        {/* Profiles (from Amplify DB) */}
        {userprofiles.length > 0 && (
          <section className="profiles-section">
            <h2>Registered Profiles</h2>
            <div className="profiles-grid">
              {userprofiles.map((profile) => (
                <div className="profile-card" key={profile.id}>
                  <h4>{profile.email}</h4>
                  <p>Owner: {profile.profileOwner || "N/A"}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
