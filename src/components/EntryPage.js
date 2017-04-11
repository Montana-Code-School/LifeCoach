import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

export default class EntryPage extends React.Component {

  render() {
    return(
      <div className="entry-page">
        <div style={{width: "100vw", position: "relative", display:'flex', flexWrap:'wrap', justifyContent:'space-around', background:"#F9A603"}}>
          <span><h1 className="lifecoach">Life&nbsp;Coach</h1></span>
          <Login/>
        </div>
        <div className="entry-pic">
                <div className="bodyText">
                  <div className="home-text">
                    <h1 className="entry-title"> Are you ready to realize your full potential?</h1>
                    <h2>We help you effortlessly assess and organize your life, all in one place.</h2>
                    <h2>Welcome to <span  style={{color: "#F9A603"}} className="branded">Life Coach™</span></h2>
                    <br/>
                     <div style= {{display: "flex", justifyContent: "space-around"}}>
                       <div className="entry-feature">
                         <h3 className="entry-title">Wheel Of Life Tool</h3>
                         <h4 className="blurb">Easily get a real picture of how you are doing in 8 essential life categories.</h4>
                         <i className="fa fa-pie-chart fa-4x icon1" aria-hidden="true"></i>
                       </div>
                       <div className="entry-feature">
                         <h3 className="entry-title">Organize Goals</h3>
                         <h4 className="blurb">Create and track your goals like never before.</h4>
                         <br/>
                         <i className="fa fa-heart fa-4x icon2" aria-hidden="true"></i>
                       </div>
                       <div className="entry-feature">
                         <h3 className="entry-title"><strong>Track Progress</strong></h3>
                         <h4 className="blurb">Amazing real-time feedback on your personal growth.</h4>
                         <i className="fa fa-database fa-4x icon3" aria-hidden="true"></i>
                       </div>
                     </div>
                  </div>
                </div>
            <SignUp/>
        </div>
      </div>
    );
  }
}
