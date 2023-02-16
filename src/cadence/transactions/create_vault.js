export const setupVaultTx = `
import Rumble from 0xa5e9977792ad9c12
import FungibleToken from 0x9a0766d93b6608b7
transaction () {

prepare(signer: AuthAccount) {
  if signer.borrow<&Rumble.Vault>(from: /storage/RumbleVault) == nil {
    signer.save(<- Rumble.createEmptyVault(), to: /storage/RumbleVault)
    signer.link<&Rumble.Vault{FungibleToken.Receiver}>(/public/RumbleReceiver, target: /storage/RumbleVault)
    signer.link<&Rumble.Vault{FungibleToken.Balance}>(/public/RumblePublic, target: /storage/RumbleVault)
  }
}

execute {
  log("Personal Vault is created successfully")  
}
}
`
