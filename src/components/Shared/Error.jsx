import React from 'react';
import rrro from '../../assets/error-404.png'
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='w-full min-h-screen h-auto mx-auto'>
            <figure className='flex flex-col p-5 min-h-[60vh] sm:p-10 lg:p-20 justify-center items-center'>
                <img src={rrro} alt="error" />
                <Link to={'/'} className='btn btn-primary my-5'>Go Home</Link>
            </figure>




        </div>
    );
};

export default Error;