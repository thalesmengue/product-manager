import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type ProductsQueryType = {
    data?: {
        meta?: {
            from: number
            to: number
            total?: number
            last_page?: number
        }
    }
}

export default function ProductPagination({
                                              page,
                                              setPage,
                                              productsQuery,
                                          }: {
    page: number
    setPage: (page: number) => void
    productsQuery?: ProductsQueryType
}) {
    if (!productsQuery || !productsQuery.data) return null

    const from = productsQuery.data.from || productsQuery.data.meta?.from
    const to = productsQuery.data.to || productsQuery.data.meta?.to
    const total = productsQuery.data.meta?.total || 0
    const last_page = productsQuery.data.meta?.last_page || 1

    if (!from || !to || !total) return null

    const getPageNumbers = () => {
        const pageNumbers = []

        pageNumbers.push(1)

        const rangeStart = Math.max(2, page - 1)
        const rangeEnd = Math.min(last_page - 1, page + 1)

        if (rangeStart > 2) {
            pageNumbers.push("ellipsis-start")
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            pageNumbers.push(i)
        }

        if (rangeEnd < last_page - 1) {
            pageNumbers.push("ellipsis-end")
        }

        if (last_page > 1) {
            pageNumbers.push(last_page)
        }

        return pageNumbers
    }

    return (
        <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
                Showing {from} to {to} of {total} results
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (page > 1) setPage(page - 1)
                            }}
                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {getPageNumbers().map((pageNumber, index) => {
                        if (pageNumber === "ellipsis-start" || pageNumber === "ellipsis-end") {
                            return (
                                <PaginationItem key={`ellipsis-${index}`}>
                                    <PaginationEllipsis/>
                                </PaginationItem>
                            )
                        }

                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setPage(Number(pageNumber))
                                    }}
                                    isActive={page === pageNumber}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (page < last_page) setPage(page + 1)
                            }}
                            className={page === last_page ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}