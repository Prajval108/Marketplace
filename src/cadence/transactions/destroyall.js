export const destroyAllNFT = `
import ProjectR from 0xf951707a4bc85ce4

transaction() {

  prepare(acct: AuthAccount) {
 
    let collection = acct.borrow<&ProjectR.Collection>(from: /storage/ProjectRCollection)
                        ?? panic("This collection does not exist here")

  var a = 600
  while a < 620 {
      a = a + 1
      collection.burnNFT(id:UInt64(a))
  }

  }

  execute {
    log("Your NFT is successully Minted")
  }
}
`
 