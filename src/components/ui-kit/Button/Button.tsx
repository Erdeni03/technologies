import classNames from 'classnames'
import {FC, HTMLAttributes, ReactNode} from "react";
import './button.css'
interface IButton extends HTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'button'
  className?: string
  onClick?: () => void
  children: ReactNode
  disabled?: boolean
  active?: boolean
  variant?: 'primary' | 'secondary'
}


export const Button:FC<IButton> = ({ variant='primary',type, className, onClick, children, disabled,active,...props }) => {

  // const onClickAction = (e)=> {
  //   if (disabled) {
  //     e.preventDefault();
  //   } else {
  //     return onClick(e);
  //   }
  // };

  const classes = classNames(
      'btn',
      className,
      {active, primary: variant === 'primary', secondary: variant === 'secondary'}
  )

  return (
    <button disabled={disabled}
      type={type ? type : 'button'}
      className={classes}
      onClick={onClick}
            {...props}
    >
      {children}
    </button>
  )
}

