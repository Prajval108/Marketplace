export const getNFTsScript = `
import ProjectR from 0xf951707a4bc85ce4
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address): [&ProjectR.NFT?] {
  let collection = getAccount(account).getCapability(/public/ProjectRCollection)
                    .borrow<&ProjectR.Collection{NonFungibleToken.CollectionPublic, ProjectR.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let returnVals: [&ProjectR.NFT?] = []
  let ids = collection.getIDs()
  for id in ids {
    returnVals.append(collection.borrowProjectR(id: id))
  }

  return returnVals
}
`