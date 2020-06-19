import graphene
from graphene import ObjectType, Node
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from django.contrib.auth import models as auth_models, get_user_model, password_validation
from django.core.exceptions import ValidationError
from . import validators


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        if username == '' or password == '' or email == '':
            raise Exception('Invalid input')
        try:
            validators.validate_unique_email(email)
        except ValidationError as err:
            raise Exception(err)
        try:
            password_validation.validate_password(password)
        except ValidationError as err:
            raise Exception(err)

        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()
        return CreateUser(user=user)


class ProfileMutation(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        # id = graphene.ID()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()

    def mutate(self, info, first_name, last_name, email):
        user = get_user_model().objects.get(pk=info.context.user.id)
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        return ProfileMutation(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_profile = ProfileMutation.Field()


class UserNode(DjangoObjectType):
    class Meta:
        model = auth_models.User
        filter_fields = {
            'username': ['exact', 'icontains'],
        }
        interfaces = (Node,)


class Query(ObjectType):
    me = graphene.Field(UserType)
    # user = Node.Field(UserNode)
    all_user = DjangoFilterConnectionField(UserNode)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Token is required')
        return user
