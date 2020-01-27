import React from 'react';

import spinner from '../assets/preloader.gif';

const preloader = () => {
    return (
        <div className="text-center m-3">
            <img src={spinner} alt="Loading..." />
        </div>
    );
};

export default preloader;
