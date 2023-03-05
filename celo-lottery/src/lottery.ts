import {
  Ended as EndedEvent,
  Joined as JoinedEvent,
  Started as StartedEvent
} from "../generated/Lottery/Lottery"
import { Ended, Joined, Started } from "../generated/schema"

export function handleEnded(event: EndedEvent): void {
  let entity = new Ended(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.lotteryId = event.params.lotteryId
  entity.totalPlayers = event.params.totalPlayers
  entity.winningTicket = event.params.winningTicket
  entity.winningAmount = event.params.winningAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleJoined(event: JoinedEvent): void {
  let entity = new Joined(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.lotteryId = event.params.lotteryId
  entity.ticketId = event.params.ticketId
  entity.player = event.params.player

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
