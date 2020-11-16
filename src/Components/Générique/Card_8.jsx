
import React from 'react';


function Card_8({title, content}) {

    return (
        <div className="col-xl-8 col-lg-8">
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                        {title}
                    </h6>
                </div>
                <div className="card-body">
                    {content}
                </div>
            </div>
        </div>);
}

export default Card_8;
