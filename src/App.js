import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import './App.css';
import DatePagination from './Components/DatePagination';
import InvitedJobs from './Components/InvitedJobs';
import JobList from './Components/JobList';
import { getJobs } from "./Redux/actions/job.actions"
class App extends React.Component {
  state = {
    dates: [{
      from: '2021-6-13',
      to: '2021-6-19'
    }, {
      from: '2021-6-20',
      to: '2021-6-27'
    }],
    current_index: 0
  }


  /**
   * called the get jobs api when component is mount
   */
  async componentDidMount() {
    const { dates } = this.state;
    this.props.getJobs({ from: dates[0].from, to: dates[0].to })
  }


  /**
   * Handle pagination 
   * @desc set current index of pagination dates and call get jobs api
   * @param {number} index 
   *  
   */
  handlePagination = index => {
    const { dates } = this.state;
    this.setState({ current_index: index });
    this.props.getJobs({ from: dates[index].from, to: dates[index].to })

  }


  render() {
    const { dates, current_index } = this.state;
    return (
      <Container fluid>
        <span className="title">Shifts</span>
        <p className="subtitle m-0 text-muted ">You've been invited</p>

        {/* list of invited jobs  */}
        <InvitedJobs />

        {/*  date pagination */}
        <DatePagination
          dates={dates}
          index={current_index}
          onChange={this.handlePagination}
        />
        {/* list of jobs */}
        <JobList />

      </Container>
    )
  }
}
export default connect(null, { getJobs })(App)
