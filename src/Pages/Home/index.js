import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid, Box, TextField, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link as RouterLink } from 'react-router-dom';

import { searchBeerAPI } from '../../Helpers/apis';
import Header from '../../Components/Header';
import BeerCard from '../../Components/BeerCard';
import { AppContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  input: {
    width: 300,
    '& .MuiInputBase-root': {
      background: 'white',
    },
  },
  searchLink: {
    margin: '0.5rem 0',
    color: 'white',
  },
}));

const Home = () => {
  const classes = useStyles();
  const context = useContext(AppContext);
  const [beers, setBeers] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const searchBeers = async (pageIndex) => {
    try {
      const res = await searchBeerAPI(
        `?page=${pageIndex}&per_page=6${
          searchName !== '' ? `&beer_name=${searchName}` : ''
        }`
      );
      let beersArr = [];

      if (pageIndex === 1) {
        beersArr = [...res.data];
      } else {
        beersArr = [...beers, ...res.data];
      }

      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setPageIndex(pageIndex);
      setBeers(beersArr);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    searchBeers(pageIndex);
  }, []);

  const onFetchMore = () => {
    searchBeers(pageIndex + 1);
  };

  useEffect(() => {
    searchBeers(1);
  }, [searchName]);

  const handleChange = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <div>
      <Header>
        <TextField
          id='outlined-basic'
          label='Search for beer name'
          variant='filled'
          className={classes.input}
          onChange={handleChange}
          value={searchName}
        />
        <Link
          component={RouterLink}
          to='/advanced-search'
          className={classes.searchLink}
        >
          Advanced search
        </Link>
      </Header>
      <Container>
        <Box py={5}>
          <InfiniteScroll
            dataLength={beers.length}
            next={onFetchMore}
            hasMore={hasMore}
            loader={
              <Grid item xs={12}>
                Loading...
              </Grid>
            }
            endMessage={
              <Grid item xs={12}>
                <b>Yay! You have seen it all</b>
              </Grid>
            }
            className='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3'
          >
            {beers.map((beer) => (
              <Grid item md={4} sm={6} xs={12} key={beer.id}>
                <BeerCard
                  data={beer}
                  onSelectCard={() => {
                    context.onClickBeerCard(beer);
                  }}
                />
              </Grid>
            ))}
          </InfiniteScroll>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
