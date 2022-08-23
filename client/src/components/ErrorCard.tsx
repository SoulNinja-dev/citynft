import { FunctionComponent } from 'react'

interface ErrorCardProps {
	text: string
}

const ErrorCard: FunctionComponent<ErrorCardProps> = (props: ErrorCardProps) => {
	return (
		<div>
			<h1 className="mt-10 text-red-600 font-bold text-2xl">{props.text}</h1>
		</div>
	)
}

export default ErrorCard
