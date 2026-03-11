import React from 'react';

const Container = ({children}) => {
    return (
        <div className="xl:px-20 md:px-10 sm:px-2 px-4 bg-[#F8FAFC] dark:bg-gray-800">
            {children}
        </div>
    );
};

export default Container;
