import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainComponent from "../../Maincomponent/Main";
import ManagerPage from '../../manager_component/ManagerPage';
import ProductInsert from '../../manager_component/Product/ProductInsert';
import SignUp from '../../signUp_component/component/SignUp';

const AppRouter = () => {
    return(
        <div style={style}>
            <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={MainComponent} />
                        <Route path="/signUp" component={SignUp} />
                        <Route path="/manager" component={ManagerPage} />
                        <Route path="/productInsert" component={ProductInsert} />
                    </Switch>
            </BrowserRouter>
        </div>
    );
}

const style = {
    marginTop: '20px'
}

export default AppRouter;