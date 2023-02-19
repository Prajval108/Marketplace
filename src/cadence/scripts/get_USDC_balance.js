export const getUsdcBalance = `
import FungibleToken from 0x9a0766d93b6608b7
import FiatToken from 0xa983fecbed621163

pub fun main(account: Address): UFix64 {
    let RecipientVault = getAccount(account).getCapability(/public/USDCVaultBalance)
                            .borrow<&FiatToken.Vault{FungibleToken.Balance}>()
                            ?? panic("Could not get Recipient Vault reference")
    return RecipientVault.balance
}   
`