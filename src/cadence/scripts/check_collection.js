export const checkCollectionTx = `
import ProjectR from 0xf951707a4bc85ce4
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address): Bool {

    let CollectionCheck = getAccount(account).getCapability<&ProjectR.Collection{NonFungibleToken.CollectionPublic}>(/public/ProjectRCollection).check()
    return CollectionCheck
}
`
