import React, {
	FunctionComponent,
	ReactNode,
	useEffect,
	useRef,
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
	children: currentContent,
	align = 'center',
	wrap = ({ children }) => <>{children}</>,
}) => {
	const [key, setKey] = useState(1)
	const [previousContent, setPreviousContent] = useState(currentContent)
	const currentContentRef = useRef(currentContent)
	const [wrapperMeasureRef, { width: wrapperMeasureWidth }] =
		useMeasure<HTMLDivElement>()
	const [previousContentElementRef, { width: previousContentWidth }] =
		useMeasure<HTMLDivElement>()
	const [
		currentContentElementRef,
		{ width: currentContentWidth, height: currentContentHeight },
	] = useMeasure<HTMLDivElement>()

	useEffect(() => {
		setPreviousContent(currentContentRef.current)
		setKey((value) => value + 1)
		currentContentRef.current = currentContent
	}, [currentContent])

	return (
		<div
			className={`${styles.wrapper} ${styles[`is_align_${align}`]}`}
			style={{
				'--wrapperMeasureWidth': `${wrapperMeasureWidth}px`,
				'--currentContentWidth': `${currentContentWidth}px`,
				'--currentContentHeight': `${currentContentHeight}px`,
			}}
		>
			<div className={styles.wrapperMeasure}>
				{wrap({ children: <div ref={wrapperMeasureRef} /> })}
			</div>
			<div className={styles.main}>
				{wrap({
					children: (
						<div className={styles.in}>
							<div
								className={styles.content_wrapper}
								style={{
									'--contentWidth': `${previousContentWidth}px`,
								}}
							>
								<div
									key={key}
									className={`${styles.content} ${styles.is_previous}`}
									ref={previousContentElementRef}
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
									key={key}
									className={`${styles.content} ${styles.is_current}`}
									ref={currentContentElementRef}
								>
									{currentContent}
								</div>
							</div>
						</div>
					),
				})}
			</div>
		</div>
	)
}
