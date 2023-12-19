from django.shortcuts import render
from rest_framework import generics
from .models import Document
from .serializers import DocumentSerializer
from django.http import HttpResponse, JsonResponse
import os
import requests
import json  # Import the json module
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.conf import settings

class DocumentListCreate(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

def index_view(request):
    return HttpResponse("Hello, world. You're at the index.")

@csrf_exempt
@require_http_methods(["POST"])
def chatgpt_api(request):
    try:
        # Parse JSON data from the request body
        data = json.loads(request.body)
        user_message = data.get('message')

        # Prepare the payload for the ChatGPT API
        payload = {
            'prompt': user_message,
            'max_tokens': 150
        }

        # ChatGPT API URL and headers
        print("API Key:", {settings.CHATGPT_API_KEY})
        chatgpt_url = 'https://api.openai.com/v1/engines/davinci-codex/completions'
        headers = {
            # 'Authorization': f'Bearer {os.environ.get("CHATGPT_API_KEY")}',
            'Authorization': f'Bearer {settings.CHATGPT_API_KEY}',
            'Content-Type': 'application/json'
        }

        # Send the request to the ChatGPT API
        response = requests.post(chatgpt_url, json=payload, headers=headers)

        # Check if the request was successful
        if response.status_code == 200:
            chatgpt_response = response.json()
            return JsonResponse({'reply': chatgpt_response['choices'][0]['text']})
        else:
            return JsonResponse({'error': 'Failed to get response from ChatGPT'}, status=response.status_code)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
