import { SET_LOADING, SET_ERROR, GET_STARWARS, GET_PEOPLE } from './types'

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true }
    case SET_ERROR:
      return { ...state, alert: action.payload, isLoading: false }
    case GET_STARWARS:
      return { ...state, movies: action.payload, isLoading: false }
    case GET_PEOPLE:
      return { ...state, people: action.payload, isLoading: false }
    default:
      return state
  }
}
