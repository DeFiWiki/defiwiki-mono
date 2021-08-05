import WalletConnectProvider from '@walletconnect/web3-provider'
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
import Web3Modal from 'web3modal'

// @ts-ignore
export const threeID = new ThreeIdConnect()

export const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions: {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: 'e87f83fb85bf4aa09bdf6605ebe144b7',
            },
        },
    },
})

export async function getProvider() {
    const ethProvider = await web3Modal.connect()
    const addresses = await ethProvider.enable()
    await threeID.connect(new EthereumAuthProvider(ethProvider, addresses[0]))
    return threeID.getDidProvider()
}