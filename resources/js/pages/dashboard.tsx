import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SheetDemo from '@/components/mycomponents/side-sheets';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const {props} = usePage();
    const recentTransactions = props.recentTransactions || [];

    console.log('Transações recentes:', recentTransactions);
    console.log('Props:', props);
    // @ts-ignore
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid gap-2 md:grid-cols-3">
                    {/* Card 1 */}
                    <Card className="rounded-2xl border border-border bg-muted/40 dark:bg-muted/10 shadow-sm overflow-hidden">
                        <CardHeader>
                            <CardDescription>Saldo</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                R$ 1.000,00
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline">
                                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                                    +12.5%
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Trending up this month
                                <TrendingUp className="size-4" />
                            </div>
                            <div className="text-muted-foreground">
                                {/*Visitors for the last 6 months*/}
                            </div>
                        </CardFooter>
                    </Card>
                    {/* Card 2 */}
                    <Card className=" rounded-2xl border border-border bg-muted/40 dark:bg-muted/10 shadow-sm overflow-hidden">
                        <CardHeader>
                            <CardDescription>Entrada</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                R$ 1.250,00
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
                    {/* Card 3 */}
                    <Card className=" rounded-2xl border border-border bg-muted/40 dark:bg-muted/10 shadow-sm overflow-hidden">
                        <CardHeader>
                            <CardDescription>Saída</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                R$ 1.250,00
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
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Transações Recentes</CardTitle>
                                <CardDescription>Suas últimas movimentações financeiras</CardDescription>
                            </div>
                                <SheetDemo/>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Descrição</TableHead>
                                        <TableHead>Categoria</TableHead>
                                        <TableHead>Data</TableHead>
                                        <TableHead className="text-right">Valor</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-medium">{transaction.description}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{transaction.category ?? 'Sem categoria'}</Badge>
                                            </TableCell>
                                            <TableCell className="text-gray-500">
                                                {new Date(transaction.date).toLocaleDateString("pt-BR")}
                                            </TableCell>
                                            <TableCell
                                                className={`text-right font-medium ${
                                                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                                                }`}
                                            >
                                                {transaction.type === "income" ? "+" : "-"} R$ {Math.abs(transaction.amount).toLocaleString("pt-BR", {
                                                minimumFractionDigits: 2,
                                            })}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
