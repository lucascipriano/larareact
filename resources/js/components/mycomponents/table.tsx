'use client'

import * as React from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    ColumnFiltersState,
    VisibilityState,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PaginationWrapper } from '@/components/mycomponents/pagination'
import { toast } from "sonner"
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import SheetTransaction from './side-sheets'
import Transaction from './side-sheets'

// Defina a interface Transaction conforme os campos usados no componente
interface Transaction {
    id: number
    category?: string
    description?: string
    date: string
    amount: number
    type: 'income' | 'expense'
}

type TableWrapperProps = {
    recentTransactions: Transaction[]
    links: {
        url: string | null
        label: string
        active: boolean
    }[]
}

export function TableWrapper({ recentTransactions, links }: TableWrapperProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined)
    const [sheetOpen, setSheetOpen] = useState(false)

    const { props } = usePage();
    useEffect(() => {
        if (typeof props.success === 'string') {
            toast.success(props.success)
        }
    }, [props.success]);

    function handleEdit(transaction: Transaction) {
        setEditingTransaction(transaction)
        setSheetOpen(true)
    }

    async function handleDelete(id: number) {
        router.delete(`/transactions/${id}`, {
            onSuccess: () => {
                toast('Transação deletada com sucesso!');
            },
            onError: (error) => {
                toast.error(`Erro ao deletar transação: ${error.message}`);
            },
            preserveScroll: true,
        });
    }

    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: 'category',
            header: 'Categoria',
            cell: ({ row }) => (
                <>{row.original.category || 'Sem categoria'}</>
            ),
        },{
            accessorKey: 'description',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Descrição
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span className="font-medium">{row.getValue('description') || "Sem descrição"}</span>,
        },
        {
            accessorKey: 'date',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Data
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) =>
                new Date(row.original.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
        },
        {
            accessorKey: 'amount',
            header: () => <div className="text-right">Valor</div>,
            cell: ({ row }) => {
                const { amount, type } = row.original
                const formatted = Math.abs(amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })
                return (
                    <div
                        className={`text-right font-medium ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {type === 'income' ? '+' : '-'} {formatted}
                    </div>
                )
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                            onClick={() => handleEdit(row.original)}
                        >
                            Editar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            onClick={() => handleDelete(row.original.id)}
                        >
                            Excluir
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            enableSorting: false,
            enableHiding: false,
        }
    ]

    const table = useReactTable({
        data: recentTransactions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            {/* Sheet para criar/editar */}
            <SheetTransaction transaction={editingTransaction} />

            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrar por descrição..."
                    value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('description')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colunas <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nenhuma transação encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Paginação do Laravel/Inertia */}
            <PaginationWrapper links={links} />
        </div>
    )
}
