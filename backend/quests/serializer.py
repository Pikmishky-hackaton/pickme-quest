from rest_framework import serializers
from .models import Quest, Task, Media


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'

    def validate_media_type(self, value):
        if value in ['image', 'video'] and not self.initial_data.get('file'):
            raise serializers.ValidationError('File must be provided for this media type.')
        if value == 'text' and not self.initial_data.get('content'):
            raise serializers.ValidationError('Text must be provided for this media type.')
        return value

    def create(self, validated_data):
        if isinstance(validated_data, list):
            return Media.objects.bulk_create([Media(**item) for item in validated_data])
        return super().create(validated_data)

class TaskSerializer(serializers.ModelSerializer):
    media = MediaSerializer(many=True)

    class Meta:
        model = Task
        fields = '__all__'

    def validate_question_type(self, value):
        if value in ['open', 'test'] and not self.initial_data.get('correct_answer'):
            raise serializers.ValidationError('Correct answer must be provided')
        return value


class QuestSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Quest
        fields = '__all__'


    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError('Title must be provided')
        return value

    def validate_count(self, value):
        task_count = self.initial_data.get('task_count')

        if not task_count:
            raise serializers.ValidationError('Task count must be provided')

        task_count = int(task_count)

        if value != task_count:
            raise serializers.ValidationError('The number of tasks must be exactly equal to task_count.')

        return value

    def create(self, validated_data):
        tasks_data = validated_data.pop('tasks', [])
        quest = Quest.objects.create(**validated_data)
        for task_data in tasks_data:
            Task.objects.create(quest=quest, **task_data)
        return quest






