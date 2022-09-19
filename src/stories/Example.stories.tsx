import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Example } from './Example'
import './global.css'

export default {
	title: 'Example',
	component: Example,
	argTypes: {
		align: {
			options: ['start', 'center', 'end'],
			control: { type: 'radio' },
			defaultValue: 'center',
		},
		transition: {
			options: [
				'crossFade',
				'swipeFromLeft',
				'swipeFromRight',
				'swipeFromTop',
				'swipeFromBottom',
				'grow',
			],
			control: { type: 'radio' },
			defaultValue: 'crossFade',
		},
	},
} as ComponentMeta<typeof Example>

const Template: ComponentStory<typeof Example> = (args) => <Example {...args} />

export const Demo = Template.bind({})
