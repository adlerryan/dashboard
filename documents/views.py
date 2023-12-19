from django.shortcuts import render
from rest_framework import generics
from .models import Document
from .serializers import DocumentSerializer
from django.http import HttpResponse

class DocumentListCreate(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


def index_view(request):
    return HttpResponse("Hello, world. You're at the index.")

# Create your views here.
