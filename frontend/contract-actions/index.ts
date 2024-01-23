import { ethers } from 'ethers'
import { abi } from './abi'

class MetaMaskError extends Error {}

const contractAddress =
  process.env.CONTRACT_ADDRESS || '0xF4E3A013F4ae1328528d20a66AC6332757cd32A7'

const createNewMember = async () => {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
      )
      const signer = provider.getSigner()
      const signerAddress = await signer.getAddress()
      const contract = new ethers.Contract(contractAddress, abi, signer)

      const transaction = await contract.createNewMember(signerAddress)
      await transaction.wait()

      const id = await contract.memberCounter()
      const formatted = id.toNumber()

      return [formatted, signerAddress]
    } catch (error) {
      console.error('An error occurred while creating new member:', error)
      throw new Error('An error occurred while creating new member')
    }
  } else {
    throw new MetaMaskError('MetaMask is not installed')
  }
}

export { createNewMember }
