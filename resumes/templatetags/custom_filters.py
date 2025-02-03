from django import template

register = template.Library()


@register.filter
def is_list(value):
    """Check if the given value is a list"""
    return isinstance(value, list)
