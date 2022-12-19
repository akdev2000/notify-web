export function setSessionId(sesssionId: string) {
  localStorage.setItem("sessionId", sesssionId);
}

export function setDeviceId(deviceId: string) {
  localStorage.setItem("deviceId", deviceId);
}

export function getSessionId() {
  return localStorage.getItem("sessionId");
}

export function getDeviceId() {
  return localStorage.getItem("deviceId");
}
