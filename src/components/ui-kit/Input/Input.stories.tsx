import React from "react";
import { Input } from "./Input";
import "./input.css";

import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "UI-kit/Input",
  component: Input,
  argTypes: {
    wide: {
      control: "boolean",
      description: "Set input width to 100%",
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "default placeholder",
  wide: false,
};