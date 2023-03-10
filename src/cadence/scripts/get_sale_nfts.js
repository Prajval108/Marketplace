export const getSaleNFTsScript = `
import ProjectR from 0xf951707a4bc85ce4
import NonFungibleToken from 0x631e88ae7f1d7c20
import BloxmithMarketplace from 0xf951707a4bc85ce4

pub fun main(account: Address): {UInt64: UFix64} {
  let saleCollection = getAccount(account).getCapability(/public/SaleCollection)
                        .borrow<&BloxmithMarketplace.SaleCollection{BloxmithMarketplace.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

  let collection = getAccount(account).getCapability(/public/ProjectRCollection) 
                    .borrow<&ProjectR.Collection{NonFungibleToken.CollectionPublic, ProjectR.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let saleIDs = saleCollection.getIDs()
  //let price = saleCollection.getPrice(id: saleIDs)
  //let nftRef = collection.borrowEntireNFT(id: saleIDs)

  let returnVals: {UInt64: UFix64} = {}

  for saleID in saleIDs {
    let price = saleCollection.getPrice(id: saleID)
    let nftRef = collection.borrowProjectR(id: saleID)
    returnVals.insert(key: saleID, price)
   }
  return returnVals
}
`