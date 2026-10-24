import { health, install, updates, type UpdateState } from "@todesktop/tauri";

const $ = (id: string) => document.getElementById(id)!;

function describe(state: UpdateState): string {
  switch (state.status) {
    case "idle":
      return state.lastCheckedAt
        ? `Up to date (checked ${new Date(state.lastCheckedAt).toLocaleTimeString()})`
        : "Idle";
    case "checking":
      return "Checking…";
    case "available":
      return `${state.update.version} is available`;
    case "downloading":
      return `Downloading ${state.update.version}: ${Math.round(state.progress * 100)}%`;
    case "ready":
      return `${state.update.version} is ready: restart to install`;
    case "blocked":
      return state.message;
    case "managed":
      return state.update
        ? `${state.update.version} is available: ${state.update.command}`
        : `Updated by ${state.by}`;
    case "error":
      return `Error: ${state.message}`;
  }
}

function render(state: UpdateState) {
  $("state").textContent = describe(state);
  $("download").hidden = state.status !== "available";
  $("restart").hidden = state.status !== "ready";
}

async function run(action: () => Promise<unknown>) {
  $("message").textContent = "";
  try {
    await action();
  } catch (error) {
    // Builds ToDesktop didn't make (tauri dev) have updates off.
    $("message").textContent = String(error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  $("check").addEventListener("click", () => run(() => updates.check().then(render)));
  $("download").addEventListener("click", () => run(() => updates.download().then(render)));
  $("restart").addEventListener("click", () => run(() => updates.restart()));

  try {
    const info = await install.info();
    $("version").textContent = info.version;
    $("build").textContent = `#${info.buildNumber} (${info.buildId})`;
    $("install-kind").textContent = info.installKind;
    $("channel").textContent = info.channel ?? "stable";
  } catch (error) {
    $("version").textContent = "Not a ToDesktop build";
    $("message").textContent = String(error);
  }

  await run(async () => {
    render(await updates.state());
    await updates.subscribe(render);
    // This launch works: rollout health counts on it.
    await health.ready();
  });
});
