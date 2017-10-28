import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Signup from '../ui/Signup'
import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/dashboard']

const onEnterPublicPage = () =>
  Meteor.userId() ? browserHistory.replace('/dashboard') : undefined

const onEnterPrivatePage = () =>
  !Meteor.userId() ? browserHistory.replace('/') : undefined


export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

export const onAuthChange = (isAuthenticated) =>{
  const pathname = browserHistory.getCurrentLocation().pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/')
  }
}
