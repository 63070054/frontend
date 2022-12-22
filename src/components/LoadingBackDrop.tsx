import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingBackDropProp {
    isLoading: boolean;
}


export default function LoadingBackDrop({ isLoading }: LoadingBackDropProp) {

    return (
        <Backdrop
            sx={{ color: '#fff' }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )

}