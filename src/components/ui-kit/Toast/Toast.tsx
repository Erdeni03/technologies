import React, { useEffect } from 'react'
import './toast.css'

export interface ToastProps {
  id?: string;
  destroy: () => void;
  title: string;
  content: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = (props) => {
  const { id, destroy, title, content, duration = 0 } = props

  useEffect(() => {
    if (!duration) return

    const timer = setTimeout(() => {
      destroy()
    }, duration)

    return () => clearTimeout(timer)
  }, [destroy, duration])

  return (
    <div id="toast-container-main">
      <div>
        <div className="toast-header">
          <div>
            {title}
            {/* {title} {id} */}
          </div>
          <button onClick={destroy}>CLOSE</button>
        </div>
        <div className="toast-body">{content}</div>
      </div>
    </div>
  )
}

export default Toast
