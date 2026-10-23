use std::sync::Once;

use tauri_plugin_todesktop::TodesktopExt;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

/// health.ready(), told to a smoke test the way it now needs.
/// tauri-plugin-todesktop 0.1.0 reports `healthy` without saying the app
/// sent it, and smoke tests accept that only from the release users have
/// now, never from the build under test. Back to health.ready() once the
/// plugin reports `source: "app"` itself (after 0.1.0).
#[tauri::command]
fn health_ready(app: tauri::AppHandle) -> Result<(), String> {
    let updates = app.todesktop().updates().ok_or_else(|| {
        "updates are off: this isn't a ToDesktop build (no todesktop-build.json)".to_owned()
    })?;
    updates.health_ready();
    static REPORTED: Once = Once::new();
    REPORTED.call_once(|| {
        updates
            .updater()
            .report("healthy", serde_json::json!({ "source": "app" }));
    });
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_todesktop::init())
        .invoke_handler(tauri::generate_handler![greet, health_ready])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
