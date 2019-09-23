import React from 'react'

const Notification = ({message,err}) => {

    const color = err　?　'red' : 'green'

    const info = {
        color,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if(message === null) {
        return null
    }

    return (
        <div style={info}>
            {message}
        </div>
    )
}

export default Notification