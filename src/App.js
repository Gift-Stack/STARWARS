import { useState, useContext, useEffect } from 'react'
import { ReactComponent as StarWars } from './assets/star-wars.svg'
import { ReactComponent as Loader } from './assets/loading.svg'
import { ReactComponent as ResetButton } from './assets/reset.svg'
import StarwarsContext from './context/starwarsContext'
import Table from './components/table/Table'
import { diff } from './utils'

// Style
import { SelectWrapper } from './style'
// Required dependencies
import TransitionAlert from './components/alert/Alert'
import FilterByGender from './components/filter'

function getStyles(name, seasonName) {
  return {
    display: 'flex',
    height: 40,
    justifyContent: 'flex-start',
    padding: '0 40px',
    fontWeight: seasonName.indexOf(name) === -1 ? 400 : 500
  }
}

function App() {
  const { isLoading, alert, movies, people, getAllMovies, getPeople } =
    useContext(StarwarsContext)
  const [seasonName, setSeasonName] = useState('')
  const [selectedSeason, setSelectedSeason] = useState({})
  const [names, setNames] = useState([])
  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [filter, setFilter] = useState('')
  const [genders, setGenders] = useState([])

  // eslint-disable-next-line
  useEffect(() => getAllMovies(), [])
  useEffect(() => {
    setNames(movies?.results?.map((result) => result?.title))
  }, [movies])
  useEffect(
    () => setCharacters(diff(people, selectedSeason?.url)),
    [people, selectedSeason]
  )

  const filterByGender = (gender) => {
    if (typeof gender === 'string' && gender.length > 0) {
      const filter = characters.filter((person) => person.gender === gender)
      setFilteredCharacters(filter)
    } else if (typeof gender === 'string' && gender.length === 0) {
      setFilteredCharacters(characters)
    }
  }

  useEffect(() => {
    const genders = Array.from(
      new Set(characters.map((character) => character.gender))
    )
    setGenders(genders)
    setFilteredCharacters(characters)
  }, [selectedSeason, characters])

  const handleChange = async (event) => {
    if (people.length < 1) {
      await getPeople()
    }
    const {
      target: { value }
    } = event
    setSeasonName(value)
    setCharacters(
      diff(
        people,
        movies.results.filter((result) => result.title === value)[0]?.url
      )
    )
    setSelectedSeason(
      movies.results.filter((result) => result.title === value)[0]
    )
  }

  const filterBy = (gender) => setFilter(gender)

  return (
    <div style={{ marginBottom: 30 }}>
      {Object.keys(alert).length > 0 && (
        <TransitionAlert type={alert.type} message={alert.message} />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <StarWars style={{ width: 200, margin: 0, height: 200 }} />
        <div className="select">
          <SelectWrapper>
            <select id="standard-select" onChange={handleChange}>
              <option value="hide">Search starwars</option>
              {names?.map((name) => (
                <option
                  key={name}
                  value={name}
                  style={getStyles(name, seasonName)}
                >
                  {name}
                </option>
              ))}
            </select>
          </SelectWrapper>
        </div>
      </div>
      {isLoading && <Loader width={150} />}
      {seasonName && !isLoading && genders && (
        <div style={{ position: 'relative' }}>
          {genders.map((gender) => (
            <FilterByGender
              key={gender}
              gender={gender}
              filterByGender={filterByGender}
              filter={filter}
              filterBy={filterBy}
            />
          ))}
          <ResetButton
            style={{
              color: '#fff',
              border: '1.7px solid #ffe81f',
              borderRadius: 50,
              background: `${filter === '' ? '#ffe81f' : 'transparent'}`,
              padding: 7,
              cursor: 'pointer',
              position: 'absolute',
              top: 13,
              marginLeft: 10
            }}
            onClick={() => {
              filterByGender('')
              filterBy('')
            }}
          />
        </div>
      )}

      {seasonName && !isLoading && <Table characters={filteredCharacters} />}
    </div>
  )
}

export default App
