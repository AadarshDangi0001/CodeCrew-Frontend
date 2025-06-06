import React from 'react'
import discord from '../../assets/socialmedia/discord.png'
import instagram from '../../assets/socialmedia/instagram.png'
import linkedin from '../../assets/socialmedia/linkedin.png'
import whatsapp from '../../assets/socialmedia/whatsapp.png'
import youtube from '../../assets/socialmedia/youtube.png'
import './Community.css'

const Community = () => {
  return (
    <div className='view-4'>
       <h1 className="commu text-6xl">JOIN OUR COMMUNITIES</h1>
        <div className="communitys">
          <div className="com1 glow-on-hover">
            <div className="comlogo">
                 <img src={instagram} alt="Instagram"/>
            </div>
            <h1>Instagram</h1>
          </div>
          <div className="com1 glow-on-hover">
            <div className="comlogo">
                 <img src={linkedin} alt="LinkedIn"/>
            </div>
            <h1>LinkedIn</h1>
          </div>
          <div className="com1 glow-on-hover">
            <div className="comlogo">
                 <img src={discord} alt="Discord"/>
            </div>
            <h1>Discord</h1>
          </div>
          <div className="com1 glow-on-hover">
            <div className="comlogo">
                 <img src={whatsapp} alt="WhatsApp"/>
            </div>
            <h1>WhatsApp</h1>
          </div>
          <div className="com1 glow-on-hover">
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
