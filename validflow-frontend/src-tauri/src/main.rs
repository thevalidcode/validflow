#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
  Builder, Manager,
  tray::{TrayIconBuilder, TrayMenuBuilder, TrayEvent},
};

fn main() {
  Builder::default()
    .setup(|app| {
      let tray_menu = TrayMenuBuilder::new()
        .item("quit".to_string(), "Quit".to_string())
        .build(app)?;
      TrayIconBuilder::new()
        .menu(tray_menu)
        .build(app)?;
      Ok(())
    })
    .run(tauri::generate_context!(), |app_handle, event| {
      if let tauri::RunEvent::TrayEvent { event, .. } = event {
        if let TrayEvent::MenuItemClick(id) = event {
          if id == "quit" {
            app_handle.exit(0);
          }
        }
      }
    })
    .expect("error while running tauri app");
}
