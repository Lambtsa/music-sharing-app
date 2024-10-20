'use client';

import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { type ReactElement, useCallback, useMemo } from 'react';

import { Container } from '@/components/container';
import { Icon } from '@/components/icon';
import { useLightOrDarkTheme } from '@/context/ThemeContext';
import { ClientFetchError } from '@/core/errors';
// import { useTranslation } from '@/hooks/useTranslation';
import type { SearchReturnType } from '@/types/api';

export const HistoryScreen = (): ReactElement => {
  const { isLight } = useLightOrDarkTheme();
  const { data: session } = useSession();
  // const { t } = useTranslation();

  const user = useMemo(() => session?.user, [session]);

  const { data } = useQuery<SearchReturnType[]>({ queryKey: ['todos'], queryFn: async () => {
    if (!user?.sub) {
      throw new ClientFetchError({
        message: 'An error occured while fetching history',
        status: 401,
        statusText: 'User is not authenticated',
      });
    }
    const res = await fetch(`/api/history/${user?.sub}`);

    if (!res.ok) {
      throw new ClientFetchError({
        message: 'An error occured while fetching history',
        status: res.status,
        statusText: res.statusText,
      });
    }

    return res.json();
  }});

  const searchHistory = useMemo(() => data ?? [], [data]);

  const columnHelper = createColumnHelper<SearchReturnType>();

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.search_type, {
        id: 'search_type',
        header: 'Search type',
        cell: (info): ReactElement => {
          return <p className='text-ellipsis whitespace-normal'>{info.getValue()}</p>;
        },
        sortDescFirst: false,
        enableSorting: true,
        size: 120,
      }),
      columnHelper.accessor((row) => row.artist, {
        id: 'artist',
        header: 'Artist',
        cell: (info): ReactElement => {
          return <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{info.getValue()}</p>;
        },
        sortDescFirst: false,
        enableSorting: true,
        size: 200
      }),
      columnHelper.accessor((row) => row.track, {
        id: 'track',
        header: 'Track',
        cell: (info): ReactElement => {
          return <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{info.getValue()}</p>;
        },
        sortDescFirst: false,
        enableSorting: true,
        size: 100
      }),
      columnHelper.accessor((row) => row.url, {
        id: 'url',
        header: 'Url',
        cell: (info): ReactElement => {
          return <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{info.getValue()}</p>;
        },
        sortDescFirst: false,
        enableSorting: true,
        size: 200
      }),
      columnHelper.accessor((row) => row.created_at, {
        id: 'created_at',
        header: 'Searched on',
        cell: (info): ReactElement => {
          return <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{format(new Date(info.getValue()), 'do MMM yyyy')}</p>;
        },
        sortDescFirst: false,
        enableSorting: true,
        size: 120
      }),
      // columnHelper.accessor((row) => row.id, {
      //   id: 'id',
      //   header: '',
      //   cell: (info): ReactElement => {
      //     return (
      //       <button
      //         className = 'px-4 py-2 rounded-[7px] bg-pastelPink text-ivory font-bold hover:text-ivory hover:bg-oldRose text-sm'
      //         type="button"
      //         onClick={() => console.log(info.row.original)}
      //       >
      //         {t({ id: 'label.select' })}
      //       </button>
      //     )
      //   },
      //   sortDescFirst: false,
      //   enableSorting: false,
      //   size: 120
      // }),
    ], [columnHelper]);

  const table = useReactTable({
    debugTable: false,
    data: searchHistory,
    // manualPagination: true,
    columns,
    defaultColumn: {
      size: 100,
      minSize: 50,
      maxSize: 150,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedPage = useCallback((index: number) => {
    return isLight 
      ? index === table.getState().pagination.pageIndex 
        ? 'bg-eerieBlack20' 
        : '' 
      : index === table.getState().pagination.pageIndex 
        ? 'bg-ivory20' 
        : '';
  }, [isLight, table]);

  return (
    <main className={`flex-1 overflow-x-hidden min-w-full max-w-screen ${isLight ? 'bg-ivory' : 'bg-eerieBlack'}`}>
      <Container size='tablet'>
        <h1 className={`text-2xl font-bold ${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left w-full`}>History</h1>
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className='border-b border-ivory20'
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    className="text-left"
                    key={header.id}
                    style={{
                      width: header.column.getSize()
                        ? `${header.column.getSize()}px`
                        : '',
                      maxWidth: header.column.getSize()
                        ? `${header.column.getSize()}px`
                        : '',
                    }}
                  >
                    <button
                      className={`flex gap-1 p-2 text-sm justify-start ${isLight ? 'text-eerieBlack' : 'text-ivory'} items-center min-w-full ${
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <Icon height={12} icon='upArrow' color={isLight ? 'rgba(38, 38, 38, 0.7)' : 'rgba(255, 254, 237, 0.7)'} />,
                        desc: <Icon height={12} rotate={180} icon='upArrow' color={isLight ? 'rgba(38, 38, 38, 0.7)' : 'rgba(255, 254, 237, 0.7)'} />,
                      }[header.column.getIsSorted() as string] ??
                        (header.column.getCanSort() ? (
                          <Icon height={12} icon='upAndDown' color={isLight ? 'rgba(38, 38, 38, 0.7)' : 'rgba(255, 254, 237, 0.7)'} />
                        ) : null)}
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                className='border-b border-ivory20'
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={`text-left text-sm p-2 ${isLight ? 'text-eerieBlack70' : 'text-ivory70'}`}
                    key={cell.id}
                    style={{ 
                      width: cell.column.getSize() ? `${cell.column.getSize()}px` : '',
                      maxWidth: cell.column.getSize() ? `${cell.column.getSize()}px` : '',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}  
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center gap-4 w-full">
          <div className='flex justify-center items-center gap-2'>
            <select
              className="rounded border px-3 py-1"
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 50].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
            <span className={`w-min text-sm whitespace-nowrap ${isLight ? 'text-eerieBlack' : 'text-ivory'}`}>Items per page</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              data-testid="previous-page"
              type="button"
              className={`flex justify-center items-center h-8 w-8 ${isLight ? 'hover:bg-eerieBlack20 rounded-full' : 'hover:bg-ivory20 rounded-full'} disabled:opacity-40 disabled:cursor-not-allowed`}
              aria-label='go to previous page'
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <Icon icon='chevron' rotate={90} color={isLight ? 'rgba(38, 38, 38, 1)' : 'rgba(255, 254, 237, 1)'} />
            </button>

            {/* first page, index 0 */}
            <button
              className={`flex w-8 h-8 justify-center items-center ${isLight ? 'hover:bg-eerieBlack20 text-eerieBlack rounded-full' : 'hover:bg-ivory20 text-ivory rounded-full'} ${selectedPage(0)} rounded-full text-brand`}
              type="button"
              data-testid="first-page-button"
              onClick={() => table.setPageIndex(0)}
              disabled={0 === table.getState().pagination.pageIndex}
              aria-label='first page'
            >
              {1}
            </button>

            {table.getState().pagination.pageIndex - 1 > 0 &&
              table.getState().pagination.pageIndex - 2 > 0 && <p data-testid='dots-previous-pages'>...</p>}

            {/* Previous pages */}
            {table.getState().pagination.pageIndex > 0 &&
              table.getState().pagination.pageIndex !== 1 && (
              <button
                className={`flex w-8 h-8 justify-center items-center ${isLight ? 'hover:bg-eerieBlack20 text-eerieBlack rounded-full' : 'hover:bg-ivory20 text-ivory rounded-full'} ${selectedPage(table.getState().pagination.pageIndex - 1)} rounded-full text-brand`}
                type="button"
                data-testid="previous-page-button"
                onClick={() => table.previousPage()}
                aria-label='previous page'
              >
                {table.getState().pagination.pageIndex}
              </button>
            )}

            {/* Current page */}
            {table.getState().pagination.pageIndex + 1 !== 1 &&
              table.getState().pagination.pageIndex + 1 <
              table.getPageCount() && (
              <button
                className={`flex w-8 h-8 justify-center items-center ${isLight ? 'hover:bg-eerieBlack20 bg-eerieBlack20 text-eerieBlack rounded-full' : 'hover:bg-ivory20 bg-ivory20 text-ivory rounded-full'} ${selectedPage(table.getState().pagination.pageIndex)} rounded-full text-brand`}
                type="button"
                data-testid="current-page-button"
                disabled
                aria-label='current page'
              >
                {table.getState().pagination.pageIndex + 1}
              </button>
            )}

            {/* Next pages */}
            {table.getState().pagination.pageIndex + 2 < table.getPageCount() && (
              <button
                className={`flex w-8 h-8 justify-center items-center ${isLight ? 'hover:bg-eerieBlack20 text-eerieBlack rounded-full' : 'hover:bg-ivory20 text-ivory rounded-full'} ${selectedPage(table.getState().pagination.pageIndex + 1)} rounded-full text-brand`}
                type="button"
                data-testid="next-page-button"
                onClick={() => table.nextPage()}
                aria-label='next page'
              >
                {table.getState().pagination.pageIndex + 2}
              </button>
            )}

            {table.getState().pagination.pageIndex + 2 < table.getPageCount() &&
              table.getState().pagination.pageIndex + 3 <
              table.getPageCount() && <p data-testid='dots-next-pages'>...</p>}

            {/* Last page */}
            {table.getPageCount() > 1 && (
              <button
                className={`flex w-8 h-8 justify-center items-center ${isLight ? 'hover:bg-eerieBlack20 text-eerieBlack rounded-full' : 'hover:bg-ivory20 text-ivory rounded-full'} ${selectedPage(table.getPageCount() - 1)} rounded-full text-brand`}
                type="button"
                data-testid="last-page-button"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={
                  table.getPageCount() - 1 ===
                  table.getState().pagination.pageIndex
                }
                aria-label='last page'
              >
                {table.getPageCount()}
              </button>
            )}

            <button
              data-testid="next-page"
              type="button"
              className={`flex justify-center items-center h-8 w-8 ${isLight ? 'hover:bg-eerieBlack20 rounded-full' : 'hover:bg-ivory20 rounded-full'} disabled:opacity-40 disabled:cursor-not-allowed`}
              aria-label='go to next page'
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <Icon icon='chevron' rotate={270} color={isLight ? 'rgba(38, 38, 38, 1)' : 'rgba(255, 254, 237, 1)'} />
            </button>
          </div>
        </div>
      </Container>
    </main>
  );
};