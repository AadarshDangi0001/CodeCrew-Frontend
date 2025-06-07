import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  const profileImg =
    user?.profileImg ||
    'https://ui-avatars.com/api/?name=' +
      encodeURIComponent(user?.name || user?.username || 'User') +
      '&background=18181b&color=fff&size=128';

  const details = user?.details || {
    mobileNumber: user?.mobileNumber || 'Not set',
    techStack: user?.techStack || 'Not set',
    college: user?.college || 'Not set',
    branch: user?.branch || 'Not set',
    cityState: user?.cityState || 'Not set',
    linkedin: user?.linkedin || '',
    github: user?.github || '',
    codingPlatform: user?.codingPlatform || '',
  };

  return (
    <div className="min-h-screen mt-20 bg-black flex flex-col items-center p-[5vw]">
      <div className="w-full max-w-4xl bg-[#18181b] rounded-xl shadow-lg flex flex-col gap-8" style={{paddingLeft: "5vw", paddingRight: "5vw"}}>
        {/* Section 1: Profile Image and Name */}
        <div className="flex  gap-10 items-center py-10">
          <img
            src={profileImg}
            alt="Profile"
            className="w-25 h-25 rounded-full border-4 border-white shadow object-cover mb-4"
          />
          <h2 className="text-3xl font-bold text-white">{user?.name || user?.username || 'User'}</h2>
        </div>
        {/* Section 2: Details in 2-column grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 px-2">
          <ProfileField label="Mobile Number" value={details.mobileNumber} />
          <ProfileField label="Tech Stack" value={details.techStack} />
          <ProfileField label="College" value={details.college} />
          <ProfileField label="Branch" value={details.branch} />
          <ProfileField label="City & State" value={details.cityState} />
          <ProfileField
            label="LinkedIn"
            value={
              details.linkedin ? (
                <a
                  href={details.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {details.linkedin}
                </a>
              ) : (
                'Not set'
              )
            }
          />
          <ProfileField
            label="GitHub"
            value={
              details.github ? (
                <a
                  href={details.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {details.github}
                </a>
              ) : (
                'Not set'
              )
            }
          />
          <ProfileField label="Coding Platform ID" value={details.codingPlatform || 'Not set'} />
        </div>
        {/* Section 3: Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full px-2 pb-8">
          <button
            className="flex-1 bg-white text-black font-bold py-2 rounded hover:bg-zinc-200 transition"
            onClick={() => navigate('/update-profile')}
          >
            Update Details
          </button>
          <button
            className="flex-1 bg-black text-white font-bold py-2 rounded hover:bg-red-700 transition"
            onClick={logout}
          >
            Logout
          </button>
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

export default Profile;