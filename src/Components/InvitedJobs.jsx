import React, { Component } from 'react'
import { connect } from 'react-redux'
import Job from './Job'

class InvitedJobs extends Component {

    /** @constructor */
    constructor(props) {
        super(props);
        this.state = {
            jobs: props.jobs
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.jobs !== prevState.jobs) {
            return ({ jobs: nextProps.jobs }) // <- this is setState equivalent
        }
        return null
    }
    render() {
        return (
            <div className="invited-jobs">
                {
                    this.state.jobs.map((job, i) => <Job key={i} job={job} />)
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    jobs: state.jobs.invitedJobs

})
export default connect(mapStateToProps, {})(InvitedJobs)
