import { GET_JOBS } from '../actions/types';


const INITIAL_STATE = {
    jobs: [],
    invitedJobs: []
};

const jobReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case GET_JOBS:
            return {
                ...state,
                jobs: action.payload.jobs,
                invitedJobs: action.payload.invitedJobs,
            };
        default: return state;

    }

};

export default jobReducer;