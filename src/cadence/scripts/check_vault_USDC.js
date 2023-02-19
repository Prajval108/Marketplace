export const checkUsdcVaultTx = `
import FungibleToken from 0x9a0766d93b6608b7
import FiatToken from 0xa983fecbed621163

pub fun main(account: Address): Bool {
    let VaultCheck = getAccount(account).getCapability<&FiatToken.Vault{FungibleToken.Balance}>(/public/USDCVaultBalance).check()
    return VaultCheck
}
`
