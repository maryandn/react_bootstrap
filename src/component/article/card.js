import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {FavoriteBorder} from "@material-ui/icons";
import AddProduct from "./addProduct";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '70.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function CardList(props) {

    const urlImg = 'http://127.0.0.1:8000'
    const urlImgResponse = props.specifications.img.name
    const brand = props.specifications.brand.name
    const name = props.specifications.name
    const price = props.specifications.price
    const quantity = props.specifications.quantity
    const promotions = props.specifications.promotions
    const color = props.specifications.color.name
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <AddProduct />
            <Card className={classes.root} onMouseEnter={handleExpandClick} onMouseLeave={handleExpandClick}>
                <CardActions className="py-0 d-flex justify-content-between" disableSpacing>
                    {
                        promotions && <IconButton aria-label="buy">
                            <FavoriteBorder/>
                        </IconButton>
                    }
                    <IconButton aria-label="buy">
                        <FavoriteBorder/>
                    </IconButton>
                </CardActions>
                <CardMedia
                    className={classes.media}
                    image={urlImg + urlImgResponse}
                    title="Paella dish"
                />
                <IconButton>
                    <div className='mb-3'
                         style={{
                             backgroundColor: color,
                             border: '1px solid black',
                             width: '20px', height: '20px'
                         }}
                    />
                </IconButton>
                <CardContent className='py-0'>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {brand + ' ' + name}
                    </Typography>
                </CardContent>
                <CardActions className="py-0 d-flex justify-content-between" disableSpacing>
                    <Typography color='error'>{price}₴</Typography>

                    <IconButton aria-label="buy">
                        <ShoppingCartIcon/>
                    </IconButton>
                </CardActions>
                <CardActions className='py-0' disableSpacing>
                    <Typography className='text-success'>{quantity > 5 &&
                    <small className="text-success">Есть в наличии</small>}
                        {quantity <= 5 && quantity > 0 &&
                        <small className="text-warning">Заканчивается</small>}
                        {quantity < 1 &&
                        <small className="text-danger">Нет в наличии</small>}</Typography>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography gutterBottom>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    )
}

export default CardList
