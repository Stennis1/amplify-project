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
            <p>10,000 due this week only from Promise and William!</p>
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
              <h4>AWS Amplify, AppSync, DynamoDB</h4>
              <p><strong>Cloud Connect: </strong>Tomorrow 8AM</p>
            </div>
            <div className="highlight">
              <h4>DEI In The Workplace</h4>
              <p><strong>Career Sessions: </strong>  
                Every Mondays and Wednesdays at 8: 30AM</p>
            </div>
            <div className="highlight">
              <h4>AWS High Level Architecture Solution In Cloud</h4>
              <p>Available on Thinkific: Monday</p>
            </div>
          </div>
        </section>

        {/* Activity Cards */}
        <div className="activity-header">
          <h2>Extra Curriculum Activities</h2>
        </div>
        <section className="dashboard-grid">
          <div className="card">
            <h3>Career Workshops</h3>
            <p><strong>Tasks:</strong> Resume Submission, Application Tracker</p>
            <button className="view-btn">View Tasks</button>
          </div>

          <div className="card">
            <h3>Mentor Check-Ins</h3>
            <p>2 due this month</p>
            <p><strong><a href=
              "https://outlook.office.com/book/G681a4ec1a0b9428488fb5af0697afc61@azubiafrica.org/?ismsaljsauthenabled=true"
               noreferrer target="_blank">1-on-1-BOOKING-GEN</a></strong></p>
            <button className="success-btn">View Calendar</button>
          </div>

          <div className="card">
            <h3>Student Dashboard</h3>
            <strong><a href="https://learnerportal.generation.org/" target="_blank">
            View Your Performance</a></strong>
            <p>65% completed</p>
            <button className="success-btn">Enter Portal</button>
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
                  <p>User ID: {profile.profileOwner || "No Owner"}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
