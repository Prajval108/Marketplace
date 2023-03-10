export const transferTx = `
import ProjectR from 0x4543634b09bac984
import NonFungibleToken from 0x631e88ae7f1d7c20
import BloxmithMarketplace from 0x4543634b09bac984
import Rumble from 0x4543634b09bac984
import FungibleToken from 0x9a0766d93b6608b7


transaction(userTxnId: String, account: Address, id: UInt64) {

  prepare(acct: AuthAccount) {

    let CollectionCheck = acct.getCapability<&ProjectR.Collection{NonFungibleToken.CollectionPublic}>(/public/ProjectRCollection).check()
    
    if (CollectionCheck) {
        let saleCollection = getAccount(account).getCapability(/public/ProjectRSaleCollection)
                        .borrow<&BloxmithMarketplace.SaleCollection{BloxmithMarketplace.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

        let recipientCollection = getAccount(acct.address).getCapability(/public/ProjectRCollection) 
                        .borrow<&ProjectR.Collection{NonFungibleToken.CollectionPublic}>()
                        ?? panic("Can't get the User's collection.")

        let price = saleCollection.getPrice(id: UInt64(id))
        let payment <- acct.borrow<&Rumble.Vault>(from: /storage/RumbleVault)!.withdraw(amount: price) as! @Rumble.Vault
        saleCollection.purchase(userTxnId: userTxnId, id: UInt64(id), newOwner: acct.address, recipientCollection: recipientCollection, payment: <- payment)
    } 
  }

  execute {
    log("A user purchased an NFT")
  }
}


`