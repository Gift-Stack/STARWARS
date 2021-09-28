import { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { PageTitle } from './style'
import CustomTableFooter from './components/TableFooter'

const Table = ({ characters: data }) => {
  const [theFormattedData, setTheFormattedData] = useState([])
  const tableDataConfig = [
    ['Name', 'name'],
    ['Sex', 'gender'],
    ['Height', 'height']
  ]

  const isArray = (val) => Array.isArray(val)
  const isObject = (val) =>
    typeof val === 'object' && !Array.isArray(val) && val !== null

  const formattedData =
    data &&
    data.reduce((acc, dataObj) => {
      const newFormat = {}
      tableDataConfig.forEach((column) => {
        newFormat[column[0]] =
          (isArray(column[1])
            ? column[1].reduce((str, dt) => `${str} ${dataObj[dt]}`, '')
            : dataObj[column[1]]) ||
          (isObject(column[1])
            ? Object.keys(column[1]).reduce((obj, key) => {
                // eslint-disable-next-line no-param-reassign
                obj[key] = dataObj[key]
                return obj
              }, {})
            : column[1]) ||
          column[1]
      })
      acc.push(newFormat)
      return acc
    }, [])
  useEffect(() => {
    setTheFormattedData(formattedData)
    // eslint-disable-next-line
  }, [data])

  const columns = () => [
    {
      name: 'Name',
      options: {
        setCellProps: () => ({
          style: {
            padding: 20,
            margin: 0
          }
        }),
        customBodyRender: (value) => (
          <div className="custom-column">{value}</div>
        ),
        sortThirdClickReset: true
      }
    },
    {
      name: 'Sex',
      options: {
        setCellProps: () => ({
          style: {
            margin: 0
          }
        }),
        customBodyRender: (value) => (
          <div className="custom-column truncated">{value}</div>
        ),
        sortThirdClickReset: true
      }
    },
    {
      name: 'Height',
      options: {
        setCellProps: () => ({
          style: {
            margin: 0
          }
        }),
        customBodyRender: (value) => (
          <div className="custom-column capitalize truncated">{value}</div>
        ),
        sortThirdClickReset: true
      }
    }
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MUIDataTable
        data={theFormattedData}
        columns={columns()}
        title={<PageTitle>Characters</PageTitle>}
        options={{
          filter: false,
          filterType: 'checkbox',
          viewColumns: false,
          print: false,
          serverSide: true,
          search: false,
          confirmFilters: true,
          download: false,
          selectableRows: 'none',
          sort: true,
          onColumnSortChange: (name, direction) => {
            // console.log(name, direction)
            if (direction === 'none') setTheFormattedData(formattedData)
            if (name === 'Name') {
              if (direction === 'asc')
                setTheFormattedData(
                  formattedData.sort((a, b) => {
                    if (a.Name < b.Name) {
                      return -1
                    }
                    if (a.Name > b.Name) {
                      return 1
                    }
                    return 0
                  })
                )
              else if (direction === 'desc')
                setTheFormattedData(
                  formattedData.sort((a, b) => {
                    if (a.Name < b.Name) {
                      return 1
                    }
                    if (a.Name > b.Name) {
                      return -1
                    }
                    return 0
                  })
                )
            }
            if (name === 'Sex') {
              if (direction === 'asc')
                setTheFormattedData(
                  formattedData.sort((a, b) => {
                    if (a.Sex < b.Sex) {
                      return -1
                    }
                    if (a.Sex > b.Sex) {
                      return 1
                    }
                    return 0
                  })
                )
              else if (direction === 'desc')
                setTheFormattedData(
                  formattedData.sort((a, b) => {
                    if (a.Sex < b.Sex) {
                      return 1
                    }
                    if (a.Sex > b.Sex) {
                      return -1
                    }
                    return 0
                  })
                )
            }
            if (name === 'Height') {
              if (direction === 'asc')
                setTheFormattedData(
                  formattedData.sort((a, b) => a.Height - b.Height)
                )
              else if (direction === 'desc')
                setTheFormattedData(
                  formattedData.sort((a, b) => b.Height - a.Height)
                )
            }
          },

          customFilterDialogFooter: (_, applyFilters) => (
            <button
              type="button"
              onClick={() => {
                applyFilters()
              }}
            >
              apply
            </button>
          ),
          customHeadRender: () => {},
          customFooter:
            theFormattedData?.length === 0
              ? null
              : () => (
                  <CustomTableFooter
                    heights={theFormattedData.map((data) => data.Height)}
                    amountOfCharacters={theFormattedData?.length}
                  />
                ),
          responsive: 'standard',
          setRowProps: () => ({
            style: {
              borderRadius: '25px'
            }
          })
        }}
      />
    </div>
  )
}

export default Table
