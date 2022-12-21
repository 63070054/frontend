import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
interface BeerProps {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    isLogin: boolean;
}

export default function CardBeer({ id, name, description, imageUrl, isLogin }: BeerProps) {


    const MAX_LENGTH_DESCRIPTION = 30

    if (description.length > MAX_LENGTH_DESCRIPTION) {
        description = description.slice(0, MAX_LENGTH_DESCRIPTION) + "...";
    }

    const addToFavoriteBeer = (id: string) => {
        console.log("add")
    }

    return (
        <Card sx={{ maxWidth: 345 }} className="center-y" >
            <CardMedia
                component="img"
                height="140"
                image={imageUrl ? imageUrl : "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" className='word-wrap'>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className='word-wrap'>
                    {description}
                </Typography>
            </CardContent>
            <CardActions >
                {(isLogin) && (
                    <IconButton aria-label="add to favorites" onClick={() => addToFavoriteBeer("3")}>
                        <FavoriteIcon />
                    </IconButton>
                )}
                {id != 0 ? (
                    <Link style={{ textDecoration: 'none' }} to={`/beer/${id}`}>
                        <Button size="small">อ่านเพิ่มเติม</Button>
                    </Link>
                ) : (
                    <Button size="small">อ่านเพิ่มเติม</Button>
                )}
            </CardActions>
        </Card>
    );
}