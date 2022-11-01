import {useQuery} from "@apollo/client";
import {GET_URL_TABLE} from "../../graphql/queries.graphql";
import {useSnackbar} from "notistack";
import {useState} from "react";

export default function useUrlTableHook(page = 1, perPage = 5) {
    const {enqueueSnackbar} = useSnackbar()
    const [dataTable, setDataTable] = useState({
        total: 0,
        docs: []
    });

    const {loading, refetch} = useQuery(GET_URL_TABLE, {
        onError: err => {
            console.log(err.message)
            enqueueSnackbar(err.message || 'There was an error!', {
                variant: "error",
                anchorOrigin: {vertical: 'bottom', horizontal: 'center'},
            })
        },
        onCompleted:(data) => {
            const {result} = data;
            const resultWithId = result.docs.map((item, index) => ({...item, id: index}) )
            setDataTable({total: result.total || 0, docs: resultWithId || []})
        },
        variables: {page, perPage}
    })
    return { dataTable, loading, refetch}
}