export const FETCHING_API = 'FETCHING_API';
export const FETCHING_SUCCESS = 'FETCHING_SUCCESS';
export const FETCHING_FAILED = 'FETCHING_FAILED';
export const  Update_User_Stored = " Update_User_Stored"

// Action Creators
export const requestActions = () => ({
  type:FETCHING_API,
});

export const successAction = (data) => ({
  type: FETCHING_SUCCESS,
  payload: data,
});

export const failureAction = (error) => ({
  type: FETCHING_FAILED,
  payload: error,
});
export const updateUserStored = (user) => ({
  type: Update_User_Stored,
  payload: user,
});
