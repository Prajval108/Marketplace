export const transferUsdcTx = `
import FungibleToken from 0x9a0766d93b6608b7
import FiatToken from 0xa983fecbed621163

transaction(to: Address, amount: UFix64) {

  // The Vault resource that holds the tokens that are being transferred
  let sentVault: @FungibleToken.Vault

  prepare(signer: AuthAccount) {

      // Get a reference to the signer''s stored vault
      let vaultRef = signer.borrow<&FiatToken.Vault>(from: /storage/USDCVault)
    ?? panic("Could not borrow reference to the owner's USDC Vault!")

      // Withdraw tokens from the signer''s stored vault
      self.sentVault <- vaultRef.withdraw(amount: UFix64(amount))
  }

  execute {

      // Get a reference to the recipient''s Receiver
      let receiverRef =  getAccount(to)
          .getCapability(/public/USDCVaultReceiver)
          .borrow<&{FungibleToken.Receiver}>()
    ?? panic("Could not borrow receiver reference to the recipient's USDC Vault")

      // Deposit the withdrawn tokens in the recipient''s receiver
      receiverRef.deposit(from: <-self.sentVault)
  }
}
`
 