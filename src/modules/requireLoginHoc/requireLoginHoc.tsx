import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import {profileStore} from "../profile/ProfileStore";


export function withLogin(WrappedComponent:any){

    @observer
    class AuthenticatedComponent extends React.Component {
         render() {
            if(profileStore.getProfile){
                return(
                    <WrappedComponent/>
                )
            } else return <Redirect to="/login"/>

         }
     }
     return AuthenticatedComponent
 } 
 