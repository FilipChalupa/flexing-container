import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import './global.css'

const Example: React.FunctionComponent = () => {
	return <div>@TODO</div>
}

export default {
	title: 'Example',
	component: Example,
} as ComponentMeta<typeof Example>

const Template: ComponentStory<typeof Example> = (args) => <Example {...args} />

export const Demo = Template.bind({})
