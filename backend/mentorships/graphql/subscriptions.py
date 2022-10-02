import channels_graphql_ws
import graphene


class NotifyMentorship(channels_graphql_ws.Subscription):
    """Subscription triggers on a new chat message."""

    sender = graphene.String()
    receiver = graphene.String()
    message = graphene.String()

    class Arguments:
        """Subscription arguments."""

        receiver = graphene.String()

    def subscribe(self, info, receiver=None):
        """Client subscription handler."""
        del info
        # Specify the subscription group client subscribes to.
        return [receiver] if receiver is not None else None

    def publish(self, info, receiver=None):
        """Called to prepare the subscription notification message."""

        # The `self` contains payload delivered from the `broadcast()`.
        new_msg_receiver = self["receiver"]
        new_msg_message = self["message"]
        new_msg_sender = self["sender"]

        # Avoid self-notifications.
        if (
            info.context.user.is_authenticated
            and new_msg_sender == info.context.user.username
        ):
            return NotifyMentorship.SKIP

        return NotifyMentorship(
            receiver=receiver, message=new_msg_message, sender=new_msg_sender
        )

    @classmethod
    def notify_receiver(cls, receiver, message, sender):
        """Auxiliary function to send subscription notifications.

        It is generally a good idea to encapsulate broadcast invocation
        inside auxiliary class methods inside the subscription class.
        That allows to consider a structure of the `payload` as an
        implementation details.
        """
        cls.broadcast(
            group=receiver,
            payload={"receiver": receiver, "message": message, "sender": sender},
        )


class MentorshipSubscription(graphene.ObjectType):
    """GraphQL subscriptions."""

    on_notify_receiver = NotifyMentorship.Field()
