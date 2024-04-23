use std::{path::Path, process::Command};

#[tauri::command]
pub fn exists(path: String) -> bool {
    Path::new(&path).exists()
}

#[tauri::command]
pub fn run(path: String) {
    Command::new(path)
        .spawn()
        .expect("Failed to spawn child process");
}
