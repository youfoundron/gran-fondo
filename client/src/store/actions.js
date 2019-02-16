/*
 * action types
 */
export const actionTypes = {
  LOGIN_USER: 'LOGIN_USER'
}

/*
 * action creators
 */
export const actionCreators = {
  loginUser: () => {
    return { type: actionTypes.LOGIN_USER }
  }
}

