from django.db import models
from authentication.models import User

# Create your models here.


class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=2500)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    
class FeedbackReply(models.Model):
    reply_to_feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=2500)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)