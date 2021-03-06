import React, { Component } from 'react';

import {
  withRouter
} from 'react-router-dom'
import ACTIONS from '../../redux/action'
import { connect } from 'react-redux';
import Header from './../Home/Header.js';
import EvaluationForm from './EvaluationForm.js';
import EvaluationServices from './../../services/EvaluationServices.js';
import HistoryList from './HistoryList.js'
import CompetencyServices from './../../services/CompetencyServices.js';
import UserServices from './../../services/UserServices.js';
import './../../styles/Evaluations.css';


class Evaluations extends Component {

  student = UserServices.getUserByID(this.props.location.state.studentId);
  history = EvaluationServices.getHistoryforUserComp(this.props.location.state.studentId, this.props.location.state.competencyId)
  competency = CompetencyServices.getCompetencyById(this.props.location.state.competencyId)
  render() {
    console.log(this.props)

      return (
        
        <div>
          <Header handleLogout={() => this.handleLogout} pageName="Evaluations"/>
          <div>
            <h2>Evaluations for <b>{this.student.name}</b> on the competency <b>{this.competency.title}</b></h2>
          </div>
          <EvaluationForm onSubmit={e => { e.preventDefault(); }}
            eval4 = "4: Student consistently performs this skill independently and in proper settings. They understand this concept without further assistance or explanation required. Student is aware of the importance of this competency."
            eval3 = "3: Student is able to perform this skill or can do most of the skill with some basic prompting or reminders from others."
            eval2 = "2: Student attempts to perform this skill independently, but requires assistance, support or reminders from others to execute accurately. Student is unlikely to perform this skill without assistance from others. "
            eval1 = "1: Student requires support from start to finish of the skill. Student does not understand the skill or why it is necessary. A student earns a 1 instead of a 0 in this category if they continue to attempt this skill with help from others."
            eval0 = "0: Student is completely unwilling to learn this skill. Student expresses no interest in performing even with supports. Or, student does not have the opportunity to perform this skill (ex. Driving a car, paying 100% of expenses to live independently, or physical limitations prohibit somebody from cooking or working out properly)."
          />
          <div id="prevEval"><h4>Previous Evaluations:</h4></div>
          <HistoryList history = {this.history}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Evaluations));
