import React, { useState, useEffect } from "react";
import "./profile.css"

const baseURL = "http://localhost:5000/api/";

type profileDatatype = {
    displayName: string,
    profileUrl: string,
    bio: string
}
      
const Profile = () => {
    // const [isLogedIn, setIsLogedin] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErroMessage] = useState("");
    const [profile, setProfile] = useState<profileDatatype | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await fetch(`${baseURL}profile`, {
                    method: 'GET',
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to load profile");
                }
                const data = await response.json();
                setProfile(data.profile);
            } catch (err) {
                setErroMessage("Oops  Could not load profile.please try again");
                if (err instanceof Error) console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        loadProfile();
    }, []);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setProfile((prev) => prev ? { ...prev, [name]: value } : prev);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!profile) return;
        setIsSaving(true);
        setErroMessage("");
        try {
            const response = await fetch(`${baseURL}profile`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(profile),
            });
            if (!response.ok) {
                throw new Error("Failed to update");
            }
            const data = await response.json();
            setProfile(data.profile);
        } catch (err) {
            setErroMessage("Could not save your changes. Please try again.");
            console.error(err)
        } finally {
            setIsSaving(false);
        }
    }
    if (isLoading) {
        return (<p className="loading">loading profile....</p>)
    }
    if (!profile) {
        return <p>{errorMessage || "something went wrong"}</p>
    }
    return (
        <div className="profile-container">
            <form onSubmit={handleSubmit} className="profileForm">
                <img src={profile.profileUrl} alt="Profile avatar" className="profileAvatar" />
                <input
                    type="file"
                    name="profileUrl"
                    value={profile.profileUrl}
                    onChange={handleChange}
                />
                <button className="editProfile" type="submit" disabled={isSaving} ><h2>Edit profile</h2></button>
                <div>
                    <div className="input-container">
                        <input
                            type="text"
                            name="displayName"
                            value={profile.displayName}
                            onChange={handleChange}
                        />
                        <div className="labeline"> Display Name</div>
                    </div>
                </div>
                <div className="input-container">
                    <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        rows={4}
                    />
                    <div className="labeline">About</div>
                </div>

                {errorMessage && <p className="profile-error">{errorMessage}</p>}

            </form>
        </div>

    )
}
export default Profile;