import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//import ProductComponent from "../user/ProductListCategoryComponent";
//import ProductDetailComponent from "../user/ProductInfoComponet";
//import Demo from "../user/demo";
import MainComponent from "../../Maincomponent/Main";
import SignUp from '../../signUp_component/component/SignUp';
const AppRouter = () => {
    return(
        <div style={style}>
            <BrowserRouter>
                    <Switch>
                        {/* <Route exact path="/" component={UserListComponent} /> */}
                        <Route exact path="/" component={MainComponent} />
                        {/*<Route path="/product-list" component={ProductComponent} />
                        <Route path="/product-detail" component={ProductDetailComponent} />
                        <Route path="/demo" component={Demo} />*/}
                        <Route path="/signUp" component={SignUp} />
                    </Switch>
            </BrowserRouter>
        </div>
    );
}

const style = {
    marginTop: '20px'
}

export default AppRouter;