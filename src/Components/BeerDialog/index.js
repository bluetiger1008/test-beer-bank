import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Dialog, Typography, Button, Grid, Box } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  productImg: {
    width: '100%',
  },
  tagline: {
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const BeerDialog = ({ data, open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        Beer Information
      </DialogTitle>
      <DialogContent dividers>
        {data && (
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <img
                src={data.image_url}
                alt='beer photo'
                className={classes.productImg}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography variant='h5' gutterBottom>
                {data.name}
              </Typography>
              <Typography variant='h6' className={classes.tagline}>
                {data.tagline}
              </Typography>
              <Box display='flex' my={2}>
                <Typography style={{ marginRight: '1rem' }}>
                  <b>IBU:</b> {data.ibu}
                </Typography>
                <Typography style={{ marginRight: '1rem' }}>
                  <b>ABV:</b> {data.abv}
                </Typography>
                <Typography>
                  <b>EBC:</b> {data.ebc}
                </Typography>
              </Box>

              <Typography gutterBottom>{data.description}</Typography>
              <Typography variant='h6'>
                <b>Best served with:</b>
              </Typography>
              <ul>
                {data.food_pairing.map((pair, i) => (
                  <li key={i}>{pair}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BeerDialog;
