export const getTokenBalance = `
import Rumble from 0xa5e9977792ad9c12
import FungibleToken from 0x9a0766d93b6608b7

pub fun main(account: Address): UFix64 {
    let RecipientVault = getAccount(account).getCapability(Rumble.VaultPublicPath)
                            .borrow<&Rumble.Vault{FungibleToken.Balance}>()
                            ?? panic("Could not get Recipient Vault reference")
    return RecipientVault.balance
}   
`