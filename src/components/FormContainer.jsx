import React from "react";

const FormConatiner = ({ children }) => {
    return (
        <div className="container p-5">
            <div className=" row justify-content-md-center">
                <div className="col col-xs-12 col-md-6" xs={12} md={6}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FormConatiner;