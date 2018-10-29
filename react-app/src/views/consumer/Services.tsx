import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import {ApiService} from '../../services/apiservice'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {ICategory} from '../../models/models'
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    }
});

interface IConsumerServicesProps extends WithStyles<typeof styles> {
}

interface IState {
  categories: ICategory[];
};


class ConsumerServices extends React.Component<IConsumerServicesProps, IState> {
  public state = {
    categories: [] as ICategory[],
  };
  private apiService: ApiService;
  public constructor(props: IConsumerServicesProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentDidMount(){
    this.apiService.getCategories().then(categories => this.setState({ categories }))
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs={12}>
            <List>
            {this.state.categories.map(category => (
              <ListItem key={category.id} dense button>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={`Category item ${category.category + 1}`} secondary="Jan 9, 2014" />
              </ListItem>
            ))}
            {[0, 1, 2, 3].map(value => (
              <ListItem key={value} dense button>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={`Line item ${value + 1}`} secondary="Jan 9, 2014" />
              </ListItem>
            ))}
          </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ConsumerServices);