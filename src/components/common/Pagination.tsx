import Pagination from 'rc-pagination'

function PaginationComponent({
    productsCount,
    perPage,
    current_page,
    handleFilterChange
}: {
    productsCount: number | string
    perPage: number | string
    current_page: number | string
    handleFilterChange: (el: any, object: any) => void
}) {
    return (
        <>
            <div className=' paginate-wrapper text-center'>
                <Pagination
                    pageSize={parseInt(`${perPage}`)}
                    current={parseInt(`${current_page}`)}
                    showTotal={(total: number, range: any) => `${range[0]}-${range[1]} of ${total} items`}
                    total={parseInt(`${productsCount}`)}
                    onChange={(pgNumber: number) => {
                        handleFilterChange(null, {
                            key: 'page',
                            value: pgNumber
                        })
                    }}
                    prevIcon={'<'}
                    nextIcon={'>'}
                />
            </div>
        </>
    )
}

export default PaginationComponent
