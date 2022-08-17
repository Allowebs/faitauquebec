import React, { useEffect, useState, useRef  } from 'react'
import { connect } from 'react-redux'
import SplashPage from './splash_page'
import { splashInfo} from './fetch_splash_info'
import SignupFormContainer from '../session_form/signup_form_container'
import DiscoverPins from '../pins/pin_index'

const Splash = (props) => {

    const { currentUser } = props
    
    const [currentPage, setCurrentPage] = useState(0)
    
    const arrowDownRef = useRef(null)
    const arrowUpRef = useRef(null)
    const pageButtons = ["0", "1", "2", "3"]

    
    const handleDownArrow = () => {
        arrowDownRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    const handleUpArrow = () => {
        arrowUpRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    const handlePageNav = (page) => {
        setCurrentPage( parseInt(page))
    }

    useEffect( () => {
        const interval = setInterval(() => {
            setCurrentPage( (prevPage) => prevPage+1 )
        }, 6000);

        return () => clearInterval(interval)
    }, [currentPage])

    const splashPage = () => (
        <div className='splash-container'>
            <section ref={arrowUpRef} className='splash-page-container' >
                <div className='splash-text'>
                    <h1> Get your next</h1>
                </div>
                <div className="page-nav-buttons">
                    {pageButtons.map(pageButton => 
                        <div 
                            key={pageButton} 
                            onClick={ () => handlePageNav(pageButton)} 
                            className={currentPage % 4 === parseInt(pageButton) ? `${splashInfo[parseInt(pageButton)].title.split(" ")[0]}-page-button` : ""}
                            >    
                        </div>
                    )}
                </div>
                <div className="splash-page-carousel">
                    {
                        splashInfo.map( (page, i) => <SplashPage title={page.title}
                        handleDownArrow = {handleDownArrow}
                        photoUrls = {page.photoUrls} 
                        key={i}
                        shouldShow={currentPage % 4 === i}
                        shouldLeave={(currentPage - 1) % 4 === i}
                        /> )
                    }
                </div>
            </section>
            <section className="one-and-half-page">
                    <div className="one-and-half-picture-container">
                        <img src="https://fs-pinteresting-dev.s3.amazonaws.com/andreas-dress-wg9hUuor3yg-unsplash.jpg" alt="" />
                    </div>
                    <div className="one-and-half-text-container">
                        <h1>See it, make it, try it, do it</h1>
                        <p>The best part of Pinteresting is discovering new things and ideas from people around the word</p>
                    </div>
            </section>
            <section ref={arrowDownRef} className="second-page">
                <div className='second-page-background'></div>
                <div className='second-page-photo-background'>
                    <DiscoverPins photoNumber={28} />
                </div>
                <div className="second-page-text-container">
                    <h1>Sign up to get your ideas</h1>
                </div>
                <div onClick={handleUpArrow} className={`second-page-arrow splash-arrow`}>
                    <i className="fa-solid fa-chevron-up fa-lg"></i>
                </div>
                <div className="splash-signup">
                    <SignupFormContainer stationary={true}/>
                </div>
            </section>
        </div>
    )

    const noSplash = () => (
        ""
    )

    return currentUser ? noSplash() : splashPage()

}

const mSTP = ({session, entities: { users }}) => {
    return {
        currentUser: users[session.id]
    }
}


export default connect(mSTP, null)(Splash)
