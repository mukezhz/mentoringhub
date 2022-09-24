const url = import.meta.env.VITE_WEBRTC_URL;

export async function fetchAdminToken(
  room: string,
  participantName: string,
  identity: string,
  metadata?: string
) {
  const payloads = JSON.stringify({
    room,
    participantName,
    identity,
    metadata: metadata || "",
  });
  const res = await fetch(`${url}/api/tokens/admintoken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payloads,
  });
  const data = await res.json();
  return data.access_token;
}

export async function fetchParticipantToken(
  room: string,
  participantName: string,
  identity: string
) {
  const payloads = JSON.stringify({
    room,
    participantName,
    identity,
  });
  const res = await fetch(`${url}/api/tokens/membertoken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payloads,
  });
  const data = await res.json();
  return data.access_token;
}
