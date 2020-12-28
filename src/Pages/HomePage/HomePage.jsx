import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Here must be CV logic!</h1>
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}