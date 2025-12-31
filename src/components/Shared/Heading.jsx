import React from 'react';

const Heading = ({title, subtitle, center}) => {
    return (
        <div className={center? 'text-center py-5' : 'text-start py-5' }>
            <h2 className='text-3xl font-bold lg:text-4xl mb-2'>{title}</h2>
            <p className='text-gray-700 '>{subtitle}</p>
        </div>
    );
};

export default Heading;