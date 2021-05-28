import React from 'react';
import { Route, Switch} from 'react-router-dom';
import { Redirect } from 'react-router';
import LandingPage from '../LandingPage';
import PhotoGrid from '../PhotoGrid';


const Routes = () =>{
    return(
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/photogrid" component={PhotoGrid} />
            <Route name="app" path="/" handler={LandingPage}>
                <Redirect exact from="/" to="/"/>
            </Route>
        </Switch>
    );
}


export default Routes;