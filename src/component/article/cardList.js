import React, {memo, useContext, useEffect} from 'react';
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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {FavoriteBorder} from "@material-ui/icons";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";
import AddProduct from "./addProduct";
import clsx from "clsx";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link} from "react-router-dom";

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

    const [, setState] = useContext(CurrentUserContext)

    const idProduct = props.specifications.id
    const urlImg = 'http://127.0.0.1:8000'
    const urlImgResponse = props.specifications.img
    const brand = props.specifications.brand.name
    const name = props.specifications.name
    const price = props.specifications.price
    const quantity = props.specifications.quantity
    const promotions = props.specifications.promotions
    const color = props.specifications.color.name
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const apiUrl = `/product/change_product/${idProduct}`
    const [{response}, doFetch] = useFetch(apiUrl)

    const deleteButton = () => {
        doFetch({method: 'DELETE'})
    }

    useEffect(() => {
        response !== undefined &&
        response !== null &&
        setState(state => ({...state, editCardProduct: !state.editCardProduct}))
    }, [response])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="pr-1 pt-2">
            <Card className={classes.root}>
                <CardActions className="py-0 d-flex justify-content-between" disableSpacing>
                    {
                        promotions && <IconButton aria-label="buy">
                            <FavoriteBorder/>
                        </IconButton>
                    }
                    <IconButton aria-label="buy">
                        <FavoriteBorder/>
                    </IconButton>
                    <div className="d-flex justify-content-between">
                        <AddProduct action={false} specifications={props.specifications}/>
                        <IconButton aria-label="buy" onClick={deleteButton}>
                            <DeleteForeverIcon/>
                        </IconButton>
                    </div>
                </CardActions>
                <Link to="/product_page">
                    <div>
                        <CardMedia
                            className={classes.media}
                            image={urlImg + urlImgResponse}
                            title="Paella dish"
                        />
                    </div>
                </Link>
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
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
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
        </div>
    )
}

export default memo(CardList)
