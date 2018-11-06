import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {IServiceRequestOffer} from '../../models/models'
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    }
});

interface IMyOffersProps extends WithStyles<typeof styles> {
}

interface IState {
  myOffers: IServiceRequestOffer[];
};


class MyOffers extends React.Component<IMyOffersProps, IState> {
  public state = {
    myOffers: [] as IServiceRequestOffer[]
  };
  private apiService: ApiService;
  public constructor(props: IMyOffersProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getMyServiceRequestOffers().then(myOffers => this.setState({ myOffers }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
              {this.state.myOffers.length === 0 &&
              <Typography variant="body1" gutterBottom>
                You have not made any offers. Go browse the requests and make offers.
              </Typography>
              }
              {this.state.myOffers.map(offer => (
                <ListItem key={offer.id} dense button>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={`${offer.price}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyOffers);