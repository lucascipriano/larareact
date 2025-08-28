import { router } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type Link = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationWrapperProps = {
    links: Link[];
};

export function PaginationWrapper({ links }: PaginationWrapperProps) {
    const getLabel = (label: string) => {
        if (label.includes("Previous")) return "Anterior";
        if (label.includes("Next")) return "Próximo";
        return label;
    };

    const handleClick = (e: React.MouseEvent, url: string | null) => {
        e.preventDefault(); // evita reload completo
        if (url) {
            router.get(url, {}, { preserveState: true, preserveScroll: true });
        }
    };

    return (
        <div className="flex justify-end mt-4">
            <Pagination>
                <PaginationContent>
                    {links.map((link, index) => {
                        const isPrevious = link.label.includes("Previous");
                        const isNext = link.label.includes("Next");

                        if (isPrevious) {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationPrevious
                                        href={link.url || "#"}
                                        className={!link.url ? "opacity-50 pointer-events-none" : ""}
                                        onClick={(e) => handleClick(e, link.url)}
                                    />
                                </PaginationItem>
                            );
                        }

                        if (isNext) {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationNext
                                        href={link.url || "#"}
                                        className={!link.url ? "opacity-50 pointer-events-none" : ""}
                                        onClick={(e) => handleClick(e, link.url)}
                                    />
                                </PaginationItem>
                            );
                        }

                        if (link.label === "...") {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href={link.url || "#"}
                                    isActive={link.active}
                                    className={!link.url ? "opacity-50 pointer-events-none" : ""}
                                    onClick={(e) => handleClick(e, link.url)}
                                >
                                    {getLabel(link.label)}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
