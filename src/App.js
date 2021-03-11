import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import Home from './Pages/Home';
import Favorite from './Pages/Favorite';
import AdvancedSearch from './Pages/AdvancedSearch';
import BeerDialog from './Components/BeerDialog';

const theme = createMuiTheme({
  header: {
    primary: {
      main: orange[500],
    },
  },
});

export const AppContext = createContext();

function App() {
  const [favoriteBeers, setFavoriteBeers] = useState([]);
  const [selectedBeer, setSelectedBeer] = useState();
  const [openBeerDialog, setOpenBeerDialog] = useState(false);

  const onSaveFavoriteBeers = (beer) => {
    let arr = [...favoriteBeers];

    if (favoriteBeers.findIndex((x) => x.id === beer.id) >= 0) {
      arr.splice(
        favoriteBeers.findIndex((x) => x.id === beer.id),
        1
      );
    } else {
      arr = [...favoriteBeers, beer];
    }

    console.log(arr);
    setFavoriteBeers(arr);
  };

  const onCloseBeerDialog = () => {
    setOpenBeerDialog(false);
  };

  const onClickBeerCard = (data) => {
    setOpenBeerDialog(true);
    setSelectedBeer(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{ favoriteBeers, onSaveFavoriteBeers, onClickBeerCard }}
      >
        <div className='App'>
          <Router>
            <div>
              <Switch>
                <Route path='/advanced-search'>
                  <AdvancedSearch />
                </Route>
                <Route path='/favorite'>
                  <Favorite />
                </Route>
                <Route path='/'>
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
          <BeerDialog
            data={selectedBeer}
            open={openBeerDialog}
            handleClose={onCloseBeerDialog}
          />
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
