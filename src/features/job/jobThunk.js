import customFetch from '../../utils/axios'
import { clearValues } from './jobSlice'
import { getAllJobs, hideLoading, showLoading } from '../AllJobs/AllJobsSlice'
import { logoutUser } from '../user/userSlice'
import authHeader from '../../utils/authHeader'

//AuthHeader - File Approach

//Edit Job
export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(
      `/jobs/${jobId}`,
      job,
      authHeader(thunkAPI)
    )
    thunkAPI.dispatch(clearValues()) //clear value after save edit
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

//Delete Jobs
export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const resp = await customFetch.delete(
      `/jobs/${jobId}`,
      authHeader(thunkAPI)
    )
    thunkAPI.dispatch(getAllJobs())
    return resp.data
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

//Create Job
export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job, authHeader(thunkAPI))
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    // basic setup
    // return thunkAPI.rejectWithValue(error.response.data.msg);
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
