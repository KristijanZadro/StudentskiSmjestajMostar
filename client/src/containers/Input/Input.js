import React from 'react'

export default function Input({placeholder}) {
    return (
        <div>
            <input 
                type="text"
                placeholder={placeholder}
            />
        </div>
    )
}
