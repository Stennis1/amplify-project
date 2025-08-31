import { useState, useEffect } from "react";
import {
  Button,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
  Text,
  Image,
} from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";

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

  // Dummy activity posts
  const dummyActivity = [
    { id: 1, action: "Created a new property listing", time: "2 hours ago" },
    { id: 2, action: "Updated profile information", time: "1 day ago" },
    { id: 3, action: "Commented on a property", time: "3 days ago" },
  ];

  return (
    <Flex
      className="App"
      direction="column"
      alignItems="center"
      gap="2rem"
      width="90%"
      margin="0 auto"
    >
      {/* Welcome Section */}
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        padding="1rem 0"
      >
        <Flex direction="row" alignItems="center" gap="1rem">
          <Image
            src={`https://ui-avatars.com/api/?name=${user?.username || "User"}&background=random`}
            alt="Profile Picture"
            borderRadius="50%"
            width="70px"
            height="70px"
          />
          <Heading level={1}>Welcome, {user?.username || "User"}!</Heading>
        </Flex>
        <Button onClick={signOut} variation="warning">
          Sign Out
        </Button>
      </Flex>

      <Text style={{ fontSize: "1.2rem", color: "#ccc" }}>
        Here's your profile dashboard. Manage your info and check recent activity.
      </Text>

      <Divider margin="1rem 0" width="100%" />

      {/* Profile Cards */}
      <Grid
        margin="2rem 0"
        gap="2rem"
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        width="100%"
      >
        {userprofiles.map((profile) => (
          <Flex
            key={profile.id || profile.email}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            padding="2rem"
            border="1px solid #555"
            borderRadius="12px"
            backgroundColor="rgba(255,255,255,0.05)"
            boxShadow="0 6px 12px rgba(0,0,0,0.3)"
            gap="1rem"
            className="profile-card"
          >
            <Flex direction="row" alignItems="center" gap="1rem">
              <Image
                src={`https://ui-avatars.com/api/?name=${profile.email}&background=random`}
                alt="Profile Pic"
                width="50px"
                height="50px"
                borderRadius="50%"
              />
              <Heading level={3}>{profile.email}</Heading>
            </Flex>
            <Text>Email: {profile.email}</Text>
            <Text>Profile Owner: {profile.profileOwner || "N/A"}</Text>
            <Text>Properties Listed: {Math.floor(Math.random() * 10)}</Text>

            <Flex gap="1rem" marginTop="1rem">
              <Button variation="primary">Edit Profile</Button>
              <Button variation="link" onClick={() => alert("Change Password flow")}>
                Change Password
              </Button>
            </Flex>
          </Flex>
        ))}
      </Grid>

      {/* Recent Activity Feed */}
      <Flex
        direction="column"
        width="100%"
        backgroundColor="rgba(255,255,255,0.05)"
        padding="1.5rem"
        borderRadius="12px"
        gap="1rem"
      >
        <Heading level={2}>Recent Activity</Heading>
        {dummyActivity.map((act) => (
          <Flex
            key={act.id}
            direction="row"
            justifyContent="space-between"
            padding="0.8rem"
            borderBottom="1px solid #444"
            alignItems="center"
          >
            <Text>{act.action}</Text>
            <Text color="#888" fontSize="0.85rem">{act.time}</Text>
          </Flex>
        ))}
        {dummyActivity.length === 0 && (
          <Text color="#888">No recent activity to show. Start exploring!</Text>
        )}
      </Flex>
    </Flex>
  );
}
