import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainComponent from "../../Maincomponent/Main";
import ManagerPage from '../../manager_component/ManagerPage';
import SignUp from '../../signUp_component/component/SignUp';
import SignUpError from "../../errComponent/SignUpError"
import ProductInsertError from "../../errComponent/ProductInsertError"
import DeliveryStatusError from "../../errComponent/DeliveryStatusError"
import ManagerDefaultErr from "../../errComponent/ManagerDefaultErr"
const AppRouter = () => {
    return(
        <div style={style}>
            <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={MainComponent} />
                        <Route path="/signUp" component={SignUp} />
                        <Route path="/manager" component={ManagerPage} />
                        <Route path="/signUpError" component={SignUpError} />
                        <Route path="/productInsertError" component={ProductInsertError} />
                        <Route path="/deliveryStatusError" component={DeliveryStatusError} />
                        <Route path="/managerDefaultErr" component={ManagerDefaultErr} />
                    </Switch>
            </BrowserRouter>
        </div>
    );
}

const style = {
    marginTop: '20px'
}

export default AppRouter;