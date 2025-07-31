import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fixed Expenses',
        href: '/fixed-expenses',
    },
];

interface FixedExpense {
    id: number;
    user_id: number;
    name: string;
    amount: number;
    category: string;
    description: string;
    due_day: number;
    starts_at: string | null;
    ends_at: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    fixedExpenses: FixedExpense[];
}

export default function FixedExpenses({ fixedExpenses = [] }: Props) {
    console.log('Props recebidas:', { fixedExpenses });

    const totalAmount = fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const activeExpenses = fixedExpenses.filter(expense => expense.is_active);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fixed Expenses" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="rounded-xl border p-4">
                        <h3 className="text-lg font-semibold">Total de Despesas</h3>
                        <p className="text-2xl font-bold">{fixedExpenses.length}</p>
                    </div>
                    <div className="rounded-xl border p-4">
                        <h3 className="text-lg font-semibold">Valor Total</h3>
                        <p className="text-2xl font-bold">
                            R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="rounded-xl border p-4">
                        <h3 className="text-lg font-semibold">Despesas Ativas</h3>
                        <p className="text-2xl font-bold">{activeExpenses.length}</p>
                    </div>
                </div>

                <div className="rounded-xl border p-4">
                    <h2 className="text-xl font-semibold mb-4">Lista de Despesas Fixas</h2>
                    {fixedExpenses.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Nenhuma despesa fixa encontrada.</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {fixedExpenses.map((expense) => (
                                <div key={expense.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h3 className="font-semibold text-lg mb-2">{expense.name}</h3>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Valor:</strong> R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                        <p><strong>Categoria:</strong> {expense.category}</p>
                                        <p><strong>Descrição:</strong> {expense.description || 'Sem descrição'}</p>
                                        <p><strong>Dia de vencimento:</strong> {expense.due_day}</p>
                                        <p>
                                            <strong>Status:</strong>
                                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                                                expense.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {expense.is_active ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </p>
                                        {expense.starts_at && (
                                            <p><strong>Início:</strong> {new Date(expense.starts_at).toLocaleDateString('pt-BR')}</p>
                                        )}
                                        {expense.ends_at && (
                                            <p><strong>Fim:</strong> {new Date(expense.ends_at).toLocaleDateString('pt-BR')}</p>
                                        )}
                                        <p className="text-xs text-gray-500">
                                            Criado em: {new Date(expense.created_at).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
