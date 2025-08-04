import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown } from 'lucide-react';

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
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-2 md:grid-cols-3">
                    {/*card 1*/}
                    <Card className="overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-sm dark:bg-muted/10">
                        <CardHeader>
                            <CardDescription>Total de Despesas</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {fixedExpenses.length}
                            </CardTitle>
                            <CardAction>
                                {/*<Badge variant="outline">*/}
                                {/*    <TrendingUp className="w-3.5 h-3.5 text-green-500" />*/}
                                {/*    +12.5%*/}
                                {/*</Badge>*/}
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">Total em conta</div>
                            <div className="text-muted-foreground">Valor atualizado sempre que adicionar ou remover uma transação</div>
                        </CardFooter>
                    </Card>
                    {/*Card 2*/}
                    <Card className="overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-sm dark:bg-muted/10">
                        <CardHeader>
                            <CardDescription>Valor total</CardDescription>
                            <CardTitle className="text-red-500 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </CardTitle>

                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                {/*Saída do mês*/}
                            </div>
                            <div className="text-muted-foreground">{/*Visitors for the last 6 months*/}</div>
                        </CardFooter>
                    </Card>

                    {/*Card 3*/}

                    <Card className=" rounded-2xl border border-border bg-muted/40 dark:bg-muted/10 shadow-sm overflow-hidden">
                        <CardHeader>
                            <CardDescription>Despesas ativas</CardDescription>
                            <CardTitle className="text-2xl text-yellow-500 font-semibold tabular-nums @[250px]/card:text-3xl">
                                {activeExpenses?.length}
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline">
                                    <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                                    -12.5%
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Trending up this month
                                <TrendingDown className="size-4" />
                            </div>
                            <div className="text-muted-foreground">
                                {/*Visitors for the last 6 months*/}
                            </div>
                        </CardFooter>
                    </Card>
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
