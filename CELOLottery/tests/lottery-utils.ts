import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { Ended, Started } from "../generated/Lottery/Lottery"

export function createEndedEvent(
  lotteryId: BigInt,
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
      "winningAmount",
      ethereum.Value.fromUnsignedBigInt(winningAmount)
    )
  )
  endedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )

  return endedEvent
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
