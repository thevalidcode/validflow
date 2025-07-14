use tauri::{
  Builder, Manager,
  tray::{TrayIconBuilder, TrayMenu, TrayEvent},
  AppHandle, RunEvent,
};

fn main() {
  Builder::default()
    .setup(|app| {
      let tray_menu = TrayMenu::builder()
        .item("quit", "Quit")
        .build(app)?;
      let tray = TrayIconBuilder::new()
        .menu(tray_menu)
        .build(app)?;
      // optional: store tray handle in state or listen to events
      Ok(())
    })
    .run(tauri::generate_context!(), |app_handle, event| {
      if let RunEvent::TrayEvent { event, .. } = event {
        match event {
          TrayEvent::MenuItemClick(id) if id == "quit" => {
            app_handle.exit(0);
          }
          _ => {}
        }
      }
    })
    .expect("error while running tauri app");
}
