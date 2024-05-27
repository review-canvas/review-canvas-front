import { getFilteredRowModel, type TableOptions } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

interface TableProps<T>
  extends Omit<
    TableOptions<T>,
    | 'getCoreRowModel'
    | 'getSortedRowModel'
    | 'getPaginationRowModel'
    | 'getFilteredRowModel'
    | 'initialState'
    | 'state'
    | 'onGlobalFilterChange'
  > {
  pageSize: number;
  activateSearchFilter?: boolean;
}

export interface TableCellProps {
  getValue: () => any;
}

export default function Table<T>({ pageSize, activateSearchFilter = false, ...options }: TableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    ...options,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const currentPage = table.getState().pagination.pageIndex;

  return (
    <>
      {activateSearchFilter ? (
        <div className="table-search">
          <input
            className="table-search-input rounded-md border border-gray-200 px-4 py-2"
            onChange={(evt) => {
              setGlobalFilter(evt.currentTarget.value);
            }}
            placeholder="검색어를 입력해주세요."
            type="text"
            value={globalFilter}
          />
        </div>
      ) : null}
      <table className="table w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className="table-header-row border-b border-b-sub-secondary"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <th
                  className="table-header border-b-sub-secondary text-gray-500 font-normal"
                  colSpan={header.colSpan}
                  key={header.id}
                >
                  {header.isPlaceholder ? null : (
                    <button
                      className="cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                      type="button"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="table-row border-b border-b-sub-secondary"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className="table-cell py-1"
                  key={cell.id}
                  data-column-id={cell.column.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-pagination flex gap-2">
        <button
          className="previous-page-button"
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
          type="button"
        >
          {'<'}
        </button>
        {Array.from({ length: table.getPageCount() }, (_, idx) => (
          <button
            className={`page-number-button ${idx === currentPage ? 'text-main-primary' : 'text-gray-500'}`}
            key={idx}
            onClick={() => {
              table.setPageIndex(idx);
            }}
            type="button"
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="next-page-button"
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
          type="button"
        >
          {'>'}
        </button>
      </div>
    </>
  );
}
