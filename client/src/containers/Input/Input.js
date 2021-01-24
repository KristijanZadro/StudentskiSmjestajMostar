import React from 'react'
import './Input.css'

export default function Input({type,placeholder,name,value,onChange}) {
    return (
        <div className="input">
            <input 
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
