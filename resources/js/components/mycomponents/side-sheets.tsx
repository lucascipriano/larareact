"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Plus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

interface Transaction {
    id: number
    type: string
    amount: string
    category: string
    description: string
    date: string
}

interface SheetTransactionProps {
    transaction?: Transaction
}

export default function SheetTransaction({ transaction }: SheetTransactionProps) {
    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, reset, errors } = useForm({
        type: transaction?.type || '',
        amount: transaction?.amount || '',
        category: transaction?.category || '',
        description: transaction?.description || '',
        date: transaction?.date || '',
    });

    // Atualiza os dados caso a transação mude (útil para abrir edição)
    useEffect(() => {
        if (transaction) {
            setData({
                type: transaction.type,
                amount: transaction.amount,
                category: transaction.category,
                description: transaction.description,
                date: transaction.date,
            })
            setOpen(true)
        }
    }, [transaction])

    function submit(e: React.FormEvent) {
        e.preventDefault()

        if (transaction) {
            // Editando
            post(`/transactions/${transaction.id}`, {
                method: 'put',
                onSuccess: () => {
                    reset()
                    setOpen(false)
                },
            })
        } else {
            // Criando
            post('/transactions', {
                onSuccess: () => {
                    reset()
                    setOpen(false)
                },
            })
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    {transaction ? "Editar Transação" : "Nova Transação"}
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto max-h-screen">
                <SheetHeader>
                    <SheetTitle>{transaction ? "Editar Transação" : "Nova Transação"}</SheetTitle>
                    <SheetDescription>
                        Preencha os dados da transação financeira abaixo.
                    </SheetDescription>
                </SheetHeader>
                <form className="grid auto-rows-min gap-6 px-4" onSubmit={submit}>
                    {/* Categoria */}
                    <div className="grid gap-3">
                        <Label htmlFor="category">Categoria</Label>
                        <Input
                            id="category"
                            placeholder="Ex: Alimentação, Salário, Transporte..."
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                        />
                        {errors.category && <span className="text-red-500 text-xs">{errors.category}</span>}
                    </div>

                    {/* Tipo da transação */}
                    <div className="grid gap-3">
                        <Label htmlFor="type">Tipo</Label>
                        <Select onValueChange={(value) => setData('type', value)} value={data.type}>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="income">Receita</SelectItem>
                                <SelectItem value="expense">Despesa</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.type && <span className="text-red-500 text-xs">{errors.type}</span>}
                    </div>

                    {/* Valor */}
                    <div className="grid gap-3">
                        <Label htmlFor="amount">Valor</Label>
                        <Input
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            type="number"
                            step="0.01"
                            min="0"
                            id="amount"
                            placeholder="Ex: 150.00"
                        />
                        {errors.amount && <span className="text-red-500 text-xs">{errors.amount}</span>}
                    </div>

                    {/* Data */}
                    <div className="grid gap-3">
                        <Label htmlFor="date">Data</Label>
                        <Input
                            type="date"
                            id="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                        />
                        {errors.date && <span className="text-red-500 text-xs">{errors.date}</span>}
                    </div>

                    {/* Descrição */}
                    <div className="grid gap-3">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            placeholder="Descrição opcional..."
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
                    </div>

                    <SheetFooter className="px-4 py-2">
                        <Button type="submit" disabled={processing}>
                            Salvar
                        </Button>
                        <SheetClose asChild>
                            <Button variant="outline" type="button">Cancelar</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
