from django.urls import path
from . import views

urlpatterns = [
    path('', views.allFeedback),
    path('<int:pk>', views.allFeedback), # path for DELETE
    path('<int:feedback_id>/reply', views.allFeedbackReply), # path to GET children of feedback posts as feedback replies
    path('<int:feedback_id>/reply/<int:pk>', views.allFeedbackReply), # path for DELETE
    path('<int:feedback_id>/handlereactions/<str:str>', views.handleLikesDislikes), # path to like or dislike a parent feedback post | str = L for likes and D for dislikes
    path('<int:feedback_id>/reply/<int:reply_to_feedback_id>/handlereactions/<str:str>', views.handleLikesDislikes), # path to like or dislike a feedback reply (child) post | str = L for likes and D for dislikes
]
