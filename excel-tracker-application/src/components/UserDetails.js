import React, { Component } from 'react';
import './../styles/UserDetails.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Colors from '../assets/text/Colors.js';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Home/Header.js';
import dummyData from './../services/DummyData.js';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompetencyCard from './UserView/CompetencyCard';
import TLCard from './UserView/TLCard';
import UserServices from '../services/UserServices';
import AssignMentor from './Common/AssignMentor.js';
import DeleteStudent from './Common/DeleteStudent.js';





import {
  withRouter
} from 'react-router-dom'

import ACTIONS from '../redux/action'
import { connect } from 'react-redux';


class UserDetails extends Component {


  competencies = UserServices.getCompetencies().filter(competency => {
    return (competency);
  }).sort(function(a, b){
      if (a.domain > b.domain) {
        return 1;
      }
      return -1;

  })
 

  trackingLocations = UserServices.getTrackingLocations().filter(tl => {
    return (tl);
  })

  assign = event => {
    alert(event.target.text);
  };


  render() {

    return (
      <div>
        <Header handleLogout={() => this.handleLogout} pageName="Users"/>
        <div className="Users">
          <div className="UserDetails">
            <div className ="UD-header" style={{color:Colors.blue}}>
              {this.props.location.state.name}

            </div>
            <div className = "UD-body">
            {this.props.location.state.userType == "Student" &&
                    <AssignMentor/>
            }
            <DeleteStudent/>

              Role = {this.props.location.state.userType}
              {this.props.location.state.userType == "Student" &&
                <div>
                  <div className='udtc'>


                      <h1>Competencies</h1>
                      <h1>Tracking Locations</h1>
                      <div>
                          {this.competencies.map((competency, i) => {
                              return( <CompetencyCard 
                                        title={this.competencies[i].title} 
                                        domain={this.competencies[i].domain}
                                        subcategory={this.competencies[i].subcategory}
                                        difficulty={this.competencies[i].difficulty}
                                      />
                              ); 
                          })}
                      </div>
                      <div>
                          {this.trackingLocations.map((tl, i) => {
                              return( <TLCard 
                                        name= {this.trackingLocations[i].name}
                                        competencies= {this.trackingLocations[i].competencies}
                                        locationID= {this.trackingLocations[i].locationID}
                                        instructors= {this.trackingLocations[i].instructors}
                                        students= {this.trackingLocations[i].students}
                                      />
                              ); 
                          })}
                      </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
});
const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser : (currentUser) => dispatch(ACTIONS.setCurrentUser(currentUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetails));