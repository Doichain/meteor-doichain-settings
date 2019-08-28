import React , { useState,useEffect }from 'react'
import {Settings} from './imports/api/settings/settings'
import styled from 'styled-components'
import { useTable } from 'react-table'
import {useSubscription,useTracker} from "react-meteor-hooks"
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
    'react': '16.8.6',
    'react-dom': '16.8.6',
    'react-meteor-hooks:':'0.3.1',
    "react-scripts": "3.1.1",
    "react-table": "7.0.0-alpha.30"
}, 'doichain:settings');

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

// Create an editable cell renderer
const EditableCell = ({
                          cell: { value: initialValue },
                          row: { index },
                          column: { id },
                          updateMyData, // This is a custom function that we supplied to our table instance
                      }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    if(value.toString() === "true" || value.toString() === "false"){
        return (
            <select onChange={onChange} onBlur={onBlur}>
                <option value={"true"}>true</option>
                <option value={"false"}>false</option>
            </select>
        )
    }
    else
        return <input value={value} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
    Cell: EditableCell,
}

function Table({ columns, data, updateMyData, disablePageResetOnDataChange }) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
        defaultColumn,
        disablePageResetOnDataChange,
        // updateMyData isn't part of the API, but
        // anything we put into these options will
        // automatically be available on the instance.
        // That way we can call this function from our
        // cell renderer!
        updateMyData
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {rows.map(
                (row, i) =>
                    prepareRow(row) || (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
            )}
            </tbody>
        </table>
    )
}

const SettingsTable = props => {
    const loading = useSubscription('settings')
    const settings = useTracker(() => Settings.find({}))

    const listItems = []
    const columns = React.useMemo(
        () => [
            {
                Header: 'Settings',
                columns: [
                    {
                        Header: 'Key',
                        accessor: 'key',
                        Cell: ({ cell: { value } }) => value
                    },
                    {
                        Header: 'Value',
                        accessor: 'value'
                    },
                ],
            }
        ],
        []
    )

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.
    const skipPageResetRef = React.useRef(false)
    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnID and new value to update the
    // original data
    const updateMyData = (rowIndex, columnID, value) => {
        // We also turn on the flag to not reset the page
        skipPageResetRef.current = true
        console.log("updating id: "+listItems[rowIndex]._id+" data with value: "+value+" and key:",listItems[rowIndex].key)
        Settings.update({_id: listItems[rowIndex]._id},{$set:{value:value}})

      /*  setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    console.log(columnID, value)
                    return {
                        ...old[rowIndex],
                        [columnID]: value,
                    }
                }
                return row
            })
        )*/
    }

    if(!loading){
        settings.map((configItem) => {
            const thisItem = {_id: configItem._id, key: configItem.key}
            if(configItem.value instanceof Object)
                thisItem.value = JSON.stringify(configItem.value)
            else
                thisItem.value = configItem.value

            listItems.push(thisItem)
        })
    }else{
       // console.log('loading:'+loading,settings)
    }
    const [data, setData] =  useState(listItems)
    const [originalData,setOriginalData] = useState(listItems)
    // Let's add a data resetter/randomizer to help
    // illustrate that flow...
    const resetData = () => setData(originalData)

    useEffect( () => {
        setData(listItems)
        setOriginalData(listItems)
    }, [loading]);
        return (
            <Styles>
                <Table
                    columns={columns}
                    updateMyData={updateMyData}
                    data={data}
                    disablePageResetOnDataChange={skipPageResetRef.current}
                />
                <button onClick={resetData}>Reset Data</button>
            </Styles>
        )
}

export default SettingsTable