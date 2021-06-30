import classnames from 'classnames';
import { useWallet, UseWalletProvider } from 'use-wallet'


export enum ButtonType {
    Primary
}

export enum ButtonSize {
    Small,
    Large
}

type ButtonProps = {
    size: ButtonSize,
    buttonType: ButtonType,
    children: any
}

function ConnectWalletButton({ size, buttonType, children }: ButtonProps) {
    const wallet = useWallet()

    const connectWallet = async (e) => {
        e.preventDefault()
        await wallet.connect()
    }

    return (
        <button onClick={connectWallet} className={classnames('text-white py-2 px-4 rounded-lg', {
            "text-xs": size === ButtonSize.Small,
            "text-xl": size === ButtonSize.Large,
            "bg-purple hover:bg-purple-dark active:bg-purple-darker": buttonType === ButtonType.Primary
        })}>
            {children}
        </button>
    )
};

export default () => (
    <UseWalletProvider
        chainId={1}
        connectors={{
            // This is how connectors get configured
            portis: { dAppId: 'my-dapp-id-123-xyz' },
            //provided: {provider: window.cleanEthereum},
        }}
    >
        <ConnectWalletButton size={ButtonSize.Large} buttonType={ButtonType.Primary}>CONNECT WALLET</ConnectWalletButton>
    </UseWalletProvider>
)
