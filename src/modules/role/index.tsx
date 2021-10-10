import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withLogin } from '../requireLoginHoc/requireLoginHoc';
import { profileStore } from '../profile/ProfileStore';
import { Redirect } from 'react-router';

@observer
class index extends Component {

    render() {
       if(profileStore.getProfile){
           return <Redirect to="/user"/>
       }else return true

    }
}

export default withLogin(index);