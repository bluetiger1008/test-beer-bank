import { useState, useContext, useEffect } from 'react';
import { Card, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { AppContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    position: 'relative',
  },
  card: {
    paddingTop: 20,
    height: 300,
    textAlign: 'center',
    '& h5': {
      color: orange[500],
    },
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '1px 2px 8px 0 rgb(0, 0, 0, 0.5)',
    },
  },
  productImg: {
    height: 150,
    marginBottom: 20,
  },
  btnFavorite: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
}));

const BeerCard = ({ data, onSelectCard }) => {
  const context = useContext(AppContext);
  const classes = useStyles();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (context.favoriteBeers.findIndex((x) => x.id === data.id) >= 0) {
      setIsFavorited(true);
    }
  }, []);

  const onClickFavorite = () => {
    setIsFavorited(!isFavorited);
    context.onSaveFavoriteBeers(data);
  };

  return (
    <div className={classes.cardWrapper}>
      <Card className={classes.card} onClick={onSelectCard}>
        <img
          src={data.image_url}
          alt='beer photo'
          className={classes.productImg}
        />
        <Typography variant='h5' gutterBottom>
          {data.name}
        </Typography>
        <Typography>{data.tagline}</Typography>
      </Card>
      <IconButton
        aria-label='star'
        className={classes.btnFavorite}
        onClick={onClickFavorite}
      >
        {isFavorited ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </div>
  );
};

export default BeerCard;
