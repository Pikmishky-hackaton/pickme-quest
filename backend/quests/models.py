from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Quest(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quests')
    title = models.CharField(max_length=255)
    description = models.TextField()
    task_count = models.PositiveIntegerField()
    time_limit = models.DurationField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Task(models.Model):
    quest = models.ForeignKey(Quest, on_delete=models.CASCADE, related_name='tasks')
    question = models.TextField()
    question_type = models.CharField(
        max_length=50,
        choices=[
            ('open', 'Open Answer'),
            ('test', 'Test question'),
            ('image_search', 'Image search'),
        ]
    )
    correct_answer = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Media(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='media')
    media_type = models.CharField(
        max_length=10,
        choices=[('text', 'Текст'), ('image', 'Фото'), ('video', 'Відео')]
    )
    content = models.TextField()