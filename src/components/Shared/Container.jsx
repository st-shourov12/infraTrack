import React from 'react';

const Container = ({children}) => {
    return (
        <div className="xl:px-20 md:px-10 sm:px-2 bg-amber-200 px-4">
            {children}
        </div>
    );
};

export default Container;
