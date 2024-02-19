from rest_framework import serializers
from .models import TrendingTopic

class TrendingTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrendingTopic
        fields = '__all__'
