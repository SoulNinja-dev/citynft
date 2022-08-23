import axios from 'axios'
import { FunctionComponent, useState } from 'react'
import ErrorCard from './ErrorCard'
import NFTcard from './NFTcard'
import City from './City.json'
import { useContract, useSigner } from 'wagmi'
import { BigNumber, ethers } from 'ethers'

interface Props {}

const SearchNFT: FunctionComponent<Props> = () => {
	const { data: signer, isError, isLoading } = useSigner()
	const [tokenId, setTokenId] = useState('')
	const [buyormint, setBuyOrMint] = useState('')
	const [value, setValue] = useState('')
	const [image, setImage] = useState('')
	const [owner, setOwner] = useState('')

	const [showError, setShowError] = useState(false)
	const [errorText, setErrorText] = useState('no error')
	const [showCard, setShowCard] = useState(false)

	const abi = City.abi
	const contract = useContract({
		addressOrName: '0x50DD7a0EBCE3E336e896df3b30Ad7fC0480677a3',
		contractInterface: abi,
		signerOrProvider: signer,
	})

	const handleSearch = async e => {
		e.preventDefault()
		console.log(`token id being searched ${tokenId}`)

		// validate if tokenId is just numbers between 1 and 10000
		if (tokenId.match(/^[0-9]{1,4}$/)) {
			console.log('token id is valid')
			setErrorText('')
			setShowError(false)
		} else {
			console.log('token id is invalid')
			setShowError(true)
			setErrorText('token id is invalid')
			setShowCard(false)
			return
		}

		/*
			- get metadata for token id
			- call contract to check if token is minted
				- if minted, get value and owner
				- show buy option with higher value
			- if not minted, show mint button 
		*/

		// get metadata for token id
		const metadata = await axios
			.get(
				`https://bafybeihqgz7fqruizwhsrxlxwcvsmankd7wth5lr5d2zfzm3mmcsj7wvvu.ipfs.nftstorage.link/metadata/${tokenId}`
			)
			.catch(err => {
				console.log(err)
				setShowError(true)
				setErrorText(err.error.message)
			})
			// @ts-ignore
			.then(res => res.data)
		setImage(metadata.image)

		// check if token is minted
		const owner = await contract.ownerOf(tokenId).catch(err => {
			return null
		})
		setBuyOrMint(owner ? 'buy' : 'mint')
		setOwner(owner ? reduceAddr(owner) : null)

		// get value of tokenId
		if (owner) {
			const value = await contract.getTokenValue(tokenId).catch(err => {
				return null
			})
			if (value) {
				const ethval = ethers.utils.formatEther(value)
				setValue(ethval)
			} else {
				setValue(null)
			}
		}

		setShowCard(true)
	}

	const reduceAddr = addr => {
		return addr.substring(0, 5) + '...' + addr.substring(addr.length - 5)
	}

	return (
		<section className="relative w-full rounded-md">
			<div className="relative">
				<span className="absolute inset-y-0 left-0 flex items-center pl-3">
					<svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
						<path
							d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
					</svg>
				</span>

				<div className="flex flex-row">
					<input
						type="text"
						className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring mr-10"
						placeholder="1 - 9999"
						onChange={e => {
							setTokenId(e.target.value)
						}}
					/>
					<button
						className="bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring p-3"
						onClick={handleSearch}
					>
						Submit
					</button>
				</div>
			</div>

			<div className="mt-10">
				{showCard ? (
					<NFTcard buyormint={buyormint} value={value} token={tokenId} image={image} owner={owner} />
				) : null}
				{showError ? <ErrorCard text={errorText} /> : null}
			</div>
		</section>
	)
}

export default SearchNFT
