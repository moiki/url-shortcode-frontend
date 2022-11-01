import {useLazyQuery} from "@apollo/client";
import {EXEC_LOGIN} from "../../graphql/queries.graphql";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

export default function useAuthentication() {
    const { enqueueSnackbar } = useSnackbar()
    let navigate = useNavigate();
    const [executeLogin, { loading }] = useLazyQuery(EXEC_LOGIN, {
        onCompleted: (data) => {
            console.log(data);
            localStorage.setItem('token', data.Login.token);
            const dateToString = new Date()?.toString();
            localStorage.setItem('latestTokenUpdate', dateToString);
            navigate("/admin")
        },
        onError: (err) => {
            console.log(err.message)
            enqueueSnackbar(err.message || 'There was an error!', {variant: "error", anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }, })
            localStorage.clear()
        }
    })

    return {executeLogin, loading}

}