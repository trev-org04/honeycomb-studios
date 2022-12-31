
import logo from './static/logo.svg';
import menu from './static/menu.svg';
// import search from './static/search.svg';
import closeIcon from './static/closeIcon.png';
import phone from './static/phone.svg';
import profile from './static/profile.svg';
import facebook from './static/facebook.svg';
import instagram from './static/instagram.svg';
import React from 'react';
import firebaseVars from '../firebase';
import './products.css';
import ItemDisplay from './itemDisplay';

export default class Gallery extends React.Component {

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

    closeModal() {
      var modal = document.getElementById('modal');
      var opacity = document.getElementById('opacity');
      modal.style.display = 'none';
      opacity.style.display = 'none';
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
      var name = document.getElementById('modalFirstName').value;
      var phoneNumber = document.getElementById('modalPhoneNum').value;
      var posterName = document.getElementById('modalName').innerHTML;
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
      else if (name !== '' && phoneNumber !== '' && phoneNumber.length === 10) {
        try {
          error.innerHTML = 'Order placed! We will be in touch soon.';
          error.style.color = '#EFEAE0';
          error.style.display = 'table';
          const docRef = await firebaseVars.db.collection("orders").add({
            name: name,
            phoneNumber: phoneNumber,
            posterName: posterName,
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
        <div id='modal' className='modal'>
          <div className='modalHeader'>
            <img src={closeIcon} alt='' className='modalIcon' onClick={this.closeModal}></img>
          </div>
          <div className='modalContainer'>
            <div className='modalLeftContain desktop'>
              <img id='modalImg' className="modalPic" alt=""></img>
            </div>
            <div className='modalRightContain'>
              <div className='modalDataContain'>
                <div className='modalDataHeaderContain'>
                  <span id='modalName' className='modalName'>Title</span>
                  <span id='modalPrice' className='modalPrice'>$Money</span>
                </div>
                <p id='modalDesc' className='modalDesc'>The official Title poster by tree studios. This poster has dimensions of eleven inches by seventeen inches and is printed in color on high quality card stock paper.</p>
                <span className='orderHeader'>Order</span>
                <div className='modalInputBoxTop'>
                  <img src={profile} className='profile' alt=''></img>
                  <input id='modalFirstName' className='input' placeholder='Name' type='text'></input>
                </div>
                <div className='modalInputBox'>
                  <img src={phone} className='phone' alt=''></img>
                  <input id='modalPhoneNum' className='input' placeholder='Phone Number' type='text'></input>
                </div>
                <span id='error' className='error'>Please correctly complete the fields</span>
              </div>
              <button className='modalButton' onClick={this.submit}>order now</button>
            </div>
          </div>
        </div>
        <header className="header">
          <img src={menu} className='menu' alt='' onClick={this.openSidenav}></img>
          <img src={logo} className='logo' alt=''></img>
          {/* <div className='searchBox'>
            <img src={search} className='search' alt=''></img>
            <input className='box' placeholder='Search' type='text'></input>
          </div> */}
        </header>
        <div className='productContainer'>
          <span className='productHeader'>all products</span>
          <ItemDisplay id='products'></ItemDisplay>
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
