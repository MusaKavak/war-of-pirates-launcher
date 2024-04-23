use futures::StreamExt;
use std::{
    env::temp_dir,
    fs::File,
    io::{self, Write},
    path::Path,
    sync::{Arc, Mutex},
    thread,
    time::Duration,
};
use tauri::Window;
use zip::ZipArchive;

#[tauri::command(async)]
pub async fn download_file(game_folder: String, window: Window) {
    let clone_window = window.clone();

    let temp_dir = temp_dir();
    let file_path = temp_dir.join("game.zip");

    let response = reqwest::get("https://warofpirates.com.tr/downloadWebsite")
        .await
        .unwrap();
    let total_size = response.content_length().unwrap_or(0);

    let mut file = File::create(&file_path).unwrap();
    let mut stream = response.bytes_stream();

    let downloaded = Arc::new(Mutex::new(0u64));
    let total_size = Arc::new(total_size);

    let progress_thread = {
        let downloaded: Arc<Mutex<u64>> = Arc::clone(&downloaded);
        let total_size: Arc<u64> = Arc::clone(&total_size);
        thread::spawn(move || loop {
            thread::sleep(Duration::from_secs(1));
            let downloaded = downloaded.lock().unwrap();
            let perc = *downloaded as f64 / *total_size as f64 * 100.0;

            window.emit("download-progress", perc).unwrap();

            if perc == 100.0 {
                break;
            }
        })
    };

    while let Some(chunk) = stream.next().await {
        let chunk = chunk.unwrap();
        file.write_all(&chunk).unwrap();
        let bytes_written = chunk.len() as u64;
        *downloaded.lock().unwrap() += bytes_written;
    }

    drop(progress_thread);

    clone_window.emit("unpacking", "").unwrap();

    unpack_zip(&file_path, Path::new(&game_folder)).unwrap();

    clone_window.emit("unpack-finished", "").unwrap();
}

fn unpack_zip(zip_path: &Path, output_dir: &Path) -> Result<(), io::Error> {
    let file = File::open(zip_path)?;
    let mut archive = ZipArchive::new(file)?;

    for i in 0..archive.len() {
        let mut file = archive.by_index(i)?;
        let output_path = output_dir.join(file.mangled_name());

        if file.name().ends_with('/') {
            std::fs::create_dir_all(&output_path)?;
        } else {
            if let Some(p) = output_path.parent() {
                if !p.exists() {
                    std::fs::create_dir_all(p)?;
                }
            }
            let mut outfile = File::create(&output_path)?;
            io::copy(&mut file, &mut outfile)?;
        }
    }

    Ok(())
}
