import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {
    initialStateType,
    setFilteredItemTC
} from "../../redux/reducers/items-reducer";
import {Dispatch} from "redux";
import {useSearchParams} from "react-router-dom";
import {setErrorAC, setFilteredItemAC} from "../../redux/reducers/Actions";

const style = {
    color: 'action.active',
    mr: 1,
    my: 0.5,
}

export const InputWithIcon = React.memo(() => {
    const dispatch: Dispatch<any> = useDispatch()
    const {error, searchFieldValue, page} =
        useSelector<AppRootStateType, initialStateType>(state => state.items)
    const [searchParams, setSearchParams] = useSearchParams()

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        dispatch(setFilteredItemTC(value))
        if (!Number.isNaN(Number(value))) {
            setSearchParams({...Object.fromEntries(searchParams), id: value})
        }
    }
    const blurHandler = () => {
        if (error === 'Accept only integers') {
            console.log('Accept only integers')
           dispatch( setErrorAC(null))
        } else if (searchFieldValue === '') {
            dispatch(setFilteredItemAC(null))
            dispatch(setErrorAC(''))
            setSearchParams({page: '' + page})
        }


    }

    return (
        <Box sx={{'& > :not(style)': {m: 1}, display: 'flex', justifyContent: 'center'}}>

            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <ManageSearchIcon sx={style}/>
                <TextField id="Search..." label="Search..." variant="standard"
                           onChange={changeHandler}
                           error={!!error}
                           value={searchFieldValue}
                           helperText={error ? error : ' '}
                           onBlur={blurHandler}
                />
            </Box>
        </Box>
    );
})