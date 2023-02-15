# Generated by Django 4.1.6 on 2023-02-15 06:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('feedback', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='disliked_users',
            field=models.ManyToManyField(related_name='disliked_users', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='feedback',
            name='liked_users',
            field=models.ManyToManyField(related_name='liked_users', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='feedbackreply',
            name='disliked_users',
            field=models.ManyToManyField(related_name='reply_disliked_users', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='feedbackreply',
            name='liked_users',
            field=models.ManyToManyField(related_name='reply_liked_users', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='poster', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='feedbackreply',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='replyPoster', to=settings.AUTH_USER_MODEL),
        ),
    ]
