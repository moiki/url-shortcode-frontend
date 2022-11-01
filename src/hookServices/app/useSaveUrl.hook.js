import {useSnackbar} from "notistack";
import {useLazyQuery, useMutation} from "@apollo/client";
import {EXEC_LOGIN, SAVE_URL} from "../../graphql/queries.graphql";

export default function useSaveUrlHook(refetch) {
    const { enqueueSnackbar } = useSnackbar();
    const [executeSave, { loading }] = useMutation(SAVE_URL, {
        onCompleted: (data) => {
            enqueueSnackbar(`Done! shortcode is ${data?.SaveUrl}`, {variant: "success", anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }, })
            refetch && refetch()
        },
        onError: (err) => {
            console.log(err.message)
            enqueueSnackbar(err.message || 'There was an error!', {variant: "error", anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }, })
        }
    })

    return {executeSave, loading}
}