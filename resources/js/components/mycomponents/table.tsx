import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationWrapper } from '@/components/mycomponents/pagination';
import { Badge } from '@/components/ui/badge';

type Transaction = {
    id: number;
    description: string;
    category?: string;
    date: string;
    type: 'income' | 'expense';
    amount: number;
};

type TableWrapperProps = {
    recentTransactions: Transaction[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
};
export function TableWrapper({ recentTransactions, links }: TableWrapperProps) {
    return (
        <>
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
                                {new Date(transaction.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                            </TableCell>
                            <TableCell
                                className={`text-right font-medium ${
                                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {transaction.type === 'income' ? '+' : '-'} R${' '}
                                {Math.abs(transaction.amount).toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationWrapper links={links} />
        </>
    );
}
