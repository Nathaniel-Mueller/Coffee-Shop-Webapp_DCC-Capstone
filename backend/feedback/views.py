from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def viewFeedback(request):
    if request.method == 'GET':
        feedback = Feedback.objects.all()
        serializer = FeedbackSerializer(feedback, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def viewFeedbackReply(request, feedback_id):
    if request.method == 'GET':
        feedbackreply = FeedbackReply.objects.filter(reply_to_feedback_id = feedback_id)
        serializer = FeedbackReplySerializer(feedbackreply, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = FeedbackReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user, reply_to_feedback_id = feedback_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)