from django.urls import path
from . import views

urlpatterns = [
    path('', views.allFeedback),
    path('<int:pk>', views.allFeedback), # path for DELETE and for GET by pk
    path('replies', views.allFeedbackReply), # path to GET all feedback replies only
    path('replies/<int:pk>', views.allFeedbackReply), # path for DELETE and for GET by pk
    path('<int:feedback_id>/handlereactions/<str:str>', views.handleFeedbackLikesDislikes), # path to like or dislike a parent feedback post | str = L for likes and D for dislikes
    path('replies/<int:feedback_reply_id>/handlereactions/<str:str>', views.handleReplyLikesDislikes), # path to like or dislike a feedback reply (child) post | str = L for likes and D for dislikes
    path('<int:feedback_id>/toggleactive', views.changeFeedbackIsActive),
    path('replies/<int:feedback_reply_id>/toggleactive', views.changeFeedbackReplyIsActive)
]
