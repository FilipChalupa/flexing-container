import React, {
	FunctionComponent,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react'
import { useMeasure } from 'react-use'
import styles from './FlexingContainer.module.css'

export type FlexingContainerProps = {
	children?: ReactNode
	align?: 'start' | 'center' | 'end'
	wrap?: (props: { children: ReactNode }) => JSX.Element
	// transition?: 'swipeFromLeft' | '…' @TODO
}

export const FlexingContainer: FunctionComponent<FlexingContainerProps> = ({
	children,
	align = 'center',
	wrap = ({ children }) => <>{children}</>,
}) => {
	const [contents, setContents] = useState<
		Array<{
			children: ReactNode
			width: number
			key: number
		}>
	>([])

	useEffect(() => {
		setContents((contents) => [
			...contents,
			{
				children,
				width: 0,
				key: (contents[contents.length - 1]?.key ?? 0) + 1,
			},
		])
	}, [children])

	const [wrapperMeasureRef, { width: wrapperMeasureWidth }] =
		useMeasure<HTMLDivElement>()
	const [
		currentContentElementRef,
		{ width: currentContentWidth, height: currentContentHeight },
	] = useMeasure<HTMLDivElement>()

	useEffect(() => {
		setContents((contents) =>
			contents.map((content, i) =>
				i < contents.length - 1
					? content
					: { ...content, width: currentContentWidth },
			),
		)
	}, [currentContentWidth])

	const handleAnimationEnd = useCallback(() => {
		setContents(([_oldest, ...contents]) => contents)
	}, [])

	return (
		<div
			className={`${styles.wrapper} ${styles[`is_align_${align}`]}`}
			style={{
				'--wrapperMeasureWidth': `${wrapperMeasureWidth}px`,
				'--currentContentWidth': `${currentContentWidth}px`,
				'--currentContentHeight': `${
					currentContentHeight -
					1 /* useMeasure not working on zero height element workaround */
				}px`,
			}}
		>
			<div className={styles.wrapperMeasure}>
				{wrap({ children: <div ref={wrapperMeasureRef} /> })}
			</div>
			<div className={styles.main}>
				{wrap({
					children: (
						<div className={styles.in}>
							{contents.map(({ children, width, key }, i) => {
								const isCurrent = i === contents.length - 1
								return (
									<div
										key={key}
										className={styles.content_wrapper}
										style={{
											'--contentWidth': `${width}px`,
										}}
									>
										<div
											key={key}
											className={`${styles.content} ${
												isCurrent ? styles.is_current : styles.is_previous
											}`}
											onAnimationEnd={
												isCurrent ? undefined : handleAnimationEnd
											}
											ref={isCurrent ? currentContentElementRef : undefined}
										>
											{children}
										</div>
									</div>
								)
							})}
						</div>
					),
				})}
			</div>
		</div>
	)
}
