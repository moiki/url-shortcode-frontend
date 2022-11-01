import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useUrlTableHook from "../hookServices/app/useUrlTable.hook";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useSaveUrlHook from "../hookServices/app/useSaveUrl.hook";
import {LinearProgress, useFormControl} from "@mui/material";
import {useEffect, useState} from "react";


export default function HomeView() {
    const [urlControl, setUrlControl] = useState("");
    const [tablePagination, setTablePagination] = useState({page: 1});
    const {dataTable, loading, refetch} = useUrlTableHook();
    const {loading: loadingSave, executeSave} = useSaveUrlHook(refetch);

    const onVisit = () => {
        console.log("refetching...")
        setTimeout(()=> {
            refetch({page:1, perPage: 5})
            document.getElementById("myForm").reset();
        },1000)
    }
    const columns = [
        {
            field: 'original_url',
            headerName: 'Original Url',
            minWidth: 230
        },
        {
            field: 'short_url',
            headerName: 'Shortcode Url',
            renderCell: (param) => <a href={param.value} onClick={onVisit} target={"_blank"}>{param.value}</a>,
            width: 230
        },
        {
            field: 'visits_quantity',
            headerName: 'Visits',
            type: 'number',
            width: 230
        },

    ];
    const paginateThis =(page) => {
        console.log(page)
        setTablePagination({...tablePagination, page});
        refetch({page, perPage: 5})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        const variables = {
            url: urlControl,
        }
        executeSave({variables})
        setUrlControl("")
    };

    return (
        <Grid container={true}>
            <Container maxWidth={"md"} width={"100%"}>
                <Box component="form" id={"myForm"} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="original_url"
                        label="Insert a url"
                        name="original_url"
                        value={urlControl}
                        onChange={(e)=> setUrlControl(e.target.value)}
                        autoFocus
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Generate shortcode url
                    </Button>
                </Box>
                <Box sx={{ width: '100%' }}>
                    {loadingSave && <LinearProgress />}
                </Box>
            </Container>
            <Container maxWidth={"md"} width={"100%"}>
                <div style={{marginTop: "3rem", height: 400, width: '100%'}}>
                    <DataGrid
                        loading={loading}
                        rows={dataTable.docs}
                        columns={columns}
                        rowCount={dataTable.total}
                        page={tablePagination.page -1}
                        paginationMode="server"
                        onPageChange={(newPage) => paginateThis(newPage + 1)}
                        pageSize={5}
                    />
                </div>
            </Container>
        </Grid>
    );
}
