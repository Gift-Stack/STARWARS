import { useState, useEffect } from 'react'
import { Collapse, Alert } from './style'
import { ReactComponent as CloseIcon } from '../../assets/x-circle.svg'

export default function TransitionAlert({ type, message }) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (open === true) setTimeout(() => setOpen(false), 4000)
  }, [open])

  return (
    <div style={{ position: 'absolute', right: 0, margin: 10 }}>
      <Collapse in={open}>
        <Alert severity={type} style={{ margin: 2 }}>
          <span>{message}</span>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
            }}
          >
            <CloseIcon color="white" />
          </button>
        </Alert>
      </Collapse>
    </div>
  )
}
