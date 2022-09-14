import React, { FunctionComponent, useMemo, useState } from 'react'
import { FlexingContainer, FlexingContainerProps } from '../index'

export const Example: FunctionComponent<
	Pick<FlexingContainerProps, 'align'>
> = ({ align }) => {
	const items = useMemo(
		() => [
			{
				label: 'First',
				content: (
					<div style={{ maxWidth: '20rem' }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
						repudiandae praesentium, nemo nesciunt officiis velit neque
						repellendus fuga eligendi suscipit earum et? Labore, velit odio?
						Incidunt vitae nostrum eligendi voluptatum?
					</div>
				),
			},
			{
				label: 'Second',
				content: (
					<div>
						<img
							src="https://placekitten.com/200/300"
							width="200"
							height="300"
							alt="kitten"
						/>
					</div>
				),
			},
			{
				label: 'Third',
				content: (
					<div style={{ maxWidth: '30rem' }}>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Cupiditate, est. Quae possimus, eligendi modi nostrum facilis
							numquam illum neque vitae dolorum ex, error, repellat esse? Ipsam
							tempore laboriosam enim accusantium?
						</p>
						<p>
							Ea, repellat magnam qui blanditiis ipsum veritatis, accusantium,
							in inventore eligendi delectus facere vitae nesciunt dolorem
							voluptates. Fuga molestiae, dignissimos aut doloribus ullam
							aliquid perspiciatis quia, quae, alias harum perferendis.
						</p>
						<img
							src="https://placekitten.com/400/400"
							width="400"
							height="400"
							alt="kitten"
						/>
					</div>
				),
			},
			{
				label: 'Fourth',
				content: (
					<div style={{ maxWidth: '40rem' }}>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
							dolore ab architecto cumque, exercitationem ad aspernatur nulla
							reiciendis consequatur inventore laudantium vitae? Enim similique
							quibusdam culpa, at voluptate repellat obcaecati!
						</p>
						<p>
							Voluptatem eum, pariatur labore harum eveniet quaerat soluta optio
							accusantium impedit recusandae sunt natus illum ullam officiis
							deleniti, ducimus nesciunt numquam! Labore suscipit similique
							sapiente velit cumque alias voluptatem sint!
						</p>
						<p>
							Natus sapiente quos, unde voluptatibus, tempore obcaecati harum
							incidunt reiciendis expedita sit ex delectus dolore fugit
							voluptas, maxime ipsum. Quod quaerat maiores corrupti perspiciatis
							distinctio quam omnis et aut consectetur!
						</p>
						<p>
							Et mollitia aut numquam pariatur rerum porro, rem ipsa enim. Unde,
							perspiciatis suscipit ullam facere inventore provident porro eaque
							dignissimos culpa, labore cupiditate alias? Neque nostrum magni
							amet consequatur? Quas.
						</p>
					</div>
				),
			},
		],
		[],
	)

	const [activeItemIndex, setActiveItemIndex] = useState(() => 0)
	const content = useMemo(
		() => items[activeItemIndex].content,
		[items, activeItemIndex],
	)

	return (
		<div>
			<div className="controls">
				{items.map((item, i) => (
					<button
						disabled={i === activeItemIndex}
						type="button"
						key={i}
						onClick={() => {
							setActiveItemIndex(i)
						}}
					>
						{item.label}
					</button>
				))}
			</div>
			<div className="wrapper" key={align}>
				<div className="in">
					<FlexingContainer
						align={align}
						wrapper={({ children }) => (
							<div className="content-wrapper">{children}</div>
						)}
					>
						<div className="content">{content}</div>
					</FlexingContainer>
				</div>
			</div>
		</div>
	)
}
