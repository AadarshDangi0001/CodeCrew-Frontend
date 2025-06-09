import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../utils/api'; // You need to implement this API call

const ViewProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(id).then(res => {
      if (res.success) {
        setProfile(res.data);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }
  if (!profile) {
    return <div className="text-white text-center mt-20">User not found.</div>;
  }

  const displayImg =
    profile.profileImg ||
    'https://ui-avatars.com/api/?name=' +
      encodeURIComponent(profile.name || profile.username || 'User') +
      '&background=18181b&color=fff&size=128';

  return (
    <div className="min-h-screen mt-20 bg-black flex flex-col items-center p-[5vw]">
      <div className="w-full max-w-4xl bg-[#18181b] rounded-xl shadow-lg flex flex-col gap-8 pb-10" style={{paddingLeft: "5vw", paddingRight: "5vw"}}>
        {/* Section 1: Profile Image and Name */}
        <div className="flex  gap-10 items-center py-10">
          <img
            src={displayImg}
            alt="Profile"
            className="w-25 h-25 rounded-full border-4 border-white shadow object-cover mb-4"
          />
          <div>
            <h2 className="text-3xl font-bold text-white">{profile.name || profile.username || 'User'}</h2>
            <div className="text-zinc-400 font-semibold mt-2">Role: {profile.role}</div>
          </div>
        </div>
        {/* Section 2: Details in 2-column grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 px-2">
          <ProfileField label="Email" value={profile.email} />
          <ProfileField label="Mobile Number" value={profile.mobileNumber || 'Not set'} />
          <ProfileField label="Tech Stack" value={profile.techStack || 'Not set'} />
          <ProfileField label="College" value={profile.college || 'Not set'} />
          <ProfileField label="Branch" value={profile.branch || 'Not set'} />
          <ProfileField label="City & State" value={profile.cityState || 'Not set'} />
          <ProfileField
            label="LinkedIn"
            value={
              profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {profile.linkedin}
                </a>
              ) : (
                'Not set'
              )
            }
          />
          <ProfileField
            label="GitHub"
            value={
              profile.github ? (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {profile.github}
                </a>
              ) : (
                'Not set'
              )
            }
          />
          <ProfileField label="Coding Platform ID" value={profile.codingPlatform || 'Not set'} />
          <ProfileField label="Message" value={profile.message || 'Not set'} />
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-zinc-400 font-semibold">{label}:</span>
    <span className="text-white break-all">{value}</span>
  </div>
);

export default ViewProfile;