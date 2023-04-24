import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {test} = useContext(Context)
    console.log(test.totalCount)
    const pageCount = Math.ceil(test.totalCount / test.limit)
    const pages = []
    for (let i = 0; i < pageCount; i++){
        pages.push(i + 1)
    }
    return (
        <Pagination className="mt-5">
            {pages.length > 1 && pages.map((page) =>
                <Pagination.Item
                    key={page}
                    active={test.page === page}
                    onClick={() => test.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;