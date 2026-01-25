import { useEffect } from "react"

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
        <h1>Welcome to Billullo</h1>
    </>
  )
}
