import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Button} from './Button'

export default {
  title: 'UI-kit/Button',
  component: Button,
  argTypes: {
    variant: {
      type: 'string',
      description: 'Вариант цвета кнопки',
      defaultValue: 'primary',
      options: ['primary', 'secondary'],
      control: {
        type: 'radio'
      }
    }
  }
} as ComponentMeta<typeof Button>


const Template: ComponentStory<typeof Button> = (args) => <Button {...args}/>

export const CButton = Template.bind({})

CButton.args = {
  disabled: true,
  children: 'Press me!'
}

CButton.args = {
  active: true,
  children: 'Press me!'
}