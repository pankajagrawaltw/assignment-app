import { GET_JOBS } from './types';
import { getData } from './fetchActions';
export const getJobs = ({ from, to }) => async dispatch => {
    try {
        const data = await getData(`jobs?from_date=${from}&to_date=${to}`);
        dispatch({ type: GET_JOBS, payload: data })
    } catch (error) {
        console.log(error);
    }
}
export const applyJob = async (id, cb) => {
    try {
        const data = await getData(`jobs/apply/${id}`);
        cb(data)
    } catch (error) {
        console.log(error);
    }
}
export const declineJob = async (id, cb) => {
    try {
        const data = await getData(`jobs/decline/${id}`);
        cb(data)
    } catch (error) {
        console.log(error);
    }
}