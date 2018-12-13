from rest_framework import serializers
from tester.models import Tester


class TesterSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=20)
    credit = serializers.IntegerField(default=100)
    status = serializers.BooleanField()

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Tester.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.credit = validated_data.get('credit', instance.credit)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance


class TesterMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tester
        fields = ('id', 'name', 'credit', 'status')
