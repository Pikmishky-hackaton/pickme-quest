from django.urls import path
from .views import QuestListCreateView, QuestDetailView, TaskListCreateView, TaskDetailView, \
    MediaUploadView

urlpatterns = [
    path('quests/', QuestListCreateView.as_view(), name='quest_list_create'),
    path('quests/<slug:slug>/', QuestDetailView.as_view(), name='quest_detail'),
    path('quests/tasks/', TaskListCreateView.as_view(), name='task_list_create'),
    path('quests/tasks/<slug:slug>/', TaskDetailView.as_view(), name='task_detail'),
    path('quests/tasks/media/', MediaUploadView.as_view(), name='media_upload'),
]
