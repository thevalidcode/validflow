#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{SystemTray, SystemTrayMenu, SystemTrayEvent, CustomMenuItem, Manager};
use tauri_plugin_shell::init as shell_plugin;

fn main() {
  let quit = CustomMenuItem::new("quit", "Quit");
  let show = CustomMenuItem::new("show", "Show App");

  let tray_menu = SystemTrayMenu::new()
    .add_item(show)
    .add_item(quit);

  let system_tray = SystemTray::new().with_menu(tray_menu);

  tauri::Builder::default()
    .plugin(shell_plugin())
    .system_tray(system_tray)
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::MenuItemClick { id, .. } => {
        match id.as_str() {
          "quit" => std::process::exit(0),
          "show" => {
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
          }
          _ => {}
        }
      }
      _ => {}
    })
    .on_window_event(|event| {
      if let tauri::WindowEvent::CloseRequested { api, .. } = event.event() {
        // Hide the app instead of quitting
        event.window().hide().unwrap();
        api.prevent_close();
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
