import logo from './static/logo.svg';
import menu from './static/menu.svg';
import closeIcon from './static/closeIcon.png';
import phone from './static/phone.svg';
import profile from './static/profile.svg';
import message from './static/message.svg';
import instagram from './static/instagram.svg';
import facebook from './static/facebook.svg';
import React from 'react';
import firebaseVars from '../firebase';
import './contact.css';

export default class Contact extends React.Component {

    disableTools() {
        document.onkeydown = function (e) {
          if (e.keyCode === 123) {
            return false;
          }
          if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
            return false;
          }
          if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
            return false;
          }
          if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
            return false;
          }
          if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
            return false;
          }
        }
    };

    openSidenav( ){
      var sidenav = document.getElementById('sidenav');
      var opacity = document.getElementById('opacity');
      sidenav.style.width = '250px';
      sidenav.style.padding = '35px';
      opacity.style.display = 'block';
    };

    closeSidenav() {
      var sidenav = document.getElementById('sidenav');
      var opacity = document.getElementById('opacity');
      sidenav.style.width = '0px';
      sidenav.style.padding = '0px';
      opacity.style.display = 'none';
    };

    async submit(e) {
      var name = document.getElementById('firstName').value;
      var phoneNumber = document.getElementById('phoneNum').value;
      var message = document.getElementById('message').value;
      var error = document.getElementById('error');
      if (name === '') {
        error.innerHTML = 'Please enter your name.';
        error.style.color = '#FF6E6E';
        error.style.display = 'table';
      }
      else if (phoneNumber === '' || phoneNumber.length !== 10) {
        error.innerHTML = 'Please enter a valid phone number.';
        error.style.color = '#FF6E6E';
        error.style.display = 'table';
      }
      else if (message === '') {
        error.innerHTML = 'Please enter a message.';
        error.style.color = '#FF6E6E';
        error.style.display = 'table';
      }
      else if (name !== '' && phoneNumber !== '' && phoneNumber.length === 10 && message !== '') {
        try {
          error.innerHTML = 'Your message has been sent! We will be in touch soon.';
          error.style.color = '#EFEAE0';
          error.style.display = 'table';
          const docRef = await firebaseVars.db.collection("contact").add({
            name: name,
            phoneNumber: phoneNumber,
            message: message,
            dateTime: new Date(),
          });
          return docRef;
        }
        catch (e) {
          error.innerHTML = 'An unexpected error occurred. Please try again later.';
          error.style.color = '#EFEAE0';
          error.style.display = 'table';
        }
      }
    };

    openInNewTab(url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    componentDidMount() {
      this.disableTools();
    };

  render() {
    return (
      <>
        <div id='opacity' className='opacity'></div>
        <div id="sidenav" className="sidenav">
          <img src={logo} className='sidenavLogo' alt=''></img>
          <div className='closeContain'>
            <img src={closeIcon} alt='' className='sidenavIcon' onClick={this.closeSidenav}></img>
          </div>
          <div className='linkContain'>
            <a className='link' href="/">home</a>
            <a className='link' href="/products">products</a>
            {/* <a className='link' href="/about">about</a> */}
            <a className='link' href="/contact">contact</a>
          </div>
        </div>
        <header className="header">
          <img src={menu} className='menu' alt='' onClick={this.openSidenav}></img>
          <img src={logo} className='logo' alt=''></img>
          {/* <div className='searchBox'>
            <img src={search} className='search' alt=''></img>
            <input onChange={this.search} className='box' placeholder='Search' type='text'></input>
          </div> */}
        </header>
        <div className='contactContain'>
          <span className='contactHeader'>contact us</span>
          <div className='inputBoxTop'>
                <img src={profile} className='contactProfile' alt=''></img>
                <input id='firstName' className='contactInput' placeholder='Name' type='text'></input>
          </div>
          <div className='inputBox'>
                <img src={phone} className='contactPhone' alt=''></img>
                <input id='phoneNum' className='contactInput' placeholder='Phone Number' type='text'></input>
          </div>
          <div className='inputBox'>
                <img src={message} className='contactMessage' alt=''></img>
                <textarea id='message' className='contactInput textArea' placeholder='Message' rows="4" cols="50"></textarea>
          </div>
          <span id='error' className='error'>Please correctly complete the fields</span>
          <button className='contactButton' onClick={this.submit}>submit</button>
        </div>
        <div className="sitemap">
        <div className='sitemapImageContain'>
            <img src={instagram} onClick={() => this.openInNewTab('https://www.instagram.com/treestudios_/')} className='sitemapImg' alt=''></img>
            <img src={facebook} onClick={() => this.openInNewTab('https://www.facebook.com/people/tree-studios/100088906634543/')} className='sitemapImg' alt=''></img>
          </div>
          <span className='sitemapText'>© 2022 tree studios. All Rights Reserved.</span>
        </div>
      </>
    );
  }
};
