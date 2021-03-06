import React from 'react'
import { Link } from 'react-router'
import { Accounts } from 'meteor/accounts-base'

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  onSubmit(e) {
    e.preventDefault()

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if(password.length < 8) { return this.setState(
      {error: 'Password must be more than 8 characters long'})}


    Accounts.createUser({email, password}, (err) => {
      err ? this.setState({error: err.reason}) :
        this.setState({error: ''})
    })

    // this.setState({
    //   error: 'Something went wrong.'
    // })
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1 className="boxed-view__title">Join</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate
            className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password"
              name="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    )
  }
}
