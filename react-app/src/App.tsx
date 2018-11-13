import './App.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';

import {ApiService} from './services/apiservice'

import { Route, Switch } from 'react-router-dom'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import ConsumerAcceptedServices from './views/consumer/AcceptedServices';
import ConsumerMain from './views/consumer/ConsumerMain';
import ConsumerServices from './views/consumer/Services';
import CreateNewRequest from './views/consumer/CreateNewRequest';
import EditServiceOffer from './views/provider/EditServiceOffer';
import Main from './views/Main';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MyOffers from './views/provider/MyOffers';
import MyRequests from './views/consumer/MyRequests';
import EditRequest from './views/consumer/EditRequest';
import MyServiceOffers from './views/provider/MyServiceOffers';
import Profile from './views/Profile';
import ProviderAcceptedServices from './views/provider/AcceptedServices';
import ProviderMain from './views/provider/ProviderMain';
import ProviderServiceOffer from './views/provider/ServiceOffer';
import ProviderServiceRequest from './views/provider/ServiceRequest';
import PublicProfile from './views/PublicProfile';
import Requests from './views/provider/Requests';
import ResponsiveDrawer from './components/NavBar'
import SXCustomTheme from './components/Theme';
import Service from './views/consumer/Service';
import ServiceOffer from './views/consumer/ServiceOffer';
import ServiceRequest from './views/consumer/ServiceRequest';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  }
});

interface IAppProps extends WithStyles<typeof styles> {
}

class App extends React.Component<IAppProps> {
  public static contextTypes = {
    router: PropTypes.object
  };
  public state = {
    loggedIn: false
  };
  private apiService: ApiService;
  public constructor(props: IAppProps) {
    super(props);
    this.apiService = new ApiService();
  }
  public componentWillMount() {
    this.apiService.getLoggedUserProfile().then(userProfile => {
      this.setState({ loggedIn: true });
      }
    ).catch(error => { // redirect user to login page if not logged
      window.location.href = '/login'
    })
  }

  public render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={SXCustomTheme}>
        { this.state.loggedIn &&
        <div className="App">
          <ResponsiveDrawer title={this.findComponentTitle()} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route title="Home" exact path='/' component={Main}/>
              <Route title="Profile" exact path='/profile' component={Profile}/>
              <Route title="Public Profile" exact path='/publicprofile/:id' component={PublicProfile}/>
              <Route title="I need something"exact path='/consumer' component={ConsumerMain}/>
              <Route title="I provide something"exact path='/provider' component={ProviderMain}/>
              <Route title="Available services" path='/consumer/available_services' component={ConsumerServices}/>
              <Route title="Service offer" path='/consumer/serviceoffer/:id' component={ServiceOffer}/>
              <Route title="Provider Service offer" path='/provider/serviceoffer/:id' component={ProviderServiceOffer}/>
              <Route title="My requests" path='/consumer/my_requests' component={MyRequests}/>
              <Route title="My accepted services" path='/consumer/accepted_services' component={ConsumerAcceptedServices}/>
              <Route title="My accepted services" path='/provider/accepted_services' component={ProviderAcceptedServices}/>
              <Route title="Request" path='/request/:id' component={ServiceRequest}/>
              <Route title="Provider Request" path='/provider/request/:id' component={ProviderServiceRequest}/>
              <Route title="Consumer Service" path='/consumer/service/:id' component={Service}/>
              <Route title="Provider Service" path='/provider/service/:id' component={Service}/>
              <Route title="Create new request" path='/consumer/create_request' component={CreateNewRequest}/>
              <Route title="Edit service offer" path='/provider/edit_service_offer/:id' component={EditServiceOffer}/>
              <Route title="Create service offer" path='/provider/create_service_offer' component={EditServiceOffer}/>
              <Route title="edit request" path='/consumer/edit_request/:id' component={EditRequest}/> 
              <Route title="My service offers" path='/provider/my_service_offers' component={MyServiceOffers}/>
              <Route title="My offers" path='/provider/my_offers' component={MyOffers}/>
              <Route title="Open requests" path='/provider/open_requests' component={Requests}/>
            </Switch>
          </main>
        </div>
       }
      </MuiThemeProvider>
    );
  }

  private findComponentTitle = () => {
    switch (this.context.router.route.location.pathname) {
      case '/':
        return 'Home';
      case '/profile':
        return 'Profile';
      case '/consumer':
        return 'I need something';
      case '/consumer/available_services':
        return 'Available services';
      case '/consumer/my_requests':
        return 'My requests';
      case '/consumer/accepted_services':
        return 'My accepted services';
      case '/consumer/create_request':
        return 'Create new request';
      case '/consumer/serviceoffer/:id':
        return 'Service offer';
      case '/provider':
        return 'I provide something';
      case '/provider/my_service_offers':
        return 'My service offers';
      case '/provider/my_offers':
        return 'My offers';
      case '/provider/accepted_services':
        return 'My accepted services';
      case '/provider/open_requests':
        return 'Open requests';
      case '/consumer/edit_request':
        return 'Edit Request';
      default:
        return 'Page not found';
    }
  }
}

export default withStyles(styles, { withTheme: true })(App);
