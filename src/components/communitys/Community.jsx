import React from 'react'
import discord from '../../assets/socialmedia/discord.png'
import instagram from '../../assets/socialmedia/instagram.png'
import linkedin from '../../assets/socialmedia/linkedin.png'
import whatsapp from '../../assets/socialmedia/whatsapp.png'
import youtube from '../../assets/socialmedia/youtube.png'
import './Community.css'

const Community = () => {
  const communityLinks = {
    instagram: 'https://www.instagram.com/team_codecrew?igsh=cXc2ZXFpdGg1dXVv',
    linkedin: 'https://www.linkedin.com/company/team-codecrew',
    discord: 'https://discord.gg/P46k9GCjrq',
    whatsapp: 'https://chat.whatsapp.com/CQ4GTiD5DlZAY9BIAarnWw?mode=wwt',
    youtube: 'https://youtube.com/@codecrew-u7m?si=t6lxnqNtA9n7WbWc'
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='view-4'>
       <h1 className="commu maintext">JOIN OUR COMMUNITIES</h1>
        <div className="communitys">
          <div className="com1 glow-on-hover" onClick={() => handleSocialClick(communityLinks.instagram)}>
            <div className="comlogo">
                 <img src={instagram} alt="Instagram"/>
            </div>
            <h1>Instagram</h1>
          </div>
          <div className="com1 glow-on-hover" onClick={() => handleSocialClick(communityLinks.linkedin)}>
            <div className="comlogo">
                 <img src={linkedin} alt="LinkedIn"/>
            </div>
            <h1>LinkedIn</h1>
          </div>
          <div className="com1 glow-on-hover" onClick={() => handleSocialClick(communityLinks.discord)}>
            <div className="comlogo">
                 <img src={discord} alt="Discord"/>
            </div>
            <h1>Discord</h1>
          </div>
          <div className="com1 glow-on-hover" onClick={() => handleSocialClick(communityLinks.whatsapp)}>
            <div className="comlogo">
                 <img src={whatsapp} alt="WhatsApp"/>
            </div>
            <h1>WhatsApp</h1>
          </div>
          <div className="com1 glow-on-hover" onClick={() => handleSocialClick(communityLinks.youtube)}>
            <div className="comlogo">
                 <img src={youtube} alt="YouTube"/>
            </div>
            <h1>YouTube</h1>
          </div>
        </div>
    </div>
  )
}

export default Community
