export const setupVaultForUsdcTx = `
import FungibleToken from 0x9a0766d93b6608b7
import FiatToken from 0xa983fecbed621163
transaction() {
    prepare(acct: AuthAccount) {

        if(acct.borrow<&FiatToken.Vault>(from: /storage/USDCVault) == nil) {
            acct.save(<-FiatToken.createEmptyVault(), to: /storage/USDCVault)
            acct.link<&FiatToken.Vault{FungibleToken.Receiver}>(/public/USDCVaultReceiver, target: /storage/USDCVault)
            acct.link<&FiatToken.Vault{FungibleToken.Balance}>(/public/USDCVaultBalance, target: /storage/USDCVault)
        }
    }
}
`
