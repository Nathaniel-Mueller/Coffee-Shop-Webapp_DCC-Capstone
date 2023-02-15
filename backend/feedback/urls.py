from django.urls import path
from . import views

urlpatterns = [
    path('', views.viewFeedback),
    path('<int:feedback_id>', views.viewFeedbackReply), # path to GET children of feedback posts as feedback replies
    path('<int:feedback_id>/handlereactions/<int:int>', views.handleLikesDislikes), # path to like or dislike a parent feedback post | int = 1 for likes and 2 for dislikes
    path('<int:feedback_id>/<int:reply_to_feedback_id>/handlereactions/<int:int>', views.handleLikesDislikes), # path to like or dislike a feedback reply (child) post | int = 1 for likes and 2 for dislikes
]
