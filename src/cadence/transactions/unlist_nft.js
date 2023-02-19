export const unlist = `
import BloxmithMarketplace from 0xf951707a4bc85ce4

transaction() {

  prepare(acct: AuthAccount) {
    let saleCollection = acct.borrow<&BloxmithMarketplace.SaleCollection>(from: /storage/SaleCollection)
                            ?? panic("This SaleCollection does not exist")
   


    saleCollection.unlistFromSale(id: UInt64(2))
        
  }

  execute {
    log("A user listed an NFT for Sale")
  }
}
`