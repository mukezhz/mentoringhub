import type {
  DataPacket_Kind,
  LocalParticipant,
  RemoteParticipant,
} from "livekit-client";

export async function sendText(
  localParticipant: LocalParticipant,
  data: Uint8Array,
  kind: DataPacket_Kind,
  destination?: string[] | RemoteParticipant[]
): Promise<void> {
  await localParticipant.publishData(data, kind);
}
