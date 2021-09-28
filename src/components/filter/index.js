import { Button } from './style'

const FilterByGender = ({ gender, filter, filterBy, filterByGender }) => {
  return (
    <Button
      isSelected={filter === gender}
      onClick={() => {
        filterByGender(gender)
        filterBy(gender)
      }}
    >
      {gender}
    </Button>
  )
}

export default FilterByGender
