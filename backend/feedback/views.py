from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def allFeedback(request, pk=0):
    if request.method == 'GET' and pk == 0:
        feedback = Feedback.objects.all()
        serializer = FeedbackSerializer(feedback, many = True)
        return Response(serializer.data)
    if request.method == 'GET' and pk != 0:
        feedback = Feedback.objects.filter(pk=pk)
        serializer=FeedbackSerializer(feedback, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        get_user_posts = Feedback.objects.filter(user = request.user)
        feedback = Feedback.objects.filter(pk=pk)[0]
        if feedback.is_active or request.user.is_superuser:
            if (feedback in get_user_posts) or request.user.is_superuser:
                feedback.edited_by = request.user
                feedback.save()
                serializer = FeedbackSerializer(feedback, data=request.data)
                if serializer.is_valid():
                    serializer.save(user=feedback.user)
                    return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response (status=status.HTTP_403_FORBIDDEN)
    if request.method == 'DELETE':
        delete = Feedback.objects.filter(pk=pk)[0]
        get_user_posts = Feedback.objects.filter(user = request.user)
        if (delete in get_user_posts) or request.user.is_staff:
            delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    
    
    
@api_view(['GET', 'POST', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticatedOrReadOnly])
def allFeedbackReply(request, feedback_id=0, pk=0):
    if request.method == 'GET' and pk == 0:
        feedbackReply = FeedbackReply.objects.all()
        serializer = FeedbackReplySerializer(feedbackReply, many = True)
        return Response(serializer.data)
    if request.method == 'GET' and pk != 0:
        feedbackReply = FeedbackReply.objects.filter(pk = pk)
        serializer = FeedbackReplySerializer(feedbackReply, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        check_feedback = Feedback.objects.filter(pk = feedback_id)
        if check_feedback.is_active:
            serializer = FeedbackReplySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user = request.user, reply_to_feedback_id = feedback_id)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == 'PUT':
        get_user_posts = FeedbackReply.objects.filter(user = request.user)
        feedbackReply = FeedbackReply.objects.filter(pk=pk)[0]
        if feedbackReply.is_active or request.user.is_superuser:
            if (feedbackReply in get_user_posts) or request.user.is_superuser:
                feedbackReply.edited_by = request.user
                feedbackReply.save()
                serializer = FeedbackReplySerializer(feedbackReply, data=request.data)
                if serializer.is_valid():
                    serializer.save(user = feedbackReply.user, reply_to_feedback_id = feedback_id)
                    return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == 'DELETE':
        get_user_posts = FeedbackReply.objects.filter(user = request.user)
        delete = FeedbackReply.objects.filter(pk=pk)[0]
        if (delete in get_user_posts) or request.user.is_staff:
            delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def handleFeedbackLikesDislikes(request, feedback_id, str=''):       # Where str = L for likes and D for dislikes
    user = User.objects.get(username=request.user)
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

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def handleReplyLikesDislikes(request, feedback_reply_id, str=''):       # Where str = L for likes and D for dislikes
        user = User.objects.get(username=request.user)
        feedback_reply = FeedbackReply.objects.get(id=feedback_reply_id)
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
        
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def changeFeedbackIsActive(request, feedback_id):
    feedback = Feedback.objects.filter(id=feedback_id)[0]
    if feedback.is_active:
        feedback.is_active = False
        feedback.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif not feedback.is_active:
        feedback.is_active = True
        feedback.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
        


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def changeFeedbackReplyIsActive(request, feedback_reply_id):
    feedback_reply = FeedbackReply.objects.filter(id=feedback_reply_id)[0]
    if feedback_reply.is_active:
        feedback_reply.is_active = False
        feedback_reply.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif not feedback_reply.is_active:
        feedback_reply.is_active = True
        feedback_reply.save()
        return Response(status=status.HTTP_204_NO_CONTENT)