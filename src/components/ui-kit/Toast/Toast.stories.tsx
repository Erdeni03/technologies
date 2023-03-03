import React, { useState } from 'react'
import toast from './Toast'
import Toast from './Toast'
import { ComponentStory } from '@storybook/react'
import { Input } from '../Input/Input'

export default {
  title: 'UI-kit/Toast',
}

const Template: ComponentStory<typeof Toast> = (args) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(true)}>Show toast</button>
      {show && <Toast {...args} destroy={() => setShow(false)} />}
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  duration: 3000,
  title: 'Toast',
  content: 'LOrem',
}
