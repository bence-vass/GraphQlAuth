from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model


def validate_unique_email(email):
    if get_user_model().objects.filter(email=email).exists():
        raise ValidationError("Email exists")
