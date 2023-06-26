import React, { Component } from 'react';
import './style.css';
import codeImg from './computer-code.jpg'
import code2 from './code2.jpg'
import designImg from './design.jpg'
import profilePicture from './profilePicture.png'

class Home extends Component {
  render() {
    return (
      <>
        <div class="container-fluid">
          <div class="row-multi-main">
            <div class="col-main">
              <h1>Name Namer</h1>
              <hr></hr>
              <p class='info-border'>Web Developer</p>  
            </div>
            <div class="col-main"> 
              <img src={profilePicture} alt="Portrait"></img>
            </div>
          </div>
          <div class="row-full-clear"> 
            <p class='border-note'>MAY 2023</p>
            <p class='border-note'>PORTFOLIO</p>
            <p class='text'>
              Immersive text for better tomorrow<br></br>
              The developer of developing development
            </p>
          </div>
          <div class="row-multi">
            <a class="col" href='https://github.com/'>
                <h2>Github</h2>
                <hr></hr>
                <hr></hr>
                <p>Github link</p>
            </a>
            <div class="col col-c-a">
              <h2>Projects</h2>
              <hr></hr>
              <p>• Python</p>
              <p>• PHP</p>
              <p>• React</p>
            </div>
            <div class="col col-c-b">
              <h2>Info</h2>
              <hr></hr>
              <p>This website created with</p>
              <p>React</p>
            </div>
          </div>
          <div class="row-multi">
            <div class="col-img">
              <img src={codeImg} alt='Img'></img>
            </div>
            <div class="col-img">
              <img  src={code2} alt='Img'></img>
            </div>
            <div class="col-img">
              <img src={designImg} alt='Img'></img>
            </div>
          </div>
          <div class="row-full-clear"> </div>
        </div>
      </>
    )
  }
}

export default Home;