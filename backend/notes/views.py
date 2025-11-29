from rest_framework import generics
from rest_framework.filters import SearchFilter
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Note
from .serializers import NoteSerializer


@method_decorator(csrf_exempt, name='dispatch')
class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title', 'text']


@method_decorator(csrf_exempt, name='dispatch')
class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = 'uuid'

