import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import MaskedInput from 'react-text-mask';

import { searchBeerAPI } from '../../Helpers/apis';
import Header from '../../Components/Header';
import BeerCard from '../../Components/BeerCard';
import { AppContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  input: {
    width: 200,
    margin: '0.5rem',
    '& .MuiInputBase-root': {
      background: 'white',
    },
  },
  maskInput: {
    width: 200,
    margin: '0.5rem',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    '& .MuiFilledInput-input': {
      background: 'white',
    },
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const AdvancedSearch = () => {
  const classes = useStyles();
  const context = useContext(AppContext);
  const [beers, setBeers] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchFields, setSearchFields] = useState({
    maxIbu: '',
    minIbu: '',
    maxAbv: '',
    minAbv: '',
    maxEbc: '',
    minEbc: '',
    brewedBefore: '',
    brewedAfter: '',
  });

  const searchBeers = async (pageIndex) => {
    try {
      const res = await searchBeerAPI(
        `?page=${pageIndex}&per_page=9${
          searchFields.maxIbu !== '' ? `&ibu_lt=${searchFields.maxIbu}` : ''
        }${searchFields.minIbu !== '' ? `&ibu_gt=${searchFields.minIbu}` : ''}${
          searchFields.maxAbv !== '' ? `&abv_lt=${searchFields.maxAbv}` : ''
        }${searchFields.minAbv !== '' ? `&abv_gt=${searchFields.minAbv}` : ''}${
          searchFields.maxEbc !== '' ? `&ebc_lt=${searchFields.maxEbc}` : ''
        }${searchFields.minEbc !== '' ? `&ebc_gt=${searchFields.minEbc}` : ''}${
          searchFields.brewedBefore !== ''
            ? `&brewed_before=${searchFields.brewedBefore}`
            : ''
        }${
          searchFields.brewedAfter !== ''
            ? `&brewedAfter=${searchFields.brewedAfter}`
            : ''
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
  }, [searchFields]);

  const handleChange = (event) => {
    setSearchFields({
      ...searchFields,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Header>
        <Box display='flex' flexWrap='wrap' justifyContent='center'>
          <TextField
            id='outlined-basic'
            label='Max IBU'
            variant='filled'
            className={classes.input}
            name='maxIbu'
            onChange={handleChange}
            value={searchFields.maxIbu}
          />
          <TextField
            id='outlined-basic'
            label='Min IBU'
            variant='filled'
            className={classes.input}
            name='minIbu'
            onChange={handleChange}
            value={searchFields.minIbu}
          />
          <TextField
            id='outlined-basic'
            label='Max ABV'
            variant='filled'
            className={classes.input}
            name='maxAbv'
            onChange={handleChange}
            value={searchFields.maxAbv}
          />
          <TextField
            id='outlined-basic'
            label='Min ABV'
            variant='filled'
            className={classes.input}
            name='minAbv'
            onChange={handleChange}
            value={searchFields.minAbv}
          />
          <TextField
            id='outlined-basic'
            label='Max EBC'
            variant='filled'
            className={classes.input}
            name='maxEbc'
            onChange={handleChange}
            value={searchFields.maxEbc}
          />
          <TextField
            id='outlined-basic'
            label='Min EBC'
            variant='filled'
            className={classes.input}
            name='minEbc'
            onChange={handleChange}
            value={searchFields.minEbc}
          />
          <FormControl variant='filled' className={classes.maskInput}>
            <InputLabel htmlFor='formatted-text-mask-input'>
              Brewed before
            </InputLabel>
            <FilledInput
              value={searchFields.brewedBefore}
              onChange={handleChange}
              name='brewedBefore'
              id='formatted-text-mask-input'
              inputComponent={TextMaskCustom}
            />
          </FormControl>
          <FormControl variant='filled' className={classes.maskInput}>
            <InputLabel htmlFor='formatted-text-mask-input'>
              Brewed after
            </InputLabel>
            <FilledInput
              value={searchFields.brewedAfter}
              onChange={handleChange}
              name='brewedAfter'
              id='formatted-text-mask-input'
              inputComponent={TextMaskCustom}
            />
          </FormControl>
        </Box>
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

export default AdvancedSearch;
