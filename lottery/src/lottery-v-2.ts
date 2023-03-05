import {
  Ended as EndedEvent,
  Joined as JoinedEvent,
  Started as StartedEvent
} from "../generated/LotteryV2/LotteryV2"

import {
  BigInt, Bytes
} from "@graphprotocol/graph-ts";
import { LotteryRound, PlayerInfo, TicketInfo } from "../generated/schema"

export function handleStarted(event: StartedEvent): void {
  let lotteryId = event.params.lotteryId.toString();
  let entity = LotteryRound.load(lotteryId);

  if (!entity) {
    entity = new LotteryRound(lotteryId);
  }

  entity.prize = BigInt.fromU32(0);
  entity.totalPlayers = 0;
  entity.entryAmount = event.params.entryAmount;
  entity.save()
}

export function handleJoined(event: JoinedEvent): void {

  let lotteryId = event.params.lotteryId.toString();
  // typo in contract, this is supposed to be ticketId
  let ticketIndex = event.params.ticketId.toString();
  let player = event.params.player;

  let lotteryEntity = LotteryRound.load(lotteryId);

  if (!lotteryEntity) {
    return;
  }

  // update total players
  let totalPlayers = lotteryEntity.totalPlayers;
  lotteryEntity.totalPlayers = totalPlayers + 1;

  lotteryEntity.save();

  // create playerinfo
  let playerId = player.toHex()
  let playerEntity = PlayerInfo.load(playerId);

  if (!playerEntity) {
    playerEntity = new PlayerInfo(playerId);
  }

  playerEntity.address = player;
  playerEntity.save();

  // create ticketrecord
  let ticketId = lotteryId + "-" + playerId + "-" + ticketIndex;

  let ticketEntity = TicketInfo.load(ticketId);

  if (!ticketEntity) {
    ticketEntity = new TicketInfo(ticketId);
  }

  ticketEntity.lotteryRound = lotteryId;
  ticketEntity.player = playerId;
  ticketEntity.isWinner = false;

  ticketEntity.save();
}

export function handleEnded(event: EndedEvent): void {
  let lotteryId = event.params.lotteryId.toString();
  let totalPlayer = event.params.totalPlayers.toU32();
  let winningTicketIndex = event.params.winningTicket.toString();
  let winningAmount = event.params.winningAmount;
  let winner = event.params.winner;

  let lotteryEntity = LotteryRound.load(lotteryId);

  if (!lotteryEntity) {
    return
  }

  lotteryEntity.totalPlayers = totalPlayer;
  lotteryEntity.prize = winningAmount;
  lotteryEntity.save();

  let playerId = winner.toHex();
  let ticketId = lotteryId + "-" + playerId + "-" + winningTicketIndex;

  let ticketEntity = TicketInfo.load(ticketId);

  if (!ticketEntity) {
    return
  }

  ticketEntity.isWinner = true;

  ticketEntity.save()
}


