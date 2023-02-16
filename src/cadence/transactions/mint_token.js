export const mintTokenTx = `
import Rumble from 0x4543634b09bac984
  import FungibleToken from 0x9a0766d93b6608b7
  transaction (amount: UFix64) {
    prepare(acct: AuthAccount) {

      let minter = acct.borrow<&Rumble.Minter>(from: Rumble.MinterStoragePath)
                    ?? panic ("Could not borrow the Minter Resources")
      let newvault <- minter.mintTokens(amount: amount)
  
      let Vault = acct.borrow<&Rumble.Vault>(from: Rumble.VaultStoragePath)
                          ?? panic("This collection does not exist here")
      
      Vault.deposit(from: <- newvault)
    }
    execute {
      log("Token Minted Successfully")    
    }
  }
`
