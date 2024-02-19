from rest_framework import viewsets
from .models import TrendingTopic
from .serializers import TrendingTopicSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import fetch_trending_topics_from_yahoo

class TrendingTopicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TrendingTopic.objects.all().order_by('-fetched_at')
    serializer_class = TrendingTopicSerializer

# wordchat_backend/views.py


@api_view(['GET'])
def trending_topics(request):
    if request.method == 'GET':
        topics = fetch_trending_topics_from_yahoo()
        return Response(topics, status=status.HTTP_200_OK)
