import * as React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {initialStateType} from "../redux/reducers/items-reducer";
import {setPageAC, setPerPageAC} from "../redux/reducers/Actions";
import TablePagination from '@mui/material/TablePagination';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useTheme} from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

export const PaginationPages = React.memo(() => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    const id = parseInt(query.get('id') || '', 10);

    const {total, per_page} =
        useSelector<AppRootStateType, initialStateType>(state => state.items)
    const count = Math.ceil(total / per_page)
    const dispatch = useDispatch()
    const changeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setPageAC(page))
    }
    return (
        <Pagination
            page={page}
            count={count}
            onChange={changeHandler}
            showFirstButton
            showLastButton
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={id ? `?page=${item.page}&id=${id}` : `?page=${item.page}`}
                    {...item}
                />
            )}
        />
    );
})


export function TablePaginationComponent() {
    const {page, per_page, total, filteredItem} = useSelector<AppRootStateType, initialStateType>(state => state.items)

    const dispatch = useDispatch()
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        console.log(page)
        dispatch(setPageAC(newPage))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setPerPageAC(parseInt(event.target.value, 10)))
        dispatch(setPageAC(1))
    };

    return (
        <TablePagination
            rowsPerPageOptions={[4, 5, 10, {label: 'All', value: total}]}
            // colSpan={3}
            count={filteredItem ? 1 : total}
            rowsPerPage={per_page}
            page={page - 1}
            component="div"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
        />
    );
}

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

const TablePaginationActions = React.memo((props: TablePaginationActionsProps) => {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
})