import { useEffect, useState } from 'react'
import { TableFooter } from '../style'

const CustomTableFooter = ({ heights, amountOfCharacters }) => {
  const [totalHeightCm, setTotalHeightCm] = useState(0)
  const [totalHeightFt, setTotalHeightFt] = useState(0)
  const [totalHeightFtOnly, setTotalHeightFtOnly] = useState(0)
  const [totalHeightInchOnly, setTotalHeightInchOnly] = useState(0)

  useEffect(() => {
    setTotalHeightCm(
      heights
        .filter((height) => !isNaN(height))
        .reduce((total, height) => total + Number(height), 0)
    )

    // Cm to feet === Cm/30.48
    setTotalHeightFt(
      heights
        .filter((height) => !isNaN(height))
        .reduce((total, height) => total + Number(height), 0) / 30.48
    )
  }, [heights])

  useEffect(() => {
    const separateFtAndInch = totalHeightFt.toString().split('.')
    setTotalHeightFtOnly(separateFtAndInch[0])
    // Feet to inch === ft * 12
    setTotalHeightInchOnly(
      Number((Number(`0.${separateFtAndInch[1]}`) * 12).toFixed(2))
    )
  }, [totalHeightFt])

  return (
    <TableFooter>
      <div>Total number of characters on the list: {amountOfCharacters} </div>
      <div>
        Sum of Heights:{' '}
        {`${totalHeightCm} cm (${totalHeightFtOnly}ft/${totalHeightInchOnly}in)`}
      </div>
    </TableFooter>
  )
}

export default CustomTableFooter
