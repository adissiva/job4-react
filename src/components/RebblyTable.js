import React from "react";
import {
  useTable,
  useAsyncDebounce,
  usePagination,
  useRowSelect
} from "react-table";
import { ArrowNarrowLeftIcon,ArrowNarrowRightIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import { Button, PageButton } from "./shared/Button";
import { SortDownIcon, SortUpIcon, SortIcon } from "./shared/Icon";
import { classNames } from "./shared/Utils";
import './RebblyTable.css';

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <div className="text-left">
      <span
        className={classNames(
          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
          status.startsWith("active") ? "bg-green-100 text-green-700" : null,
          status.startsWith("inactive") ? "bg-slate-100 text-slate-500" : null,
          status.startsWith("draft") ? "bg-blue-100 text-blue-500" : null,
          status.startsWith("error") ? "bg-red-100 text-red-700" : null,
          status.startsWith("paused") ? "bg-amber-100 text-yellow-500" : null
        )}
      >
        {status}
      </span>
    </div>

  );
}

export function PreviewNavigation({ value }) {
  return (
    <ExternalLinkIcon className={`h-5 w-5 text-gray-500 `}/>
  );
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <><input type="checkbox" className="accent-green-900  focus:ring-3 focus:ring-blue-300 " ref={resolvedRef} {...rest} /></>
    )
  }
)

function RebblyTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state
  } = useTable({ columns, data, initialState: { pageSize: 6 } },
    usePagination,
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
  return (

    <>
      {/* table */}
      <div className="shadow rounded-lg">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-200 ">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase"
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y">
            {page.map((row, i) => {
              prepareRow(row)
              return (<tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (<td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-gray-500 ">{cell.render('Cell')}</td>)
                })}
              </tr>
              )
            })}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="px-6 py-1 min-w-full divide-y divide-gray-200 bg-gray-200 flex justify-between">
          <div>
            <span className="text-sm text-gray-700">
              <span className="font-medium">{Number(page[0].id) + 1}</span> - {" "}
              <span className="font-medium">{Number(page[page.length - 1].id) + 1}</span> of {" "}
              <span className="font-medium">{rows.length} rows</span>
            </span>
          </div>
          <div>
            <nav className="relative z-0 rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <PageButton onClick={() => previousPage()} disabled={!canPreviousPage}>
                <span className="sr-only">Previous</span>
                <ArrowNarrowLeftIcon className={`h-5 w-5 ${canPreviousPage?'text-gray-500':'text-gray-300'}`} aria-hidden="true" disabled={!canNextPage}/>
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <ArrowNarrowRightIcon className={`h-5 w-5 ${canNextPage?'text-gray-500':'text-gray-300'}`} disabled={!canNextPage}/>
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default RebblyTable;
