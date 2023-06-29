import React from 'react'
import { Link } from 'react-router-dom'


const Alert = ({ type, message }) => {
    return (
        <div className={`alert alert-dismissible alert-${type} container w-25 text-center`}>
            <strong>Oh snap!</strong> {message}
        </div>
    )
}

export default Alert;