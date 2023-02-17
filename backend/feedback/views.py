from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def allFeedback(request, pk=0):
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
    if request.method == 'PUT':
        get_user_posts = Feedback.objects.filter(user__username = request.user.username)
        feedback = Feedback.objects.filter(pk=pk)[0]
        if (feedback in get_user_posts) or request.user.is_superuser:
            serializer = FeedbackSerializer(feedback, data=request.data)
            if serializer.is_valid():
                serializer.save(user=feedback.user)
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    if request.method == 'DELETE':
        delete = Feedback.objects.filter(pk=pk)[0]
        get_user_posts = Feedback.objects.filter(user__username = request.user)
        if (delete in get_user_posts) or request.user.is_staff:
            delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
    
@api_view(['GET', 'POST', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticatedOrReadOnly])
def allFeedbackReply(request, feedback_id, pk=0):
    if request.method == 'GET':
        feedbackReply = FeedbackReply.objects.filter(reply_to_feedback_id = feedback_id)
        serializer = FeedbackReplySerializer(feedbackReply, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = FeedbackReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user, reply_to_feedback_id = feedback_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        get_user_posts = FeedbackReply.objects.filter(user__username = request.user.username)
        feedbackReply = FeedbackReply.objects.filter(pk=pk)[0]
        if (feedbackReply in get_user_posts) or request.user.is_superuser:
            serializer = FeedbackReplySerializer(feedbackReply, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user = feedbackReply.user, reply_to_feedback_id = feedback_id)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    if request.method == 'DELETE':
        get_user_posts = FeedbackReply.objects.filter(user__username = request.user.username)
        delete = FeedbackReply.objects.filter(pk=pk)[0]
        if (delete in get_user_posts) or request.user.is_staff:
            delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def handleLikesDislikes(request, feedback_id = 0, reply_to_feedback_id=0, str=''):       # Where int = 1 for likes and 2 for dislikes
    if request.method == 'PUT':
        user = User.objects.get(username=request.user.username)
        if reply_to_feedback_id == 0:   # if POST request is on a parent feedback object and NOT on a feedback reply object
            feedback = Feedback.objects.get(id=feedback_id)
            if str == 'L':    # if Like
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
            elif str == 'D':    # if Dislike
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
            if str == 'L':    # if like
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
            elif str == 'D':      # if dislike
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