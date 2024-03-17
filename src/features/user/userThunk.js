import customFetch from '../../utils/axios'
import { clearAllJobsState } from '../AllJobs/AllJobsSlice'
import { clearValues } from '../job/jobSlice'
import { logoutUser } from './userSlice'

//Clear Store
export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    //logout user
    thunkAPI.dispatch(logoutUser(message))
    // clear jobs value
    thunkAPI.dispatch(clearAllJobsState())
    //clear job input values
    thunkAPI.dispatch(clearValues())
  } catch (error) {
    // console.log(error);
    return Promise.reject()
  }
}
//Register User
export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

//login User
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

//Update User
export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user)
    return resp.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
