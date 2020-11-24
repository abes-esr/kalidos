
import React from 'react';

function Card_12_Danger({title, content}) {
    return (
        <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between alert-danger">
                    <h6 className="m-0 font-weight-bold text-danger">
                        {title}
                    </h6>
                </div>
                <div className="card-body" style={{color:'red'}}>
                    {content}
                </div>
            </div>
        </div>);
}

export default Card_12_Danger;
