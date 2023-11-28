import React from 'react'

export default function Alert(props) {
  return props.info && (
    <div className={`alert alert-${props.status} mt-2`} role='alert'>
        {props.info}
    </div>
  )
}
