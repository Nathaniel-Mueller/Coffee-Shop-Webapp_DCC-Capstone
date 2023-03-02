from rest_framework import serializers
from .models import *

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'user_id', 'user', 'date_created', 'date_updated', 'text', 'likes', 'dislikes', 'liked_users', 'disliked_users']
        depth = 1
        
class FeedbackReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackReply
        fields = ['id', 'reply_to_feedback', 'user_id', 'user', 'date_created', 'date_updated', 'text', 'likes', 'dislikes', 'liked_users', 'disliked_users']
        depth = 1