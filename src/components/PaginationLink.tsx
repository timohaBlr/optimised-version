import * as React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {initialStateType} from "../redux/reducers/items-reducer";
import {setPageAC} from "../redux/reducers/Actions";

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
            style={{display: 'flex',justifyContent: 'center'}}
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

