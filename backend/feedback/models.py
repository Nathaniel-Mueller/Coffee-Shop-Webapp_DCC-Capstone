from django.db import models
from authentication.models import User

# Create your models here.


class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='poster')
    text = models.CharField(max_length=2500)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    liked_users = models.ManyToManyField(User, related_name='liked_users')
    disliked_users = models.ManyToManyField(User, related_name='disliked_users')
    is_active = models.BooleanField(default=True)
    edited_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='edited_by', null=True)
    
    
class FeedbackReply(models.Model):
    reply_to_feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='replyPoster')
    text = models.CharField(max_length=2500)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    liked_users = models.ManyToManyField(User, related_name='reply_liked_users')
    disliked_users = models.ManyToManyField(User, related_name='reply_disliked_users')
    is_active = models.BooleanField(default=True)
    edited_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='reply_edited_by', null=True)