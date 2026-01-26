import {    
    React, 
    useEffect,
    useState
    } from "react"

export function HomePage() {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile');
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [])
  return (
    <>
        {
        profile != null ? <h2>Welcome back, {profile.name}!</h2>
        : <h2>Welcome to billullo! <br/>Please Set up your profile.</h2>
        }
    </>
  )
}
