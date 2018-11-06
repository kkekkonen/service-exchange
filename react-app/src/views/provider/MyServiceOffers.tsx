import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import AddIcon from '@material-ui/icons/Add';
import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {IServiceOffer} from '../../models/models'
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

interface IMyServiceOffersProps extends WithStyles<typeof styles> {
}

interface IState {
  myServiceOffers: IServiceOffer[];
};


class MyServiceOffers extends React.Component<IMyServiceOffersProps, IState> {
  public state = {
    myServiceOffers: [] as IServiceOffer[]
  };
  private apiService: ApiService;
  public constructor(props: IMyServiceOffersProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getMyServiceOffers().then(myServiceOffers => this.setState({ myServiceOffers }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
              {this.state.myServiceOffers.length === 0 &&
              <Typography variant="body1" gutterBottom>
                You do not yet have any service offers. Why not create one now if you have something you can provide?
              </Typography>
              }
              {this.state.myServiceOffers.map(serviceOffer => (
                <ListItem key={serviceOffer.id} dense button component='a' href={`/app/#/consumer/service_offer/${serviceOffer.id}`}>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={`${serviceOffer.title}`} />
                </ListItem>
              ))}
            </List>
          <Button variant="fab" className={classes.fab} color="primary" component='a' href={"/app/#/provider/create_service_offer"}>
            <AddIcon />
          </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyServiceOffers);