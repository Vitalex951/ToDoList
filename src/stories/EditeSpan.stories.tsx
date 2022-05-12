import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../Components/EditableSpan/EditableSpan";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
  callback: action('Value change'),
  oldTitle: 'Edit title',
}