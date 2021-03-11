import Headroom from 'react-headroom';
import { Container, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.header.primary.main,
    minHeight: 50,
  },
  container: {
    height: '100%',
    color: 'white',
    position: 'relative',
  },
  navlinks: {
    position: 'absolute',
    top: 10,
    right: 0,
    '& a': {
      color: 'white',
      marginLeft: 10,
    },
  },
}));

const Header = ({ children }) => {
  const classes = useStyles();

  let location = useLocation();

  return (
    <Headroom>
      <div className={classes.root}>
        <Container className={classes.container}>
          <Box
            height='100%'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Typography variant='h2'>The Beer Bank</Typography>
            {location.pathname !== '/favorite' && (
              <>
                <Typography gutterBottom>
                  Find your favorite beer here
                </Typography>
                {children}
              </>
            )}
            <Box className={classes.navlinks}>
              <Link component={RouterLink} to='/'>
                Home
              </Link>
              <Link component={RouterLink} to='/favorite'>
                Favorite
              </Link>
            </Box>
          </Box>
        </Container>
      </div>
    </Headroom>
  );
};

export default Header;
