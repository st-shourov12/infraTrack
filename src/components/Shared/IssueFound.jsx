import React from 'react';
import rrro from '../../assets/App-Error.png'

const IssueFound = () => {
    return (
        <div className='w-full min-h-screen h-auto mx-auto'>
            <figure className='flex flex-col p-5 min-h-[60vh] sm:p-10 lg:p-20 justify-center items-center'>
                <img src={rrro} alt="error" />
                
            </figure>




        </div>
    );
};

export default IssueFound;