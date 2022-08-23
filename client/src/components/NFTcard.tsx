import { FunctionComponent } from 'react'
import Image from 'next/image'

interface NFTcardProps {
	buyormint: string
	token: string
	value: string
	image: string
	owner: string
	onClickCallBack: any
	setNewValue: any
	newValue: string
}

const NFTcard: FunctionComponent<NFTcardProps> = (props: NFTcardProps) => {
	return (
		<div className="flex max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
			<Image className="w-1/3 bg-cover" src={props.image} alt="NFT" width={500} height={500} />

			<div className="w-2/3 p-4 md:p-4 flex-col">
				<h1 className="text-2xl my-2 font-bold text-gray-800 dark:text-white">#{props.token}</h1>
				{props.owner ? (
					<h1 className="text-lg font-bold my-2 text-gray-700 dark:text-gray-200 md:text-xl">
						{props.value} ETH
					</h1>
				) : null}

				<h3 className="text-lg font-bold my-2 text-gray-700 dark:text-gray-200 md:text-xl">{props.owner}</h3>
				<input
					className="w-full text-gray-700 my-2 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
					type="text"
					value={props.newValue}
					onChange={e => {
						props.setNewValue(e.target.value)
					}}
					placeholder={`enter value to ${props.buyormint}`}
				/>
				<button
					className="px-5 py-3 my-2 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
					onClick={props.onClickCallBack}
				>
					{props.buyormint}
				</button>
			</div>
		</div>
	)
}

export default NFTcard
