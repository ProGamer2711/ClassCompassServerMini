terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "app_image" {
  name         = var.image_name
  keep_locally = true
}

resource "docker_container" "app_container" {
  name    = var.container_name
  image   = docker_image.app_image.image_id
  restart = "unless-stopped"

  dynamic "ports" {
    for_each = var.ports
    content {
      internal = ports.value.internal
      external = ports.value.external
    }
  }

  env = var.env_vars

  dynamic "volumes" {
    for_each = var.volumes
    content {
      host_path      = volumes.value.host_path
      container_path = volumes.value.container_path
    }
  }
}
