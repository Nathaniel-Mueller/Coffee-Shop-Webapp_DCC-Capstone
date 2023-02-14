from django.urls import path
from . import views

urlpatterns = [
    path('', views.viewFeedback),
    path('<int:feedback_id>', views.viewFeedbackReply)
]
