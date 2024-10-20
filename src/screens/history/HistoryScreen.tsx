'use client';

import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { format } from 'date-fns';
import { type ReactElement, useMemo } from 'react';

import { Container } from '@/components/container';
import { Icon } from '@/components/icon';
import { useLightOrDarkTheme } from '@/context/ThemeContext';
// import { useTranslation } from '@/hooks/useTranslation';
import type { SearchReturnType } from '@/types/api';

export const HistoryScreen = (): ReactElement => {
  const { isLight } = useLightOrDarkTheme();
  // const { t } = useTranslation();

  const columnHelper = createColumnHelper<SearchReturnType>();

  const data = useMemo((): SearchReturnType[] => ([
    {
      search_type: 'artist',
      artist: 'Prince',
      track: null,
      url: null,
      id: '1',
      url_type: null,
      created_at: '2024-09-08T08:57:09.223Z',
    },
    {
      search_type: 'artist',
      artist: 'Prince',
      track: null,
      url: null,
      id: '1',
      url_type: null,
      created_at: '2024-09-08T08:57:09.223Z',
    },
    {
      search_type: 'track',
      artist: 'The Beatles',
      track: 'Hey Jude',
      url: null,
      id: '2',
      url_type: null,
      created_at: '2024-10-08T08:57:09.223Z',
    },
    {
      search_type: 'track',
      artist: 'The Beatles',
      track: 'Hey Jude',
      url: null,
      id: '2',
      url_type: null,
      created_at: '2024-10-08T08:57:09.223Z',
    },
    {
      search_type: 'track',
      artist: 'The Rolling Stones',
      track: 'Sticky Fingers',
      url: null,
      id: '3',
      url_type: null,
      created_at: '2024-08-14T08:57:09.223Z',
    },
    {
      search_type: 'url',
      artist: 'Dire Straits',
      track: 'Sultans Of Swing',
      url: 'https://open.spotify.com/track/37Tmv4NnfQeb0ZgUC4fOJj?si=38f1ca8c7f3d4c51',
      id: '3',
      url_type: 'spotify',
      created_at: '2024-10-14T08:57:09.223Z',
    },
  ]), []);

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
    data,
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

  // const getCanNextPage = useCallback(() => {
  //   if (table.getState(). === 1) {
  //     return false;
  //   }
  //   if (pageState.currentIndex < pageState.pages.length - 1) {
  //     return true;
  //   }

  //   return false;
  // }, [pageState.currentIndex, paginationState.totalPages, pageState.pages.length]);

  // const currentIndex = useMemo(() => table.getState().pagination.pageIndex, [table]);
  // const totalPages = useMemo(() => table.getPageCount(), [table]);

  return (
    <main className={`flex-1 overflow-x-hidden min-w-full max-w-screen ${isLight ? 'bg-ivory' : 'bg-eerieBlack'}`}>
      <Container size='tablet'>
        <h1 className='text-3xl font-bold text-ivory text-left w-full'>Previous searches</h1>
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
                      className={`flex gap-1 p-2 text-sm justify-start ${isLight ? 'text-eerieBlack70' : 'text-ivory70'} items-center min-w-full ${
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
        <div className="flex justify-between items-center gap-4">
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
          <div className="flex justify-center items-center gap-2">
            <button
              data-testid="previous-page"
              type="button"
              className={`flex justify-center items-center h-8 w-8 ${isLight ? 'hover:bg-eerieBlack20 rounded-full' : 'hover:bg-ivory20 rounded-full'}`}
              aria-label='go to previous page'
              onClick={() => table.previousPage()}
            >
              <Icon icon='chevron' rotate={90} color={isLight ? 'rgba(38, 38, 38, 1)' : 'rgba(255, 254, 237, 1)'} />
            </button>

            {/* first page, index 0 */}
            <button
              className={`flex w-8 h-8 justify-center items-center ${isLight ? 'hover:bg-eerieBlack20 text-eerieBlack rounded-full' : 'hover:bg-ivory20 text-ivory rounded-full'} rounded-full text-brand`}
              type="button"
              data-testid="first-page-button"
              onClick={() => table.setPageIndex(0)}
              // disabled={0 === table.getState().pagination.pageIndex}
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
                className={`flex w-8 h-8 justify-center items-center ${isLight ? 'hover:bg-eerieBlack20 text-eerieBlack rounded-full' : 'hover:bg-ivory20 text-ivory rounded-full'} rounded-full text-brand`}
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
                className={`flex w-8 h-8 justify-center items-center ${isLight ? 'hover:bg-eerieBlack20 bg-eerieBlack20 text-eerieBlack rounded-full' : 'hover:bg-ivory20 bg-ivory20 text-ivory rounded-full'} rounded-full text-brand`}
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
                className={`flex w-8 h-8 justify-center items-center ${isLight ? 'hover:bg-eerieBlack20 text-eerieBlack rounded-full' : 'hover:bg-ivory20 text-ivory rounded-full'} rounded-full text-brand`}
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
                className={`flex w-8 h-8 justify-center items-center ${isLight ? 'hover:bg-eerieBlack20 text-eerieBlack rounded-full' : 'hover:bg-ivory20 text-ivory rounded-full'} rounded-full text-brand`}
                type="button"
                data-testid="last-page-button"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                // disabled={
                //   table.getPageCount() - 1 ===
                //   table.getState().pagination.pageIndex
                // }
                aria-label='last page'
              >
                {table.getPageCount()}
              </button>
            )}

            <button
              data-testid="next-page"
              type="button"
              className={`flex justify-center items-center h-8 w-8 ${isLight ? 'hover:bg-eerieBlack20 rounded-full' : 'hover:bg-ivory20 rounded-full'}`}
              aria-label='go to next page'
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