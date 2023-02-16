export const setupUserTx = `
import ProjectR from 0xf951707a4bc85ce4
import NonFungibleToken from 0x631e88ae7f1d7c20
import FungibleToken from 0x9a0766d93b6608b7
import Rumble from 0xa5e9977792ad9c12
import BloxmithMarketplace from 0xf951707a4bc85ce4

transaction {

  prepare(acct: AuthAccount) {
    acct.save(<- ProjectR.createEmptyCollection(), to: /storage/ProjectRCollection)
    acct.link<&ProjectR.Collection{ProjectR.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/ProjectRCollection, target: /storage/ProjectRCollection)
    acct.link<&ProjectR.Collection>(/private/ProjectRCollection, target: /storage/ProjectRCollection)
    
    let ProjectRCollection = acct.getCapability<&ProjectR.Collection>(/private/ProjectRCollection)
    let RumbleTokenVault = acct.getCapability<&Rumble.Vault{FungibleToken.Receiver}>(/public/RumbleReceiver)
    
    acct.save(<- BloxmithMarketplace.createSaleCollection(ProjectRCollection: ProjectRCollection, TokenVault: RumbleTokenVault), to: /storage/SaleCollection)
    acct.link<&BloxmithMarketplace.SaleCollection{BloxmithMarketplace.SaleCollectionPublic}>(/public/SaleCollection, target: /storage/SaleCollection)
  }

  execute {
    log("A user stored a Collection and a SaleCollection inside their account")
  }
}
  

`