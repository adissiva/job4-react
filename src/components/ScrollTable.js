import React from "react";
import {
  useTable,
  useRowSelect
} from "react-table";
import { classNames } from "./shared/Utils";
import './ScrollTable.css';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" className="accent-green-900" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function ScrollTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state
  } = useTable({ columns, data },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    })
  const firstPageRows = rows.slice(0, 20)
  return (

    <>
      {/* table */}
      <div className="rounded-lg shadow overflow-y-auto" style={{ height: '384px' }}>
        <table  {...getTableProps()} className="relative w-full divide-gray-200 whitespace-no-wrap bg-white">
          <thead className="">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}
                    className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-900 border-b border-gray-200 bg-gray-200 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y">
            {rows.map((row, i) => {  // new
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} className="px-6 py-4  text-gray-500 whitespace-nowrap overflow-x-visible">
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ScrollTable;
