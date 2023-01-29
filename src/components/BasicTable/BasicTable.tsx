import React, {MouseEvent, useMemo} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {initialStateFetchingTC, initialStateType, setFilteredItemTC} from "../../redux/reducers/items-reducer";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {setPageAC} from "../../redux/reducers/Actions";
import {Dispatch} from "redux";


export const BasicTable = React.memo(() => {

    const {data, filteredItem, per_page} = useSelector<AppRootStateType, initialStateType>(state => state.items)
    // why any is nessesary here?
    const dispatch: Dispatch<any> = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const pageFromURL = Number(searchParams.get('page'))
    const idFromURL = searchParams.get('id')
    useEffect(() => {
        // dispatch(setPageAC(pageFromURL))
        if (idFromURL) {
            dispatch(setFilteredItemTC(idFromURL))
        } else {
            dispatch(initialStateFetchingTC(per_page, pageFromURL))
        }
    }, [dispatch, per_page, pageFromURL])


    //items to render
    const mappedRows = useMemo(() => (filteredItem
        ? [filteredItem]
        : data).map((row) => (
        <TableRow
            key={row.id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            style={{backgroundColor: row.color}}
        >
            <TableCell component="th" scope="row">
                {row.id}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.year}</TableCell>
        </TableRow>
    )), [data, filteredItem])


    const emptyRows = useMemo(() => per_page - mappedRows.length, [per_page, mappedRows])


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mappedRows}
                    {emptyRows > 0 && (
                        <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={3}/>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
})