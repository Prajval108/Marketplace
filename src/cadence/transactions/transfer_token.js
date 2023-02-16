export const transferTx = `
import Rumble from 0xa5e9977792ad9c12
import FungibleToken from 0x9a0766d93b6608b7

transaction(to: Address, amount: UFix64) {

  let SignerVault: &Rumble.Vault
  let RecipientVault: &Rumble.Vault{FungibleToken.Receiver}

  prepare(signer: AuthAccount) {
    self.SignerVault = signer.borrow<&Rumble.Vault>(from: Rumble.VaultStoragePath)
              ?? panic("Signer does not have a Rumble vault set up.")

    self.RecipientVault = getAccount(to).getCapability(Rumble.ReceiverPublicPath)
            .borrow<&Rumble.Vault{FungibleToken.Receiver}>()
            ?? panic("Recipient does not have a Bloxsmith Token Vault set up.")
  }

  execute {
    self.RecipientVault.deposit(from: <- self.SignerVault.withdraw(amount: amount))
  }
}
`
 