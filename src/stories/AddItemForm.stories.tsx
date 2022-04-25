import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {AddTaskFormWithRedux} from "../Components/AddTaskForm/AddTaskFormWithReducer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: 'Todolist/AddItemForm',
  component: AddTaskFormWithRedux,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    callback: {
      description: 'callback'
    }
  }
} as ComponentMeta<typeof AddTaskFormWithRedux>;

const Template: ComponentStory<typeof AddTaskFormWithRedux> = (args) => <AddTaskFormWithRedux {...args} />;

export const AddItemFormStory = Template.bind({});


AddItemFormStory.args = {
  callback: action('Button clicked inside form')
  };