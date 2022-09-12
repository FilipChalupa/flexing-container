import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import styles from './index.module.css'

export type FlexingContainerProps = {
	children?: ReactNode
	align?: 'start' | 'center' | 'end'
	// transition?: 'swipeFromLeft' | '…' @TODO
}

export const FlexingContainer: FunctionComponent<FlexingContainerProps> = ({
	children: currentContent,
	align = 'center',
}) => {
	const [previousContent, setPreviousContent] = useState(currentContent)
	const [wrapperRef, { width: wrapperWidth }] = useMeasure<HTMLDivElement>()
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
				'--currentContentWidth': `${currentContentWidth}px`,
				'--currentContentHeight': `${currentContentHeight}px`,
			}}
		>
			<div className={styles.in}>
				<div className={styles.content_wrapper}>
					<div className={styles.content_previous}>{previousContent}</div>
				</div>
				<div className={styles.content_wrapper}>
					<div className={styles.content_current} ref={currentContentRef}>
						{currentContent}
					</div>
				</div>
			</div>
		</div>
	)
}
