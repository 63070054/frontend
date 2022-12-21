import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBeersProps {
    queryBeer: string;
    handlerSearchBeer: (a: string) => void;
}

export default function SearchBeers({ queryBeer, handlerSearchBeer }: SearchBeersProps) {


    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            className="width-100"
            elevation={2}
        >
            <InputBase
                value={queryBeer}
                onChange={(e) => handlerSearchBeer(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
                placeholder="ค้นหาชื่อเบียร์"
                inputProps={{ 'aria-label': 'ค้นหาจากชื่อเบียร์' }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="search" disabled>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}