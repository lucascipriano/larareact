import SheetDemo from '@/components/mycomponents/side-sheets';
import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { TrendingDown } from 'lucide-react';
import { TableWrapper } from '@/components/mycomponents/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
type Transaction = {
    id: number;
    description: string;
    category?: string;
    date: string;
    type: 'income' | 'expense';
    amount: number;
};

type Paginated<T> = {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    last_page: number;
};

export default  function Dashboard(){

    const { props } = usePage<{
        recentTransactions: Paginated<Transaction>;
        balance: number;
        moneyout: number;
    }>();

    const { data: recentTransactions, links } = props.recentTransactions;
    const balance = props.balance || [];
    const moneyout = props.moneyout || [];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-2 md:grid-cols-2">
                    {/* Card 1 */}
                    <Card className="overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-sm dark:bg-muted/10">
                        <CardHeader>
                            <CardDescription>Saldo Total</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {balance == 0
                                    ? 'R$ 0,00'
                                    : Number(balance).toLocaleString('pt-BR', {
                                          style: 'currency',
                                          currency: 'BRL',
                                      })}
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
                    {/* Card 2 */}
                    <Card className="overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-sm dark:bg-muted/10">
                        <CardHeader>
                            <CardDescription>Saída</CardDescription>
                            <CardTitle className="text-red- text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {moneyout == 0
                                    ? 'R$ 0,00'
                                    : Number(moneyout).toLocaleString('pt-BR', {
                                          style: 'currency',
                                          currency: 'BRL',
                                      })}
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline">
                                    <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                                    -12.5%
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Saída do mês
                                <TrendingDown className="size-4" />
                            </div>
                            <div className="text-muted-foreground">{/*Visitors for the last 6 months*/}</div>
                        </CardFooter>
                    </Card>
                    {/* Card 3 */}
                    {/*<Card className=" rounded-2xl border border-border bg-muted/40 dark:bg-muted/10 shadow-sm overflow-hidden">*/}
                    {/*    <CardHeader>*/}
                    {/*        <CardDescription>Saída</CardDescription>*/}
                    {/*        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">*/}
                    {/*            R$ 1.250,00*/}
                    {/*        </CardTitle>*/}
                    {/*        <CardAction>*/}
                    {/*            <Badge variant="outline">*/}
                    {/*                <TrendingDown className="w-3.5 h-3.5 text-red-500" />*/}
                    {/*                -12.5%*/}
                    {/*            </Badge>*/}
                    {/*        </CardAction>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardFooter className="flex-col items-start gap-1.5 text-sm">*/}
                    {/*        <div className="line-clamp-1 flex gap-2 font-medium">*/}
                    {/*            Trending up this month*/}
                    {/*            <TrendingDown className="size-4" />*/}
                    {/*        </div>*/}
                    {/*        <div className="text-muted-foreground">*/}
                    {/*            /!*Visitors for the last 6 months*!/*/}
                    {/*        </div>*/}
                    {/*    </CardFooter>*/}
                    {/*</Card>*/}
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Transações Recentes</CardTitle>
                                <CardDescription>Suas últimas movimentações financeiras</CardDescription>
                            </div>
                            <SheetDemo />
                        </CardHeader>
                        <CardContent>
                            <TableWrapper recentTransactions={recentTransactions} links={links} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
