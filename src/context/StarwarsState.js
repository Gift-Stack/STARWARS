import { useReducer } from 'react'
import StarwarsContext from './starwarsContext'
import StarwarsReducer from './starwarsReducer'
import { SET_LOADING, GET_STARWARS, GET_PEOPLE, SET_ERROR } from './types'
import axios from 'axios'

const StarwarsState = ({ children }) => {
  const initialState = {
    isLoading: false,
    movies: {},
    people: [],
    alert: {}
  }

  const [state, dispatch] = useReducer(StarwarsReducer, initialState)

  // Set Loading to true
  const setLoading = () => dispatch({ type: SET_LOADING })

  // Get movies
  const getAllMovies = async () => {
    try {
      const res = await axios('https://swapi.dev/api/films/')
      const data = await res.data

      dispatch({ type: GET_STARWARS, payload: data })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: { message: error.message, type: 'error' }
      })
    }
  }

  // Get all movies characters
  const getPeople = async () => {
    setLoading()
    try {
      let res = await axios('https://swapi.dev/api/people/')
      let data = await res.data
      let people = await data.results
      while (data['next'] !== null) {
        try {
          res = await axios(data['next'])
          data = await res.data
          people = [...people, ...data.results]
        } catch (error) {
          dispatch({
            type: SET_ERROR,
            payload: { message: error.message, type: 'error' }
          })
        }
      }
      dispatch({ type: GET_PEOPLE, payload: people })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: { message: error.message, type: 'error' }
      })
    }
  }

  return (
    <StarwarsContext.Provider
      value={{
        isLoading: state.isLoading,
        alert: state.alert,
        movies: state.movies,
        people: state.people,
        getAllMovies,
        getPeople
      }}
    >
      {children}
    </StarwarsContext.Provider>
  )
}

export default StarwarsState
