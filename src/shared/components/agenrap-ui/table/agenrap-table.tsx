

"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { ScrollArea, ScrollBar } from "../../ui/scroll-area"
import { useEffect, useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/src/shared/components/ui/drawer"
type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  notHaveFallBack:string,
    meta?: Record<string, unknown>
    renderDrawer?: (props: {
    row: TData
    open: boolean
    onClose: () => void
  }) => React.ReactNode
}

export default function AgenrapTable<TData, TValue>({
  columns,
  data,
  meta,
  notHaveFallBack,
  renderDrawer,
}: DataTableProps<TData, TValue>) {


 const [selectedRow, setSelectedRow] = useState<TData | null>(null)
const [drawerOpen, setDrawerOpen] = useState(false)

const openDrawer = (row: TData) => {
  (document.activeElement as HTMLElement)?.blur()
  setSelectedRow(row)
  setDrawerOpen(true)
}

const closeDrawer = () => {
  setDrawerOpen(false)
  setTimeout(() => setSelectedRow(null), 300)
}

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  meta: {
    openDrawer,
      ...meta
  },
})

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024 && drawerOpen) {
      closeDrawer()
    }
  }

  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [drawerOpen])

  return (
    <>
 <div className="w-full mx-auto">
  <div className=" overflow-hidden">
    <ScrollArea scrollHideDelay={99999} className="w-full lg:overflow-visible">
      <div className="w-full">

        <Table className="whitespace-nowrap border-0">
          <TableHeader className=" border-0 "  >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}  className="border-0">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={`px-4 font-tree text-white md:text-lg text-sm font-medium py-4 bg-(--agenrap-brown-500) ${!header.column.getAfter() ? 'text-right' : 'text-left'} `} >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}     onClick={() => {
  if (window.innerWidth < 1024) openDrawer(row.original)
  }}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={`px-4  bg-(--agenrap-gray-800)/5 border-b border-(--agenrap-brown-500)/50  py-4 font-tree ${!cell.column.getAfter() ? 'text-right' : 'text-left'}`} >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center border-b border-(--agenrap-brown-500)/50">
                  {notHaveFallBack}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>

      <ScrollBar
        orientation="horizontal"
        className="h-2 lg:hidden"
        primitiveThumbVar="rounded-full bg-(--agenrap-purple-500)"
      />
    </ScrollArea>

  </div>
 
</div>
{renderDrawer && selectedRow&& renderDrawer({
  row: selectedRow!,
  open: drawerOpen,
  onClose: closeDrawer,
})}
</>
  )
}