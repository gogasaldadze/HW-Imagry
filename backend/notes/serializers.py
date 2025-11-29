from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['uuid', 'title', 'text', 'created_at', 'updated_at']
        read_only_fields = ['uuid', 'created_at', 'updated_at']

