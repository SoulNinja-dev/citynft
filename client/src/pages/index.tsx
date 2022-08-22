import { FC, useState } from 'react'
import ConnectWallet from '@/components/ConnectWallet'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import SearchNFT from '@/components/SearchNFT'

const Home: FC = () => {
	const [tokenId, setTokenId] = useState('')

	return (
		<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<div className="absolute top-6 right-6">
				<ConnectWallet />
			</div>
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="text-center p-10 m-10">
				{/* put h1 "CITY NFT" in center and a text input */}
				<h1 className="text-5xl mb-5">City NFT</h1>
				<SearchNFT
					sendDataToParent={token => {
						setTokenId(token)
					}}
				/>
			</div>
		</div>
	)
}

export default Home
