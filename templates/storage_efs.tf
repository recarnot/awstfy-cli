locals {
  transition_to_ia = "{{transition_to_ia}}"
}

resource "aws_efs_file_system" "{{id}}" {
  performance_mode = "{{performance_mode}}"
  throughput_mode  = "{{throughput_mode}}"

  provisioned_throughput_in_mibps = {{throughput}}

  encrypted  = {{encrypted}}
  {{kms_key}}

  dynamic "lifecycle_policy" {
    for_each = local.transition_to_ia == "" ? [] : [1]
    content {
      transition_to_ia = local.transition_to_ia
    }
  }

  tags = merge(
    local.tags,
    {
      Name : format(local.label_formatter, "efs")
    }
  )
}