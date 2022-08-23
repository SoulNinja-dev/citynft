import { FunctionComponent } from 'react'
import Image from 'next/image'

interface NFTcardProps {
	buyormint: string
	token: string
	value: string
	image: string
}

const NFTcard: FunctionComponent<NFTcardProps> = (props: NFTcardProps) => {
	return (
		<div className="flex max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
			<Image className="w-1/3 bg-cover" src={props.image} alt="NFT" width={500} height={500} />

			<div className="w-2/3 p-4 md:p-4">
				<h1 className="text-2xl font-bold text-gray-800 dark:text-white">#{props.token}</h1>
				<div className="flex justify-between mt-3 item-center">
					<h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">{props.value}</h1>
					<button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
						{props.buyormint}
					</button>
				</div>
			</div>
		</div>
	)
}

export default NFTcard
