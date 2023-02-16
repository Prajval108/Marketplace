export const listForSaleTx = `
import BloxmithMarketplace from 0xf951707a4bc85ce4

transaction(id: UInt64, price: UFix64) {

  prepare(acct: AuthAccount) {
    let saleCollection = acct.borrow<&BloxmithMarketplace.SaleCollection>(from: /storage/SaleCollection)
                            ?? panic("This SaleCollection does not exist")
    saleCollection.listForSale(id: UInt64(id), price: price)
  }

  execute {
    log("A user listed an NFT for Sale")
  }
}
`