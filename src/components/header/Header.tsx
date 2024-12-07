import React, { useState } from 'react';
import './Header.css'

 interface HeaderProps{
    userName:string;
}
const Header:React.FC<HeaderProps> = ({userName})=>{

return(
    <>
    <div className="header">
  <a href="#default" className="logo">Logo</a>
  <div className="header-right">
    <label style={{padding:"10px", marginLeft:"30px"}}>{userName}</label>
    <button style={{padding:"10px", marginLeft:"30px"}}>Logout</button>
  </div>
</div>
</>
)
}
 export default Header;