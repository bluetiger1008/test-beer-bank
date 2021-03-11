import { useContext } from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import BeerCard from '../../Components/BeerCard';
import Header from '../../Components/Header';
import { AppContext } from '../../App';

const Favorite = () => {
  const context = useContext(AppContext);

  return (
    <div>
      <Header />
      <Container>
        <Box py={5}>
          {context.favoriteBeers.length > 0 && (
            <Grid container spacing={3}>
              {context.favoriteBeers.map((beer) => (
                <Grid item md={4} sm={6} xs={12} key={beer.id}>
                  <BeerCard
                    data={beer}
                    onSelectCard={() => {
                      context.onClickBeerCard(beer);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Favorite;
