import { FC, useState } from 'react'
import ConnectWallet from '@/components/ConnectWallet'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import SearchNFT from '@/components/SearchNFT'

const Home: FC = () => {
	const [tokenId, setTokenId] = useState('')

	return (
		<div className="relative flex flex-col content-start min-h-screen min-w-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:content-start py-4 sm:pt-0">
			<div className="absolute top-6 right-6">
				<ConnectWallet />
			</div>
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="p-10 m-10">
				{/* put h1 "CITY NFT" in center and a text input */}
				<h1 className="text-5xl mb-5">City NFT</h1>
				<SearchNFT />
			</div>
		</div>
	)
}

export default Home
