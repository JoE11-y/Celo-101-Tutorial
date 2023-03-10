import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { Ended } from "../generated/schema"
import { Ended as EndedEvent } from "../generated/LotteryV2/LotteryV2"
import { handleEnded } from "../src/lottery-v-2"
import { createEndedEvent } from "./lottery-v-2-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let lotteryId = BigInt.fromI32(234)
    let totalPlayers = BigInt.fromI32(234)
    let winningTicket = BigInt.fromI32(234)
    let winningAmount = BigInt.fromI32(234)
    let winner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newEndedEvent = createEndedEvent(
      lotteryId,
      totalPlayers,
      winningTicket,
      winningAmount,
      winner
    )
    handleEnded(newEndedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Ended created and stored", () => {
    assert.entityCount("Ended", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Ended",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lotteryId",
      "234"
    )
    assert.fieldEquals(
      "Ended",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "totalPlayers",
      "234"
    )
    assert.fieldEquals(
      "Ended",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "winningTicket",
      "234"
    )
    assert.fieldEquals(
      "Ended",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "winningAmount",
      "234"
    )
    assert.fieldEquals(
      "Ended",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "winner",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
