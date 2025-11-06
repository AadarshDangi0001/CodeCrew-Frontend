import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Midsection.css'
import ProfileCard from '../AdCard/ProfileCard'

const Midesection = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="view-3">
        <div className="view-3-left">
          <h1>IF YOU ARE INTERESTED</h1>
          <div className="button-1">
            <nav>
              <ul>
                <li className="btnHome" onClick={() => navigate('/joincrew')}>
                  JOIN CREW NOW
                  <span></span><span></span><span></span><span></span>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="view-3-right">
         
            <ProfileCard
              name="Code Crew"
              title="Developer Community"
              handle="aadarshdangi0001"
              status="Active"
              contactText="Join Us"
              avatarUrl="/Avatar2.png"
              miniAvatarUrl="/Avatar.jpeg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => navigate('/joincrew')}
            />
         
        </div>
      </div>
    </div>
  )
}

export default Midesection
