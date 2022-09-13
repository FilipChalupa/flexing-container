import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import styles from './index.module.css'

export type FlexingContainerProps = {
	children?: ReactNode
	align?: 'start' | 'center' | 'end'
	wrapper?: (props: { children: ReactNode }) => JSX.Element
	// transition?: 'swipeFromLeft' | '…' @TODO
}

export const FlexingContainer: FunctionComponent<FlexingContainerProps> = ({
	children: currentContent,
	align = 'center',
	wrapper: Wrapper = ({ children }) => <>{children}</>,
}) => {
	const [previousContent, setPreviousContent] = useState(currentContent)
	const [wrapperMeasureRef, { width: wrapperMeasureWidth }] =
		useMeasure<HTMLDivElement>()
	const [wrapperRef, { width: wrapperWidth }] = useMeasure<HTMLDivElement>()
	const [previousContentRef, { width: previousContentWidth }] =
		useMeasure<HTMLDivElement>()
	const [
		currentContentRef,
		{ width: currentContentWidth, height: currentContentHeight },
	] = useMeasure<HTMLDivElement>()

	useEffect(() => {
		console.log('swap')
		setTimeout(() => {
			setPreviousContent(currentContent)
		}, 200)
	}, [currentContent])

	return (
		<div
			ref={wrapperRef}
			className={`${styles.wrapper} ${styles[`is_align_${align}`]}`}
			style={{
				'--wrapperWidth': `${wrapperWidth}px`,
				'--wrapperMeasureWidth': `${wrapperMeasureWidth}px`,
				'--currentContentWidth': `${currentContentWidth}px`,
				'--currentContentHeight': `${currentContentHeight}px`,
			}}
		>
			<div className={styles.wrapperMeasure}>
				<Wrapper>
					<div ref={wrapperMeasureRef} />
				</Wrapper>
			</div>
			<div className={styles.main}>
				<Wrapper>
					<div className={styles.in}>
						<div
							className={styles.content_wrapper}
							style={{
								'--contentWidth': `${previousContentWidth}px`,
							}}
						>
							<div
								className={`${styles.content} ${styles.is_previous}`}
								ref={previousContentRef}
							>
								{previousContent}
							</div>
						</div>
						<div
							className={styles.content_wrapper}
							style={{
								'--contentWidth': `${currentContentWidth}px`,
							}}
						>
							<div
								className={`${styles.content} ${styles.is_current}`}
								ref={currentContentRef}
							>
								{currentContent}
							</div>
						</div>
					</div>
				</Wrapper>
			</div>
		</div>
	)
}
