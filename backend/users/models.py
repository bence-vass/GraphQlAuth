from django.db import models
from django.dispatch import receiver

from graphql_jwt.refresh_token.utils import get_refresh_token_model
from graphql_jwt.refresh_token.signals import refresh_token_rotated
from graphql_jwt.signals import token_issued


@receiver(refresh_token_rotated)
def revoke_refresh_token(sender, request, refresh_token, **kwargs):
    print('receive refresh')
    print(sender)
    print(request)
    print(refresh_token)
    refresh_token.revoke(request)


@receiver(token_issued)
def issue_new_refresh_token(sender, request, user, **kwargs):
    tokens = get_refresh_token_model().objects.filter(user=user)
    [t.revoke() for t in tokens]

