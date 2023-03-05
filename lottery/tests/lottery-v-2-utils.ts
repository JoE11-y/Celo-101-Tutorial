import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { Ended, Joined, Started } from "../generated/LotteryV2/LotteryV2"

export function createEndedEvent(
  lotteryId: BigInt,
  totalPlayers: BigInt,
  winningTicket: BigInt,
  winningAmount: BigInt,
  winner: Address
): Ended {
  let endedEvent = changetype<Ended>(newMockEvent())

  endedEvent.parameters = new Array()

  endedEvent.parameters.push(
    new ethereum.EventParam(
      "lotteryId",
      ethereum.Value.fromUnsignedBigInt(lotteryId)
    )
  )
  endedEvent.parameters.push(
    new ethereum.EventParam(
      "totalPlayers",
      ethereum.Value.fromUnsignedBigInt(totalPlayers)
    )
  )
  endedEvent.parameters.push(
    new ethereum.EventParam(
      "winningTicket",
      ethereum.Value.fromUnsignedBigInt(winningTicket)
    )
  )
  endedEvent.parameters.push(
    new ethereum.EventParam(
      "winningAmount",
      ethereum.Value.fromUnsignedBigInt(winningAmount)
    )
  )
  endedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )

  return endedEvent
}

export function createJoinedEvent(
  lotteryId: BigInt,
  ticketId: BigInt,
  player: Address
): Joined {
  let joinedEvent = changetype<Joined>(newMockEvent())

  joinedEvent.parameters = new Array()

  joinedEvent.parameters.push(
    new ethereum.EventParam(
      "lotteryId",
      ethereum.Value.fromUnsignedBigInt(lotteryId)
    )
  )
  joinedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketId",
      ethereum.Value.fromUnsignedBigInt(ticketId)
    )
  )
  joinedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return joinedEvent
}

export function createStartedEvent(
  lotteryId: BigInt,
  entryAmount: BigInt
): Started {
  let startedEvent = changetype<Started>(newMockEvent())

  startedEvent.parameters = new Array()

  startedEvent.parameters.push(
    new ethereum.EventParam(
      "lotteryId",
      ethereum.Value.fromUnsignedBigInt(lotteryId)
    )
  )
  startedEvent.parameters.push(
    new ethereum.EventParam(
      "entryAmount",
      ethereum.Value.fromUnsignedBigInt(entryAmount)
    )
  )

  return startedEvent
}
