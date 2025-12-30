import React from 'react';
import Container from '../../components/Shared/Container';
import Hero from './Hero';
import LatestResolve from './LatestResolve';
import Caategory from './Caategory';
import Features from './Features';
import HomeCharts from './HomeCharts'
import Premium from './Premium'
import HowItWorks from './HowItWorks'

const Home = () => {
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
           
        </div>
    );
};

export default Home;