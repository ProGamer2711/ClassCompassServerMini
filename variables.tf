variable "image_name" {
  description = "Docker image name with tag"
  type        = string
}

variable "container_name" {
  description = "Docker container name"
  type        = string
}

variable "ports" {
  description = "List of ports to expose"
  type = list(object({
    internal = number
    external = number
  }))
  default = []
}

variable "env_vars" {
  description = "Environment variables"
  type        = list(string)
  default     = []
}

variable "volumes" {
  description = "Volumes to mount"
  type = list(object({
    host_path      = string
    container_path = string
  }))
  default = []
}
