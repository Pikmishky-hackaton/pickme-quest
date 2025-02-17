from rest_framework import viewsets, permissions, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Quest, Task, Media
from .serializer import QuestSerializer, TaskSerializer, MediaSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class QuestListCreateView(generics.ListCreateAPIView):
    queryset = Quest.objects.all()
    serializer_class = QuestSerializer
    permission_classes = [AllowAny]

class QuestDetailView(generics.RetrieveAPIView):
    queryset = Quest.objects.all()
    serializer_class = QuestSerializer
    permission_classes = [IsOwnerOrReadOnly]
    lookup_field = 'slug'

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]

class TaskDetailView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsOwnerOrReadOnly]
    lookup_field = 'slug'

class MediaUploadView(generics.CreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [AllowAny]
