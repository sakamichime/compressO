use serde::{Deserialize, Serialize};
use wgpu::{Backends, Instance};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum GpuVendor {
    Nvidia,
    Amd,
    AppleSilicon,
    Unknown,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GpuInfo {
    pub name: String,
    pub vendor: GpuVendor,
    pub driver_version: Option<String>,
    pub memory_mb: Option<u64>,
    pub supported_encoders: Vec<String>,
}

#[derive(Debug)]
pub enum GpuType {
    Nvidia,
    Amd,
    AppleSilicon,
}

pub fn detect_gpu() -> Option<GpuType> {
    let instance = Instance::default();
    let adapters = instance.enumerate_adapters(Backends::all());

    for adapter in adapters {
        let info = adapter.get_info();

        let gpu = match info.vendor {
            0x10DE => Some(GpuType::Nvidia),
            0x1002 | 0x1022 => Some(GpuType::Amd),
            0x106B => Some(GpuType::AppleSilicon),
            _ => None,
        };

        if gpu.is_some() {
            return gpu;
        }

        match info.device_type {
            wgpu::DeviceType::IntegratedGpu => {
                if info.name.contains("Apple") {
                    return Some(GpuType::AppleSilicon);
                }
            }
            wgpu::DeviceType::DiscreteGpu => {
                if info.name.contains("AMD") {
                    return Some(GpuType::Amd);
                }
            }
            _ => {}
        }
    }
    None
}

pub fn detect_gpus() -> Vec<GpuInfo> {
    let instance = Instance::default();
    let adapters = instance.enumerate_adapters(Backends::all());
    let mut gpu_list: Vec<GpuInfo> = Vec::new();
    let mut seen_names = std::collections::HashSet::new();

    log::info!("[GPU Detection] Starting GPU detection...");

    for adapter in adapters {
        let info = adapter.get_info();
        log::info!(
            "[GPU Detection] Found adapter: {} (vendor: 0x{:X}, device: 0x{:X})",
            info.name,
            info.vendor,
            info.device
        );

        let (vendor, encoders) = match info.vendor {
            0x10DE => {
                log::info!("[GPU Detection] Identified as NVIDIA GPU");
                (
                    GpuVendor::Nvidia,
                    vec!["h264_nvenc".to_string(), "hevc_nvenc".to_string()],
                )
            }
            0x1002 | 0x1022 => {
                log::info!("[GPU Detection] Identified as AMD GPU by vendor ID");
                (
                    GpuVendor::Amd,
                    vec!["h264_amf".to_string(), "hevc_amf".to_string()],
                )
            }
            0x106B => {
                log::info!("[GPU Detection] Identified as Apple Silicon");
                (
                    GpuVendor::AppleSilicon,
                    vec![
                        "h264_videotoolbox".to_string(),
                        "hevc_videotoolbox".to_string(),
                    ],
                )
            }
            _ => {
                let name_lower = info.name.to_lowercase();
                if name_lower.contains("amd")
                    || name_lower.contains("radeon")
                    || name_lower.contains("rx ")
                {
                    log::info!(
                        "[GPU Detection] Identified as AMD GPU by name: {}",
                        info.name
                    );
                    (
                        GpuVendor::Amd,
                        vec!["h264_amf".to_string(), "hevc_amf".to_string()],
                    )
                } else if name_lower.contains("nvidia")
                    || name_lower.contains("geforce")
                    || name_lower.contains("rtx")
                    || name_lower.contains("gtx")
                {
                    log::info!(
                        "[GPU Detection] Identified as NVIDIA GPU by name: {}",
                        info.name
                    );
                    (
                        GpuVendor::Nvidia,
                        vec!["h264_nvenc".to_string(), "hevc_nvenc".to_string()],
                    )
                } else if name_lower.contains("apple")
                    || name_lower.contains("m1")
                    || name_lower.contains("m2")
                    || name_lower.contains("m3")
                {
                    log::info!(
                        "[GPU Detection] Identified as Apple Silicon by name: {}",
                        info.name
                    );
                    (
                        GpuVendor::AppleSilicon,
                        vec![
                            "h264_videotoolbox".to_string(),
                            "hevc_videotoolbox".to_string(),
                        ],
                    )
                } else {
                    log::info!("[GPU Detection] Unknown GPU: {}", info.name);
                    (GpuVendor::Unknown, vec![])
                }
            }
        };

        if vendor == GpuVendor::Unknown {
            continue;
        }

        let name = info.name.clone();
        if seen_names.contains(&name) {
            continue;
        }
        seen_names.insert(name.clone());

        let driver_version = if !info.driver.is_empty() && info.driver != "Unknown" {
            Some(info.driver.to_string())
        } else {
            None
        };

        let memory_mb = None;

        gpu_list.push(GpuInfo {
            name,
            vendor,
            driver_version,
            memory_mb,
            supported_encoders: encoders,
        });
    }

    log::info!("[GPU Detection] Found {} GPU(s)", gpu_list.len());
    gpu_list
}
