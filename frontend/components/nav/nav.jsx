import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/session_actions'
import { openModal } from '../../actions/modal_actions'


const Nav = (props) => {
    
    const { currentUser, logout } = props
    
    const openModal = (formType) => {
        return e => {
            e.preventDefault();
            props.openModal(formType)
        }
    }

    const loggedOut = () => (
        <div className="logged-out-nav">
            <div className="nav-login" onClick={openModal('login')}>
                Log in 
            </div>
            <div className="nav-signup" onClick={openModal('signup')}>
                Sign up
            </div>
        </div>        
    )


    const loggedIn = () => (
        <div className="logged-in-nav">
            <div>
            </div>
            <div className="logout-button" onClick={logout}>
                Log out 
            </div>
        </div>
    )

    return currentUser ? loggedIn() : loggedOut()

}

const mSTP = ({session, entities: { users }}) => {
    return {
        currentUser: users[session.id]
    }
}

const mDTP = dispatch => {
    return {
        logout: () => dispatch(logout()),
        openModal: (formType) => dispatch(openModal(formType)),
    }
}

export default connect(mSTP, mDTP)(Nav)