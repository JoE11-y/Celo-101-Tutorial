import {
  Ended as EndedEvent,
  Started as StartedEvent
} from "../generated/Lottery/Lottery"
import { Ended, Started } from "../generated/schema"

export function handleEnded(event: EndedEvent): void {
  let entity = new Ended(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.lotteryId = event.params.lotteryId
  entity.winningAmount = event.params.winningAmount
  entity.winner = event.params.winner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStarted(event: StartedEvent): void {
  let entity = new Started(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.lotteryId = event.params.lotteryId
  entity.entryAmount = event.params.entryAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
