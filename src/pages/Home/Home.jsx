import React from 'react';
import Container from '../../components/Shared/Container';
import Hero from './Hero';
import LatestResolve from './LatestResolve';
import Caategory from './Caategory';
import Features from './Features';
import HomeCharts from './HomeCharts'
import Premium from './Premium'
import HowItWorks from './HowItWorks'
// import BeforeAfter from './BeforeAfter'
import AppDownload from './AppDownLoad';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/Shared/LoadingSpinner'

const Home = () => {


    const {loading} =useAuth();

    if (loading) {
        return <LoadingSpinner/>
        
    }
    return (
        <div>


            <Hero></Hero>
            <Container>
                <LatestResolve></LatestResolve>
                <HomeCharts />
                <Caategory></Caategory>
                <Features></Features>
                


            </Container>
            <Premium />
            
                <HowItWorks></HowItWorks>
                {/* <BeforeAfter></BeforeAfter> */}
                <AppDownload></AppDownload>
           
        </div>
    );
};

export default Home;