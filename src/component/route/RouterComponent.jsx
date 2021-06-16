import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginTextComponent from '../../Login/LoginTextComponent';
import MainComponent from "../../Maincomponent/Main";
import ManagerPage from '../../manager_component/ManagerPage';
import ProductDetail from '../../manager_component/Product/ProductDetail';
import ProductInsert from '../../manager_component/Product/ProductInsert';
import ProductInsertOption from '../../manager_component/Product/ProductInsertOption';
import ProductList from '../../manager_component/Product/ProductList';
import UserList from '../../manager_component/User/UserList';
import SignUp from '../../signUp_component/component/SignUp';

const AppRouter = () => {
    return(
        <div style={style}>
            <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={MainComponent} />
                        <Route path="/signUp" component={SignUp} />
                        <Route path="/manager" component={ManagerPage} />
                        <Route path="/login" component={LoginTextComponent} />
                    </Switch>
            </BrowserRouter>
        </div>
    );
}

const style = {
    marginTop: '20px'
}

export default AppRouter;