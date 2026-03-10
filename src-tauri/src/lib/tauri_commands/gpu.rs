use crate::sys::gpu::{detect_gpus, GpuInfo};
use tauri::AppHandle;
use tauri_plugin_shell::ShellExt;

#[tauri::command]
pub fn get_gpu_info() -> Vec<GpuInfo> {
    detect_gpus()
}

#[tauri::command]
pub async fn check_encoder_available(app: AppHandle, encoder: String) -> bool {
    log::info!("[Encoder Check] Checking encoder availability: {}", encoder);
    
    let sidecar = match app.shell().sidecar("compresso_ffmpeg") {
        Ok(cmd) => cmd,
        Err(e) => {
            log::error!("[Encoder Check] Failed to get FFmpeg sidecar: {:?}", e);
            return false;
        }
    };

    let output = match sidecar.args(["-encoders"]).output().await {
        Ok(o) => o,
        Err(e) => {
            log::error!("[Encoder Check] Failed to run FFmpeg: {:?}", e);
            return false;
        }
    };

    let stdout = String::from_utf8_lossy(&output.stdout);
    let available = stdout.contains(&encoder);
    log::info!(
        "[Encoder Check] Encoder {} available: {}",
        encoder,
        available
    );
    available
}
