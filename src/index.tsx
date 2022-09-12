import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import styles from './index.module.css'

export type FlexingContainerProps = {
	children?: ReactNode
	// transition?: 'swipeFromLeft' | '…' @TODO
}

export const FlexingContainer: FunctionComponent<FlexingContainerProps> = ({
	children: currentContent,
}) => {
	const [previousContent, setPreviousContent] = useState(currentContent)

	useEffect(() => {
		console.log('swap')
		setTimeout(() => {
			setPreviousContent(currentContent)
		}, 200)
	}, [currentContent])

	return (
		<div className={styles.wrapper}>
			<div className={styles.content_previous}>{previousContent}</div>
			<div className={styles.content_current}>{currentContent}</div>
		</div>
	)
}
