from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
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
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def handleLikesDislikes(request, feedback_id = 0, reply_to_feedback_id=0, int=0):       # Where int = 1 for likes and 2 for dislikes
    if request.method == 'PUT':
        user = User.objects.get(username=request.user.username)
        if reply_to_feedback_id == 0:   # if POST request is on a parent feedback object and NOT on a feedback reply object
            feedback = Feedback.objects.get(id=feedback_id)
            if int == 1:    # if Like
                if feedback.disliked_users.contains(user):     # Check and remove if user already disliked post
                    feedback.disliked_users.remove(user)
                    feedback.dislikes -= 1
                if feedback.liked_users.contains(user):     # Check and remove if user already liked post
                    feedback.likes -= 1
                    feedback.liked_users.remove(user)
                    feedback.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                feedback.likes += 1
                feedback.liked_users.add(user)
                feedback.save()     
                return Response(status=status.HTTP_204_NO_CONTENT)
            elif int == 2:    # if Dislike
                if feedback.liked_users.contains(user):     # Check and remove if user already liked post
                    feedback.liked_users.remove(user)
                    feedback.likes -= 1
                if feedback.disliked_users.contains(user):      # Check and remove if user already disliked post
                    feedback.dislikes -= 1
                    feedback.disliked_users.remove(user)
                    feedback.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                feedback.dislikes += 1
                feedback.disliked_users.add(user)
                feedback.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            feedback_reply = FeedbackReply.objects.get(id=reply_to_feedback_id)
            if int == 1:    # if like
                if feedback_reply.disliked_users.contains(user):    # Check and remove if user already disliked post
                    feedback_reply.disliked_users.remove(user)
                    feedback_reply.dislikes -= 1
                if feedback_reply.liked_users.contains(user):   # Check and remove if user already liked post
                    feedback_reply.likes -= 1
                    feedback_reply.liked_users.remove(user)
                    feedback_reply.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                feedback_reply.likes += 1
                feedback_reply.liked_users.add(user.id)
                feedback_reply.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
            elif int == 2:      # if dislike
                if feedback_reply.liked_users.contains(user):   # Check and remove if user already liked post
                    feedback_reply.liked_users.remove(user)
                    feedback_reply.likes -= 1
                if feedback_reply.disliked_users.contains(user):    # Check and remove if user already disliked post
                    feedback_reply.dislikes -= 1
                    feedback_reply.disliked_users.remove(user)
                    feedback_reply.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                feedback_reply.dislikes += 1
                feedback_reply.disliked_users.add(user)
                feedback_reply.save()
                return Response(status=status.HTTP_204_NO_CONTENT)