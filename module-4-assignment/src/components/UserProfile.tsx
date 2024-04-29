import { useEffect, useState } from 'react'

interface UserData {
    name: string
    email: string
}

const UserProfile = () => {
    const [userData, setUserData] = useState<UserData | null>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    'https://library-crud-sample.vercel.app/api/user/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
                        },
                    }
                )
                if (!response.ok) {
                    throw new Error('Failed to fetch user data')
                }
                const data = await response.json()
                setUserData(data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        fetchUserData()
    }, [])

    return (
        <div>
            {userData ? (
                <div className="flex flex-col">
                    <span className="text-sm">{userData.name}</span>
                    <span className="text-sm">{userData.email}</span>
                </div>
            ) : (
                <div className="flex flex-col gap-1">
     <p>null</p>
                </div>
            )}
        </div>
    )
}

export default UserProfile