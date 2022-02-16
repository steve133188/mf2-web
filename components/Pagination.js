import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export function PaginationControlled(props) {
    const {page , handlePageChange} = props

    return (
        <div className="pagination">
            <Stack spacing={2}>
                <Pagination count={10} page={page} onChange={handlePageChange} shape="rounded"/>
            </Stack>
        </div>
    );
}
