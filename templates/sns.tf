resource "aws_sns_topic" "{{id}}" {
  name_prefix  = "{{prefix}}"
  display_name = "{{display}}"

  tags = merge(
    local.tags,
    {
      Name : format(local.label_formatter, "sns-topic-{{prefix}}")
    }
  )
}
