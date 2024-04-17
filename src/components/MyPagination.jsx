import { Pagination } from "react-bootstrap";

function MyPagination({ total, current, onChangePage }) {

    let items = [];

    if (current > 0) {
        items.push(<Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />);
    }

    items.push(
        <Pagination.Item
            key={0}
            data-page={0}
            active={0 === current}
            onClick={() => onChangePage(0)}>

            {1}
        </Pagination.Item>
    );

    if (current > 2) {
        items.push(<Pagination.Ellipsis key='elip1' disabled />)
    }

    for (let page = 1; page < total - 1; page = page + 1) {
        if (Math.abs(page - current) <= 1) {
            items.push(
                <Pagination.Item
                    key={page}
                    data-page={page}
                    active={page === current}
                    onClick={() => onChangePage(page)}>

                    {page + 1}
                </Pagination.Item>
            );
        }
    }

    if (current < total - 3) {
        items.push(<Pagination.Ellipsis key='elip2' disabled />)
    }

    items.push(
        <Pagination.Item
            key={total - 1}
            data-page={total - 1}
            active={total - 1 === current}
            onClick={() => onChangePage(total - 1)}>

            {total}
        </Pagination.Item>
    );

    if (current < total - 1) {
        items.push(<Pagination.Next key="next" onClick={() => onChangePage(current + 1)} />)
    }

    return (
        <Pagination className="d-flex justify-content-end">{items}</Pagination>
    )
}

export default MyPagination;