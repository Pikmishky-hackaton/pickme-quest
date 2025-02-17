from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
from django.utils.text import slugify
User = get_user_model()

class Quest(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quests')
    title = models.CharField(max_length=255)
    description = models.TextField()
    task_count = models.PositiveIntegerField()
    time_limit = models.DurationField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=255, unique=True, default='quest')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f'{self.title}')
        super().save(*args, **kwargs)


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
    slug = models.SlugField(max_length=255, unique=True, default='task')

    def __str__(self):
        return self.question

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f'{self.question}')
        super().save(*args, **kwargs)

class Media(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='media')
    media_type = models.CharField(
        max_length=10,
        choices=[('text', 'Text'), ('image', 'Image'), ('video', 'Video')]
    )
    content = models.TextField(blank=True, null=True)
    file = models.FileField(
        upload_to='media/',
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'png', 'mp4', 'avi'])]
    )
